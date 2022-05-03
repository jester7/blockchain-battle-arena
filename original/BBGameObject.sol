// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/utils/Base64.sol';

import 'hardhat/console.sol';

contract BBGameObject is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    event MintedObject(address);
    event UpdatedObject(address);

    constructor() ERC721('Battle Arena Game Objects', 'BBGO') {}

    function mintGameObject(
        string calldata name,
        string calldata desc,
        string calldata url,
        string calldata acessoryName,
        string calldata acessoryUrl

    ) external {
        uint256 id = _tokenIdCounter.current();
        string memory uri = createGameObject(name, desc, url, acessoryName, acessoryUrl);
        _safeMint(msg.sender, id);
        _setTokenURI(id, uri);
        _tokenIdCounter.increment();
        emit MintedObject(msg.sender);
    }

    function createGameObject(
        string calldata name,
        string calldata desc,
        string calldata url,
        string calldata acessoryName,
        string calldata acessoryUrl
    ) internal pure returns (string memory) {
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{ "name": "',
                        name,
                        '", "description": "',
                        desc,
                        '","url": "',
                        url,
                        '","acessory_name": "',
                        acessoryName,
                        '","acessory_url": "',
                        acessoryUrl,
                        '"}'
                    )
                )
            )
        );
        string memory uri = string(
            abi.encodePacked('data:application/json;base64,', json)
        );

        return uri;
    }
}
