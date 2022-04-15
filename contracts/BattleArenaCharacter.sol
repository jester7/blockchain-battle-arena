// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract BattleArenaCharacter is ERC721 {
    using Counters for Counters.Counter;
    string private constant char1_no_bg =
        "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_1.png";
    string private constant char2_no_bg =
        "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_2.png";
    string private constant char3_no_bg =
        "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_3.png";
    string private constant char1_w_bg =
        "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_1_bg.png";
    string private constant char2_w_bg =
        "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_2_bg.png";
    string private constant char3_w_bg =
        "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_3_bg.png";

    string private fullImageUri;
    string private noBgImageUri;

    uint8[] private characterChoice;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Blockchain Battle Arena Character", "BCBAC") {}

    function safeMint(uint8 character, address to) public {
        uint256 tokenId = _tokenIdCounter.current();

        if (character < 1 || character > 3) {
            revert();
        }

        characterChoice.push(character);

        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        if (characterChoice[tokenId] == 1) {
            return char1_w_bg;
        } else if (characterChoice[tokenId] == 2) {
            return char2_w_bg;
        } else if (characterChoice[tokenId] == 3) {
            return char3_w_bg;
        }

        return char1_w_bg;
    }

    function tokenURINoBg(uint256 tokenId) public view returns (string memory) {
        if (characterChoice[tokenId] == 1) {
            return char1_no_bg;
        } else if (characterChoice[tokenId] == 2) {
            return char2_no_bg;
        } else if (characterChoice[tokenId] == 3) {
            return char3_no_bg;
        }
        return char1_no_bg;
    }
}
