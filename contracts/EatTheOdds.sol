/*
Crafted with love by
Fueled on Bacon
https://fueledonbacon.com
*/
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Whitelist.sol";
import "./ERC721A.sol";
import "./SaleWindow.sol";

contract EatTheOdds is ERC721A, Ownable, AccessControl, Whitelist, SaleWindow {
    using Strings for uint256;

    uint256 private constant _MAX_SUPPLY = 8192;
    
    uint256 public price;
    uint256 public launchBlock;
    string private _baseUri;

    bool public whitelistFinished;


    mapping(address => bool) public userHasMinted;

    modifier canMint {
        require(saleIsActive(), "SALE_NOT_ACTIVE");
        require(msg.value == price, "WRONG_PRICE");
        require(!userHasMinted[_msgSender()], "ALREADY_MINTED");
        require(totalSupply() + 1 <= _MAX_SUPPLY, "MAX_SUPPLY_REACHED");
        _;
    }

    constructor(
        uint256 price_,
        uint256 _startSaleTime,
        uint256 _endSaleTime,
        bytes32 _whitelistMerkleRoot,
        string memory name,
        string memory symbol,
        string memory baseUri
    )
        ERC721A(name, symbol) Whitelist(_whitelistMerkleRoot) SaleWindow(_startSaleTime, _endSaleTime)
    {
        _baseUri = baseUri;
        price = price_;
        launchBlock = block.number;
    }

    function airdrop(address[] memory addresses) external onlyOwner {
        uint256 length = addresses.length;
        require(length  + totalSupply() <= _MAX_SUPPLY, "MAX_SUPPLY_REACHED");
        for (uint i = 0; i < length; i++) {
            _safeMint(addresses[i], 1);
        }
    }

    function airdropQuantity(address addr, uint quantity) external onlyOwner {
        require(quantity  + totalSupply() <= _MAX_SUPPLY, "MAX_SUPPLY_REACHED");
        _safeMint(addr, quantity);
    }


    function setPrice(uint256 price_) external onlyOwner {
        price = price_;
    }

    function withdrawBalance(address payable to) external onlyOwner {
        to.transfer(address(this).balance);
    }

    function setBaseURI(string memory baseUri) external onlyOwner {
        _baseUri = baseUri;
    }

    function toggleWhitelist() external onlyOwner {
        whitelistFinished = !whitelistFinished;
    }

    /// @dev override base uri. It will be combined with token ID
    function _baseURI() internal view override returns (string memory) {
        return _baseUri;
    }

    
    function whitelistMint(bytes32[] calldata _merkleProof) external payable canMint {
        require(!whitelistFinished, "WHITELIST_FINISHED");
        address account = _msgSender();
        require(verifyWhitelist(_merkleProof, account), "WHITELIST_NOT_VERIFIED");
        _mint(account);
    }

    function publicMint() external payable canMint  {
        require(whitelistFinished, "WHITELIST_NOT_YET_FINISHED");
        _mint(_msgSender());
    }

    function _mint(address account) private {
        
        userHasMinted[account] = true;
        _safeMint(account, 1);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI = _baseURI();
        return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : '';
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721A, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    receive() external payable { }
}
