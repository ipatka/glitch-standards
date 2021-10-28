// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "hardhat/console.sol";

interface IMemeNFT {
    function mintActive(address _holder) external view returns (bool);

    function royaltyMerkleRoot() external view returns (bytes32);

    function royaltyCount() external view returns (uint256);

    function sumRoyalties(uint256 _start, uint256 _end)
        external
        view
        returns (uint256);
}

contract MerkleRoyalties {
    mapping(address => mapping(address => uint256)) public lastClaimed;
    
    mapping(address => uint256) public contractBalance;

    function claim(
        address[] memory _tokens,
        bytes32[][] memory _proofs,
        uint256[] memory _splitPoints
    ) external returns (bool) {
        require(
            _tokens.length == _proofs.length &&
                _tokens.length == _splitPoints.length,
            "!length"
        );
        uint256 _sumClaims;
        for (uint256 index = 0; index < _tokens.length; index++) {
            address _memeAddress = _tokens[index];
            uint256 _split = _splitPoints[index];
            IMemeNFT _meme = IMemeNFT(_memeAddress);
            uint256 _lastClaimed = lastClaimed[_memeAddress][msg.sender];
            uint256 _royaltyCount = _meme.royaltyCount();
            console.log("last %s", _lastClaimed);
            console.log("count %s", _royaltyCount);

            require(
                _verify(
                    _leaf(msg.sender, _split),
                    _proofs[index],
                    _meme.royaltyMerkleRoot()
                ),
                "Invalid merkle proof"
            );

            require(_lastClaimed < _royaltyCount, "already claimed");

            uint256 _royaltyValues = _meme.sumRoyalties(
                _lastClaimed + 1,
                _royaltyCount
            );
            console.log("val %s", _royaltyValues);

            lastClaimed[_tokens[index]][msg.sender] = _royaltyCount;

            uint256 _claimValue = (_royaltyValues * _split) / 10000;
            contractBalance[_memeAddress] -= _claimValue; // Will revert on underflow
            _sumClaims += _claimValue;
            console.log("claim %s", _claimValue);
        }
        (bool _success, ) = msg.sender.call{value: _sumClaims}(""); /*Send ETH to sink first*/
        require(_success, "could not send");
        return true;
    }
    
        receive() external payable {
            // Track pending royalties from source contracts
            // Important so ETH cannot be stolen through malicious implementation of Meme contract
            contractBalance[msg.sender] += msg.value;
            // TODO maybe also require that to send ETH here you have to have deployed your Meme clone from the same factory
        }

    /*****************
    MERKLE DROP HELPERS
    *****************/
    /// @notice Internal util to calculate leaf for address
    /// @param _account Account to calculate
    function _leaf(address _account, uint256 _split)
        internal
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(_account, _split));
    }

    /// @notice Internal verify merkle proof
    /// @param leaf_ Leaf to verify
    /// @param _proof Array of other hashes for proof calculation
    function _verify(
        bytes32 leaf_,
        bytes32[] memory _proof,
        bytes32 _root
    ) internal pure returns (bool) {
        return MerkleProof.verify(_proof, _root, leaf_);
    }
}

interface IWeth {
    function balanceOf(address) external returns (uint256);

    function allowance(address, address) external returns (uint256);

    function withdraw(uint256 wad) external;

    function transferFrom(
        address src,
        address dst,
        uint256 wad
    ) external returns (bool);
}

/// @title MemeNFT
contract MemeNFT is ERC1155, IMemeNFT {
    bool public hasBeenMinted;

    uint256 constant COUNTDOWN_BLOCKS = 1000;
    uint256 constant MINT_INCREASE_INCREMENT_POINTS = 1;
    uint256 constant BID_MIN_DECREMENT_POINTS = 9000;
    uint256 constant REUSE_PER_INCREMENT = 1;
    uint256 constant INCREMENT_SIZE_POINTS = 100;

    // Weth contract
    IWeth public weth;
    address public royaltiesSplitter;

    uint256 public baseRoyalties;
    uint256 private _royaltyCount;
    uint256[] public royaltyValues;

    bytes32 private _royaltyMerkleRoot;

    struct Bid {
        address bidder;
        uint256 value;
    }

    Bid public bid;

    enum TokenTypes {
        Primary,
        Badge
    }

    uint256 public minPurchasePrice;

    mapping(address => uint256) canMintUntil;

    function royaltyCount() external view override returns (uint256) {
        return _royaltyCount;
    }

    function royaltyMerkleRoot() external view override returns (bytes32) {
        return _royaltyMerkleRoot;
    }

    function mintActive(address _holder) external view override returns (bool) {
        return
            (canMintUntil[_holder] <= block.number + COUNTDOWN_BLOCKS) ||
            (balanceOf(_holder, uint256(TokenTypes.Primary)) == 1);
    }

    constructor(
        string memory uri_,
        address _wethAddress,
        address _royaltiesSplitter
    ) ERC1155(uri_) {
        weth = IWeth(_wethAddress);
        royaltiesSplitter = _royaltiesSplitter;
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override {
        for (uint256 index = 0; index < ids.length; index++) {
            require(
                ids[index] != uint256(TokenTypes.Badge) ||
                from == address(0),
                "Badges are not transferable"
            );
        }
    }

    function mintPrimary(
        string memory uri_,
        address[] memory _badges,
        uint256 _baseRoyalties,
        bytes32 _royaltiesRoot,
        uint256 _basePrice
    ) external {
        require(!hasBeenMinted, "primary token already minted");
        require(_baseRoyalties <= 10000, "Royalties exceeds cap");
        for (uint256 index = 0; index < _badges.length; index++) {
            require(
                IMemeNFT(_badges[index]).mintActive(msg.sender),
                "Does not hold license"
            );
        }

        _setURI(uri_);
        hasBeenMinted = true;
        _royaltyMerkleRoot = _royaltiesRoot;
        baseRoyalties = _baseRoyalties;
        minPurchasePrice = _basePrice;
        _mint(msg.sender, uint256(TokenTypes.Primary), 1, "");
    }

    function _mintBadge(address _recipient) internal {
        // should be public but subject to rules set by the primary token owner
        _mint(_recipient, uint256(TokenTypes.Badge), 1, "");
    }

    function _setCanMint(address _holder) internal {
        canMintUntil[_holder] = block.number + COUNTDOWN_BLOCKS;
    }

    function _purchase(
        address _currentOwner,
        address _newOwner,
        uint256 _price
    ) internal {
        minPurchasePrice =
            (_price * (10000 + MINT_INCREASE_INCREMENT_POINTS)) /
            10000;
        uint256 _toOwner = (_price * (10000 - baseRoyalties)) / 10000;
        uint256 _toRoyalties = (_price * baseRoyalties) / 10000;
        
        console.log("toOwner %s", _toOwner);
        console.log("toRoyalties %s", _toRoyalties);

        _royaltyCount++;
        royaltyValues.push(_toRoyalties);

        (bool _successOwner, ) = _currentOwner.call{value: _toOwner}("");
        require(_successOwner, "failed to send to owner");
        (bool _successRoyaltise, ) = royaltiesSplitter.call{value: _toRoyalties}("");
        require(_successOwner, "failed to send to royalties");
        _safeTransferFrom(
            _currentOwner,
            _newOwner,
            uint256(TokenTypes.Primary),
            1,
            ""
        );
        _setCanMint(_newOwner);
        _mintBadge(_newOwner);
    }

    function sumRoyalties(uint256 _start, uint256 _end)
        external
        view
        override
        returns (uint256)
    {
        uint256 _sum;
        for (uint256 index = _start; index <= _end; index++) {
            _sum += royaltyValues[index-1];
        }
        return _sum;
    }

    function purchase(address _currentOwner) external payable {
        require(
            msg.value >= minPurchasePrice,
            "minimum purchase price not met"
        );
        _purchase(_currentOwner, msg.sender, msg.value);
    }

    function enterBid(uint256 _value) external {
        require(weth.balanceOf(msg.sender) >= _value, "Insufficient Balance");
        require(
            weth.allowance(msg.sender, address(this)) >= _value,
            "Insufficient Approval"
        );
        // check if previous bid is invalid
        if (bid.bidder != address(0))
            require(
                weth.balanceOf(bid.bidder) < bid.value ||
                    weth.allowance(msg.sender, address(this)) < bid.value ||
                    _value > bid.value,
                "Invalid new bid"
            );

        bid = Bid(msg.sender, _value);
    }

    function acceptBid() external {
        require(
            (balanceOf(msg.sender, uint256(TokenTypes.Primary)) == 1),
            "only current owner can accept bid"
        );
        require(
            bid.value > ((minPurchasePrice * BID_MIN_DECREMENT_POINTS) / 10000),
            "minimum purchase price not met"
        );
        // Unwrap transferred WETH to pay seller
        unwrapWeth(bid.value);
        _purchase(msg.sender, bid.bidder, bid.value);
    }

    /// @dev Internal helper to unwrap ETH and complete purchase
    /// @param _value Value in Weth
    function unwrapWeth(uint256 _value) internal {
        // Check ETH balance before and after withdraw to make sure unwrap worked as expected
        uint256 ethBefore = address(this).balance;
        weth.withdraw(_value);
        uint256 ethAfter = address(this).balance;
        require(ethAfter - ethBefore == _value, "Unwrap failed");
    }
}
