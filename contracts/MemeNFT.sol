// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

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


interface IMemeNFT {
    function licenseActive(address _holder) external view returns (bool);

    function royaltyMerkleRoot() external view returns (bytes32);

    function royaltyCount() external view returns (uint256);

    function sumRoyalties(uint256 _start, uint256 _end)
        external
        view
        returns (uint256);
}

/// @title Meme NFT Standard
/// @dev ERC1155 contract for creative commons use, attribution, royalty splitting, and more
///
///  Features in this version
///
///     ERC1155 multi token contract
///         Token ID 1: Primary art work - 1/1
///         Token ID 2: Badges for license holders
///
///         Current owner of Token ID 1 has a license to mint derivative works
///         Once owner sells token ID 1 they have a fixed amount of blocks to use their license to mint a new work
//          
//          Purchasers receive badges minted by the primary contract when they purchase
//          Badges are not transferable
//          
//      Merkle Royalties
///         Upon mint of token ID 1, set merkle root of a royalties claim tree
///         Each leaf in the tree specifies an address and a percentage in basis points
///         Any royalties collected by these contracts are sent to a Merkle claiming contract
///         Royalty recipients can claim accumulated royalties from the contract
///
//      Perpetual Auctions
///         NFTs can always be bought for a percentage more than they were last purchased for
///         
///         Buyers can place bids at least at a fixed percentage lower than the last sale price
///
///  Features not yet implemented
///     Disable old bids on a sale?
///     Cap for royalties?
///
contract MerkleRoyalties {
    
    mapping(address => mapping(address => uint256)) public lastClaimed; /* for each NFT, track the last purchase ID that royalties have been claimed for */

    mapping(address => uint256) public contractBalance; /* for each NFT contract, track how much ETH has been sent in and only allow that much to be claimed */

    /// @dev Claim accumulated royalties for arbitrary number of tokens
    /// @param _tokens Meme NFT contract addresses
    /// @param _proofs Merkle proofs to prove inclusion in royalty sets
    /// @param _splitPoints Split claimed by sender
    function claim(
        address[] memory _tokens,
        bytes32[][] memory _proofs,
        uint256[] memory _splitPoints
    ) external {
        // Ensure all arrays are same length
        require(
            _tokens.length == _proofs.length &&
                _tokens.length == _splitPoints.length,
            "!length"
        );
        
        // track accumulated claims to pay ou
        uint256 _sumClaims;

        for (uint256 index = 0; index < _tokens.length; index++) {
            address _memeAddress = _tokens[index]; /*Address for this meme token*/
            uint256 _split = _splitPoints[index];  /*Split for this token*/
            IMemeNFT _meme = IMemeNFT(_memeAddress);

            uint256 _lastClaimed = lastClaimed[_memeAddress][msg.sender]; /*Track highest purchase ID this sender has already claimed*/
            uint256 _royaltyCount = _meme.royaltyCount(); /*Get how many royalty payments are available*/

            require(_lastClaimed < _royaltyCount, "already claimed"); /*Do not allow claiming if no new royalties*/

            // Confirm address and split are in the royalties set
            require(
                _verify(
                    _leaf(msg.sender, _split),
                    _proofs[index],
                    _meme.royaltyMerkleRoot()
                ),
                "Invalid merkle proof"
            );

            // Get accumulated royalties for this NFT since last claimed
            uint256 _royaltyValues = _meme.sumRoyalties(
                _lastClaimed + 1,
                _royaltyCount
            );

            lastClaimed[_tokens[index]][msg.sender] = _royaltyCount; /*Set claim height so sender cannot claim again*/

            uint256 _claimValue = (_royaltyValues * _split) / 10000; /*Calculate split for sender*/
            contractBalance[_memeAddress] -= _claimValue; /*Decrement availalbe eth for this contract. Reverts on underflow*/
            _sumClaims += _claimValue; /*Add new claims to cumulative sum*/
        }
        (bool _success, ) = msg.sender.call{value: _sumClaims}(""); /*Send ETH to sink first*/
        require(_success, "could not send");
    }

    receive() external payable {
        // Track pending royalties from source contracts
        // Important so ETH cannot be stolen through malicious implementation of Meme contract
        contractBalance[msg.sender] += msg.value;
        // TODO maybe also require that to send ETH here you have to have deployed your Meme clone from the same factory
    }

    /*****************
    MERKLE Proof HELPERS
    *****************/
    /// @notice Internal util to calculate leaf for address
    /// @param _account Account to calculate
    /// @param _split Basis points for this address
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

/// @title MemeNFT
contract MemeNFT is ERC1155, IMemeNFT {

    uint256 constant COUNTDOWN_BLOCKS = 1000; /*After purchase, how many blocks seller can still use license for*/
    uint256 constant MINT_INCREASE_INCREMENT_POINTS = 1; /*Basis points higher than last purchase price for next minimum purchase*/
    uint256 constant BID_MIN_DECREMENT_POINTS = 9000; /*Basis points lower that a minimum bid can be entered for*/
    uint256 constant REUSE_PER_INCREMENT = 1; /*Not currently used - licenses per incremental purchase spread*/
    uint256 constant INCREMENT_SIZE_POINTS = 100; /*Not currently used - purchase spread intervals*/


    IWeth public weth; /*Weth interface for accepting bids*/

    uint256 public baseRoyalties; /*Basis points for primary revenue split between seller and royalty recipients*/
    address public royaltiesSplitter; /*Address of deployed merkle claiming contract*/
    uint256 private _royaltyCount; /*How many royalty payments have been collected*/
    uint256[] public royaltyValues; /*Array of royalty payments*/
    bytes32 private _royaltyMerkleRoot; /*Root of the merkle tree with all royalty splits*/

    uint256 public minPurchasePrice; /*Next lowest price that NFT can be purchased for on perpetual auction*/

    bool public hasBeenMinted; /*Track if primary token has already been minted*/

    // Bid data structures - only store most recent valid bid
    struct Bid {
        address bidder;
        uint256 value;
    }
    Bid public bid;

    // Track the work & badges for purchasers
    enum TokenTypes {
        Primary,
        Badge
    }

    mapping(address => uint256) canMintUntil; /*Track how long license is valid for per holder*/

    /// @dev Construtor sets the token base URI, and external interfaces 
    /// @param uri_ String to prepend to token IDs
    /// @param _wethAddress Address of weth on same network as token
    /// @param _royaltiesSplitter Address of where to accumulate royalties
    constructor(
        string memory uri_,
        address _wethAddress,
        address _royaltiesSplitter
    ) ERC1155(uri_) {
        weth = IWeth(_wethAddress);
        royaltiesSplitter = _royaltiesSplitter;
    }

    /*****************
    Public minting and buying
    *****************/
    /// @dev Mint the token for this work - can only be done once
    /// @param uri_ String to prepend to token IDs
    /// @param _licenses Tokens to reference for derivative works
    /// @param _baseRoyalties Split between seller and all royalty recipients
    /// @param _royaltiesRoot Root of merkle tree with all splits
    /// @param _basePrice Min price for first sale
    function mintPrimary(
        string memory uri_,
        address[] memory _licenses,
        uint256 _baseRoyalties,
        bytes32 _royaltiesRoot,
        uint256 _basePrice
    ) external {
        // TODO should be restricted to deployer? or maybe permissioned minter on deploy?
        // or maybe mint inside of constructor
        
        require(!hasBeenMinted, "primary token already minted"); /*Confirm only can be one primary token*/
        require(_baseRoyalties <= 10000, "Royalties exceeds cap"); /*Prevent over 100% royalties*/
        // Validate all specified licenses
        for (uint256 index = 0; index < _licenses.length; index++) {
            require(
                IMemeNFT(_licenses[index]).licenseActive(msg.sender),
                "Does not hold license"
            );
        }

        _setURI(uri_); /*Set string to prepend to tokens*/
        hasBeenMinted = true; /*Prevent future tokens from being minted*/
        _royaltyMerkleRoot = _royaltiesRoot; /*Record root of splits*/
        baseRoyalties = _baseRoyalties; /*Split beteween seller and all royalty recipients*/
        minPurchasePrice = _basePrice; /*First purchase price - active immediately*/
        _mint(msg.sender, uint256(TokenTypes.Primary), 1, ""); /*Send token to minter*/
    }

    /// @dev Complete the purchase and handle royalties
    /// @param _currentOwner Seller
    function purchase(address _currentOwner) external payable {
        require(
            msg.value >= minPurchasePrice,
            "minimum purchase price not met"
        );
        _purchase(_currentOwner, msg.sender, msg.value);
    }

    /// @dev Enter higher bid or replace invalid bid
    /// @param _value Value in WETH to bid
    function enterBid(uint256 _value) external {
        require(weth.balanceOf(msg.sender) >= _value, "Insufficient Balance");
        require(
            weth.allowance(msg.sender, address(this)) >= _value,
            "Insufficient Approval"
        );
        // check if previous bid is invalid or if this is the first bid
        if (bid.bidder != address(0))
            require(
                weth.balanceOf(bid.bidder) < bid.value ||
                    weth.allowance(msg.sender, address(this)) < bid.value ||
                    _value > bid.value,
                "Invalid new bid"
            );

        bid = Bid(msg.sender, _value);
    }

    /// @dev Accept current bid if still valid
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


    /*****************
    External interfaces
    *****************/
    /// @dev Get total count of royalty payments - used by claiming contract
    function royaltyCount() external view override returns (uint256) {
        return _royaltyCount;
    }

    /// @dev Get root of split tree- used by claiming contract
    function royaltyMerkleRoot() external view override returns (bytes32) {
        return _royaltyMerkleRoot;
    }

    /// @dev Check if license is active - used by derivative minting functions
    function licenseActive(address _holder) external view override returns (bool) {
        return
            (canMintUntil[_holder] <= block.number + COUNTDOWN_BLOCKS) ||
            (balanceOf(_holder, uint256(TokenTypes.Primary)) == 1);
    }

    /// @dev Get sum of royalty payments between indices
    function sumRoyalties(uint256 _start, uint256 _end)
        external
        view
        override
        returns (uint256)
    {
        uint256 _sum;
        for (uint256 index = _start; index <= _end; index++) {
            _sum += royaltyValues[index - 1];
        }
        return _sum;
    }

    /*****************
    Internal validation
    *****************/
    /// @dev hook to prevent badges from being transferred
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
                ids[index] != uint256(TokenTypes.Badge) || from == address(0),
                "Badges are not transferable"
            );
        }
    }

    /*****************
    Internal utils
    *****************/
    /// @dev Mint badge to license purchaser - nontransferable
    /// @param _recipient Where to send badge
    function _mintBadge(address _recipient) internal {
        // should be public but subject to rules set by the primary token owner
        _mint(_recipient, uint256(TokenTypes.Badge), 1, "");
    }

    /// @dev Set license countdown for now plus a set number of blocks
    /// @param _holder Who has license
    function _setCanMint(address _holder) internal {
        canMintUntil[_holder] = block.number + COUNTDOWN_BLOCKS;
    }

    /// @dev Complete the purchase and handle royalties
    /// @param _currentOwner Seller
    /// @param _newOwner Buyer
    /// @param _price msg.value for a purchase or weth for accepted bid
    function _purchase(
        address _currentOwner,
        address _newOwner,
        uint256 _price
    ) internal {
        minPurchasePrice =
            (_price * (10000 + MINT_INCREASE_INCREMENT_POINTS)) /
            10000; /*Increment the next purchase price*/

        uint256 _toOwner = (_price * (10000 - baseRoyalties)) / 10000; /*Calculate split to seller*/
        uint256 _toRoyalties = (_price * baseRoyalties) / 10000; /*Calculate split to all royalties*/

        _royaltyCount++; /*Track new royalty has been sent*/
        royaltyValues.push(_toRoyalties); /*Track purchase prices for royalties claim calculations*/

        (bool _successOwner, ) = _currentOwner.call{value: _toOwner}(""); /*Send ETH to seller*/
        require(_successOwner, "failed to send to owner");

        (bool _successRoyaltise, ) = royaltiesSplitter.call{
            value: _toRoyalties
        }(""); /*Send ETH to royalties pool*/
        require(_successOwner, "failed to send to royalties");

        // Move primary token to buyer
        _safeTransferFrom(
            _currentOwner,
            _newOwner,
            uint256(TokenTypes.Primary),
            1,
            ""
        );

        _setCanMint(_currentOwner); /* Start the license clock for previous owner to mint after they sell */
        _mintBadge(_newOwner); /*Mint badge to new purchaser*/
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
