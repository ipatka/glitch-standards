pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Storage.sol";

interface IRemix {
    function requestDerivative(address) external returns (bool);
}

///
/// @dev Interface for the NFT Royalty Standard
///
interface IERC2981 is IERC165 {
    /// ERC165 bytes to add to interface array - set in parent contract
    /// implementing this standard
    ///
    /// bytes4(keccak256("royaltyInfo(uint256,uint256)")) == 0x2a55205a
    /// bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;
    /// _registerInterface(_INTERFACE_ID_ERC2981);

    /// @notice Called with the sale price to determine how much royalty
    //          is owed and to whom.
    /// @param _tokenId - the NFT asset queried for royalty information
    /// @param _salePrice - the sale price of the NFT asset specified by _tokenId
    /// @return receiver - address of who should be sent the royalty payment
    /// @return royaltyAmount - the royalty payment amount for _salePrice
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        returns (address receiver, uint256 royaltyAmount);
}

contract Remix is ERC1155Supply, IERC2981, ERC165Storage {
    using SafeERC20 for IERC20;

    enum TokenTypes {
        Primary,
        Collectible,
        Derivative,
        Badge
    }

    mapping(address => uint256) canMintUntil;

    uint256 public countdownTime;

    uint256 public royalties;

    uint256 public minPurchasePrice; /*Next lowest price that primary token can be purchased for on perpetual auction*/
    uint256 public increasePoints; /*BP to increment RMX token price by*/

    uint256 public collectiblePrice; /*Initial price of collectible token*/

    bool public hasBeenMinted; /*Track if primary token has already been minted*/

    address[] public splitAddresses;
    mapping(address => uint256) public splits;

    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

    event RMXPurchased(uint256 tokenId, uint256 amount);
    event RMXCountdownStarted(address holder, uint256 expiration);
    event RoyaltiesHarvested(address[] recipients, uint256[] amounts);
    event DerivativeIssued(uint256 tokenId, address dst);
    event Finalized(bool success); // todo better
    event BadgeIssued(uint256 tokenId, address dst);
    event RoyaltyReceived(uint256 amount);
    event ParentAdded(address parent);

    constructor(
        string memory uri_,
        address[] memory _authors,
        uint256[] memory _authorSplits,
        uint256 _startingPrice,
        uint256 _increasePoints,
        uint256 _collectiblePrice,
        uint256 _rmxCountdown,
        uint256 _royalties,
        address[] memory _parents,
        uint256[] memory _parentSplits
    ) ERC1155(uri_) {
        require(_authors.length == _authorSplits.length, "!length");
        require(_parents.length == _parentSplits.length, "!length");

        uint256 _splitSum;

        for (uint256 _i = 0; _i < _authors.length; _i++) {
            splitAddresses.push(_authors[_i]);
            splits[_authors[_i]] = _authorSplits[_i];
            _splitSum += _authorSplits[_i];
            _mintBadge(_authors[_i]);
        }

        for (uint256 _j = 0; _j < _parents.length; _j++) {
            splitAddresses.push(_parents[_j]);
            splits[_parents[_j]] = _parentSplits[_j];
            _splitSum += _parentSplits[_j];
            require(IRemix(_parents[_j]).requestDerivative(msg.sender)); /*Request derivatives from each specified parent*/
        }

        require(_splitSum == 10000, "!split total");
        require(_royalties < 10000, "max royalties exceeded");

        collectiblePrice = _collectiblePrice;
        countdownTime = _rmxCountdown;

        royalties = _royalties;

        _mintPrimary(msg.sender, _startingPrice);

        _registerInterface(_INTERFACE_ID_ERC2981);
    }

    function _mintPrimary(address _recipient, uint256 _basePrice) internal {
        _mint(_recipient, uint256(TokenTypes.Primary), 1, "");
        minPurchasePrice = _basePrice; /*First purchase price - active immediately*/
    }

    function purchaseRmx(address _currentOwner) public payable {
        require(msg.value >= minPurchasePrice, "Not enough");
        require(
            (balanceOf(_currentOwner, uint256(TokenTypes.Primary)) == 1),
            "!owner"
        );
        minPurchasePrice =
            (minPurchasePrice * (10000 + increasePoints)) /
            10000; /*Increment the next purchase price*/
        safeTransferFrom(
            _currentOwner,
            msg.sender,
            uint256(TokenTypes.Primary),
            1,
            ""
        );
        _mintBadge(msg.sender);
    }

    function _mintBadge(address _recipient) internal {
        _mint(msg.sender, uint256(TokenTypes.Badge), 1, "");
        canMintUntil[_recipient] = block.timestamp + countdownTime;
    }

    function _performSplit(uint256 _total) internal {
        for (uint256 _i = 0; _i < splitAddresses.length; _i++) {
            uint256 _toSend = (splits[splitAddresses[_i]] * _total) / 10000;
            (bool _success, ) = splitAddresses[_i].call{value: _toSend}("");
            require(_success, "could not send");
        }
    }

    function _performSplit(address _tokenAddress, uint256 _total) internal {
        IERC20 _token = IERC20(_tokenAddress);
        for (uint256 _i = 0; _i < splitAddresses.length; _i++) {
            uint256 _toSend = (splits[splitAddresses[_i]] * _total) / 10000;
            require(
                _token.transfer(splitAddresses[_i], _toSend),
                "could not send"
            );
        }
    }

    function purchaseCollectible() external payable {
        require(totalSupply(uint256(TokenTypes.Collectible)) == 0, "Minted");
        require(msg.value >= collectiblePrice, "Not enough");
        _mint(msg.sender, uint256(TokenTypes.Collectible), 1, ""); /*Mint first so function can't be re-entered*/
        _performSplit(msg.value);
    }

    function harvestRoyalties(address _token) public {
        if (_token == address(0)) {
            _performSplit(address(this).balance); /*Harvest ETH*/
        } else {
            _performSplit(_token, IERC20(_token).balanceOf(address(this))); /*Harvest ERC20s*/
        }
    }

    function licenseActive(address _holder) public view returns (bool) {
        return
            (canMintUntil[_holder] > block.timestamp) ||
            (balanceOf(_holder, uint256(TokenTypes.Primary)) == 1);
    }

    // child functions
    function requestDerivative(address _minter) external {
        require(licenseActive(_minter), "!license");
        _mint(msg.sender, uint256(TokenTypes.Derivative), 1, "");
    }

    receive() external payable {
        emit RoyaltyReceived(msg.value);
    }

    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        return (address(this), (_salePrice * royalties) / 10000);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC165Storage, IERC165, ERC1155) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /*****************
    Hooks and internal utils
    *****************/
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data); /*Trigger parent hook to track supplies*/
        for (uint256 _i = 0; _i < ids.length; _i++) {
            require(
                to == address(0) ||
                    from == address(0) ||
                    ids[_i] == uint256(TokenTypes.Primary) ||
                    ids[_i] == uint256(TokenTypes.Collectible),
                "!transferable"
            );
        }
    }
}
