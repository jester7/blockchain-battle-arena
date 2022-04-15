// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract BattleArenaCharacter is ERC721 {
    using Counters for Counters.Counter;
    


    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Blockchain Battle Arena Accessory", "BCBAA") {}

    function safeMint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();

        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

}
