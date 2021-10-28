// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "hardhat/console.sol";

/// @title RemixNFT
/// @dev ERC1155 contract which locks ERC1155 remix tokens from sampled works on mint
///
///  Features in this version
///
///     ERC1155 multi token contract
///         Token ID 1: Primary art work - 1/1
///         Token ID 2: Unlimited remix tokens mintable by anyone
///         Token ID 3: Permissioned license tokens, requires consent by primary token holder
///
///  Features not yet implemented
///     Remix token IDs for each layer of a work
///     Licenses should not be transferable
contract RemixNFT is ERC1155, ERC1155Holder {
    using ECDSA for bytes32; /*ECDSA for signature recovery for license mints*/

    // Track different token types for work, remix, license
    enum TokenTypes {
        Primary,
        Remix,
        License
    }

    bool public hasBeenMinted; /*Track if primary token has already been minted*/

    mapping(bytes32 => bool) public signatureUsed; /* track if license consent signature has been used */
    
    /// @dev Construtor sets the token base URI, and external interfaces 
    /// @param uri_ String to prepend to token IDs
    constructor(string memory uri_) ERC1155(uri_) {}

    ///@dev Allow this contract to receive ERC1155 tokens safely
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, ERC1155Receiver)
        returns (bool)
    {
        return
            interfaceId == type(IERC1155Receiver).interfaceId ||
            interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IERC1155MetadataURI).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /// @dev Internal util to confirm license signatures
    /// @param data Message hash
    /// @param signature Sig from primary token holder
    /// @param account address to compare with recovery
    function _verify(
        bytes32 data,
        bytes memory signature,
        address account
    ) internal pure returns (bool) {
        return data.toEthSignedMessageHash().recover(signature) == account;
    }

    /*****************
    Public minting
    *****************/
    /// @dev Mint the token for this work - can only be done once
    /// @param uri_ String to prepend to token IDs
    /// @param _remixTokens Remix tokens to embed
    /// @param _licenseTokens License tokens to embed
    function mintPrimary(
        string memory uri_,
        address[] memory _remixTokens,
        address[] memory _licenseTokens
    ) external {
        require(!hasBeenMinted, "primary token already minted");
        for (uint256 index = 0; index < _licenseTokens.length; index++) {
            IERC1155(_licenseTokens[index]).safeTransferFrom(
                msg.sender,
                address(this),
                uint256(TokenTypes.Remix),
                1,
                ""
            );
        }

        for (uint256 index = 0; index < _remixTokens.length; index++) {
            IERC1155(_licenseTokens[index]).safeTransferFrom(
                msg.sender,
                address(this),
                uint256(TokenTypes.License),
                1,
                ""
            );
        }
        _setURI(uri_);
        hasBeenMinted = true;
        _mint(msg.sender, uint256(TokenTypes.Primary), 1, "");
    }

    /// @dev Free mint unlimited remix tokens
    /// @param _amount How many to mint
    function mintRemix(uint256 _amount) external {
        // should be public but subject to rules set by the primary token owner
        _mint(msg.sender, uint256(TokenTypes.Remix), _amount, "");
    }

    /// @dev Restricted minting of license tokens by primary work holder signature
    /// @param _nonce Signature nonce
    /// @param _signature Sig from primary token holder
    /// @param _licensor Address of primary token holder
    function mintLicense(
        uint256 _nonce,
        bytes memory _signature,
        address _licensor
    ) external {
        bytes32 _digest = keccak256(
            abi.encodePacked(_nonce, msg.sender, address(this))
        );
        require(!signatureUsed[_digest], "signature already used");
        signatureUsed[_digest] = true; /*Mark signature as used so we cannot use it again*/

        require(
            balanceOf(_licensor, uint256(TokenTypes.Primary)) == 1,
            "signature not issued by licensor"
        );

        _verify(_digest, _signature, _licensor); // verify license was signed by owner of token ID 1
        _mint(msg.sender, uint256(TokenTypes.License), 1, "");
    }

}
