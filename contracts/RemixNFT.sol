// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "hardhat/console.sol";

interface IRemixNFT {
    function licenseHolder(address) external view returns (bool);
}

/// @title RemixNFT
contract RemixNFT is ERC1155, ERC1155Holder {
    mapping(bytes32 => bool) public signatureUsed;

    bool public hasBeenMinted;

    using ECDSA for bytes32;

    // function supportsInterface(bytes4 interfaceId) public view override(ERC1155, ERC1155Receiver) returns (bool) {
    //     return interfaceId == type(IERC1155Receiver).interfaceId || super.supportsInterface(interfaceId);
    // }
    /**
     * @dev See {IERC165-supportsInterface}.
     */
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

    function _verify(
        bytes32 data,
        bytes memory signature,
        address account
    ) internal pure returns (bool) {
        return data.toEthSignedMessageHash().recover(signature) == account;
    }

    enum TokenTypes {
        Primary,
        Reuse,
        License
    }

    constructor(string memory uri_) ERC1155(uri_) {}

    // Nice to haves
    // get parents - get children

    // Attach contact info for the primary info

    mapping(address => bool) public licenseHolder;

    function mintPrimary(
        string memory uri_,
        address[] memory _reuseTokens,
        address[] memory _licenseTokens
    ) external {
        require(!hasBeenMinted, "primary token already minted");
        for (uint256 index = 0; index < _licenseTokens.length; index++) {
            require(
                IRemixNFT(_licenseTokens[index]).licenseHolder(msg.sender),
                "Does not hold license"
            );
            IERC1155(_licenseTokens[index]).safeTransferFrom(
                msg.sender,
                address(this),
                uint256(TokenTypes.Reuse),
                1,
                ""
            );
        }

        for (uint256 index = 0; index < _reuseTokens.length; index++) {
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

    function mintReuse(uint256 _amount) external {
        // should be public but subject to rules set by the primary token owner
        _mint(msg.sender, uint256(TokenTypes.Reuse), _amount, "");
    }

    function mintLicense(
        uint256 _nonce,
        bytes memory _signature,
        address _licensor
    ) external {
        bytes32 _digest = keccak256(
            abi.encodePacked(_nonce, msg.sender, address(this))
        );
        require(!signatureUsed[_digest], "signature already used");
        signatureUsed[_digest] = true;
        require(
            balanceOf(_licensor, uint256(TokenTypes.Primary)) == 1,
            "signature not issued by licensor"
        );

        _verify(_digest, _signature, _licensor); // verify license was signed by owner of token ID 1
        licenseHolder[msg.sender] = true;
        _mint(msg.sender, uint256(TokenTypes.License), 1, "");
    }
}
