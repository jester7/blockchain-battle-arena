// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./BattleArenaTypes.sol";

//import "hardhat/console.sol";

contract BattleArenaNFT is ERC721, BattleArenaTypes, Ownable {
    using Counters for Counters.Counter;

    uint8[] private nftImages;

    mapping(uint256 => TokenType) private tokenToType;
    mapping(uint256 => address) internal tokenIdToOwner;
    mapping(address => uint256) internal ownerToCharacterCount;
    mapping(uint256 => uint8) internal tokenIdToAccessoryCount;

    mapping(uint256 => uint256[]) internal charTokenIdToAccessoryTokenIds;
    mapping(uint256 => uint256) internal accessoryTokenIdToCharTokenId;

    //mapping(uint256 => address[]) private tokenIdToChildren;

    mapping(uint256 => AccessoryTransform) private tokenIdToAccessoryTransform;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Blockchain Battle Arena", "BATTLEARENA") {}

    function mintCharacter(uint8 characterIndex) public {
        // not one of the allowed characters 1-3
        require(
            characterIndex > 0 && characterIndex <= 3,
            "characterIndex must be between 1 and 3"
        );

        uint256 tokenId = _tokenIdCounter.current();

        _safeMint(msg.sender, tokenId);
        tokenToType[tokenId] = TokenType.CHARACTER;
        nftImages.push(characterIndex);
        tokenIdToOwner[tokenId] = msg.sender;
        ownerToCharacterCount[msg.sender]++;

        emit CharacterNFTMinted(msg.sender, tokenId, characterIndex);

        _tokenIdCounter.increment();
    }

    function mintAccessory(
        uint8 accessoryIndex,
        uint256 forTokenId,
        uint16 x,
        uint16 y,
        uint16 rotationAngle,
        uint16 scale,
        uint8 zIndex,
        bool flipX,
        bool flipY
    ) public {
        require(
            accessoryIndex >= 4 && accessoryIndex <= 6,
            "accessoryIndex must be between 4 and 6"
        );
        require(
            tokenToType[forTokenId] == TokenType.CHARACTER,
            "can only add an accessory to a character"
        );

        uint256 tokenId = _tokenIdCounter.current();

        _safeMint(msg.sender, tokenId);
        tokenToType[tokenId] = TokenType.ACCESSORY;
        nftImages.push(accessoryIndex);
        tokenIdToOwner[tokenId] = msg.sender;

        uint256[] storage currentAccessories = charTokenIdToAccessoryTokenIds[
            forTokenId
        ];
        currentAccessories.push(tokenId);

        accessoryTokenIdToCharTokenId[tokenId] = forTokenId;

        tokenIdToAccessoryCount[forTokenId]++;

        AccessoryTransform memory transform = AccessoryTransform(
            x,
            y,
            rotationAngle,
            scale,
            zIndex,
            flipX,
            flipY
        );
        tokenIdToAccessoryTransform[tokenId] = transform;

        emit AccessoryNFTMinted(
            msg.sender,
            forTokenId,
            tokenId,
            accessoryIndex
        );
        emit AccessoryEquipped(msg.sender, forTokenId, tokenId, accessoryIndex);

        _tokenIdCounter.increment();
    }

    function mintAccessoryWithDefaults(uint8 accessoryIndex, uint256 forTokenId)
        public
    {
        mintAccessory(accessoryIndex, forTokenId, 0, 0, 0, 1, 0, false, false);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        string memory url;
        string memory typeString;
        bytes memory accessoryName;

        if (tokenToType[tokenId] == TokenType.CHARACTER) {
            typeString = "Character";
            if (nftImages[tokenId] == 1) {
                url = char1_w_bg;
            } else if (nftImages[tokenId] == 2) {
                url = char2_w_bg;
            } else if (nftImages[tokenId] == 3) {
                url = char3_w_bg;
            }
        } else if (tokenToType[tokenId] == TokenType.ACCESSORY) {
            typeString = "accessory";
            accessoryName = abi.encodePacked(
                getAccessoryName(nftImages[tokenId]),
                " "
            );
            if (nftImages[tokenId] == 4) {
                url = accessory1;
            } else if (nftImages[tokenId] == 5) {
                url = accessory2;
            } else if (nftImages[tokenId] == 6) {
                url = accessory3;
            }
        }

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Blockchain Battle Arena ',
                        accessoryName,
                        typeString,
                        '","description": "This ',
                        accessoryName,
                        typeString,
                        ' NFT is part of a small sample collection for the Blockchain Battle Arena game.", "image": "',
                        url,
                        '"}'
                    )
                )
            )
        );

        string memory finalUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return finalUri;
    }

    function getFullImage(uint256 tokenId) public view returns (string memory) {
        if (tokenToType[tokenId] == TokenType.CHARACTER) {
            if (nftImages[tokenId] == 1) {
                return char1_w_bg;
            } else if (nftImages[tokenId] == 2) {
                return char2_w_bg;
            } else if (nftImages[tokenId] == 3) {
                return char3_w_bg;
            }
        } else if (tokenToType[tokenId] == TokenType.ACCESSORY) {
            if (nftImages[tokenId] == 4) {
                return accessory1;
            } else if (nftImages[tokenId] == 5) {
                return accessory2;
            } else if (nftImages[tokenId] == 6) {
                return accessory3;
            }
        }

        return "";
    }

    function getBaseCharacterImage(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        require(
            tokenToType[tokenId] == TokenType.CHARACTER,
            "accessories don't have a base image, use getFullImage or inspect metadata in tokenURI methods instead"
        );

        if (nftImages[tokenId] == 1) {
            return char1_no_bg;
        } else if (nftImages[tokenId] == 2) {
            return char2_no_bg;
        } else if (nftImages[tokenId] == 3) {
            return char3_no_bg;
        }
        return "";
    }

    function typeOf(uint256 tokenId) public view returns (TokenType) {
        return tokenToType[tokenId];
    }

    function isCharacter(uint256 tokenId) public view returns (bool) {
        return tokenToType[tokenId] == TokenType.CHARACTER;
    }

    function isAccessory(uint256 tokenId) public view returns (bool) {
        return tokenToType[tokenId] == TokenType.ACCESSORY;
    }

    function hasAccessories(uint256 tokenId) public view returns (bool) {
        if (tokenToType[tokenId] == TokenType.CHARACTER) {
            return tokenIdToAccessoryCount[tokenId] > 0;
        }
        return false;
    }

    function setTransform(
        uint256 tokenId,
        uint16 x,
        uint16 y,
        uint16 rotationAngle,
        uint16 scale,
        uint8 zIndex,
        bool flipX,
        bool flipY
    ) public onlyOwner {
        require(
            tokenToType[tokenId] == TokenType.ACCESSORY,
            "can only set transform for accessories"
        );
        AccessoryTransform memory transform = AccessoryTransform(
            x,
            y,
            rotationAngle,
            scale,
            zIndex,
            flipX,
            flipY
        );
        tokenIdToAccessoryTransform[tokenId] = transform;
        emit AccessoryTransformUpdated(tokenId, transform);
    }

    function removeAccessory(uint256 charTokenId, uint256 accessoryTokenId)
        public
        onlyOwner
    {
        require(
            tokenToType[accessoryTokenId] == TokenType.ACCESSORY,
            "can only remove accessories"
        );
        require(
            tokenToType[charTokenId] == TokenType.CHARACTER,
            "can only remove accessories from characters"
        );
        require(
            accessoryTokenIdToCharTokenId[accessoryTokenId] == charTokenId,
            "accessory is not attached to this character"
        );

        uint256[] memory currentAccessories = charTokenIdToAccessoryTokenIds[
            charTokenId
        ];

        if (currentAccessories.length == 1) {
            charTokenIdToAccessoryTokenIds[charTokenId] = new uint256[](0);
        } else {
            uint256[] memory newAccessories = new uint256[](
                currentAccessories.length - 1
            );
            uint8 j = 0;
            for (uint8 i = 0; i < currentAccessories.length; i++) {
                if (currentAccessories[i] != accessoryTokenId) {
                    newAccessories[j] = currentAccessories[i];
                    j++;
                }
            }
            charTokenIdToAccessoryTokenIds[charTokenId] = newAccessories;
        }
        delete accessoryTokenIdToCharTokenId[accessoryTokenId];
        tokenIdToAccessoryCount[charTokenId]--;
        emit AccessoryRemoved(
            msg.sender,
            charTokenId,
            accessoryTokenId,
            nftImages[accessoryTokenId]
        );
    }

    function equipAccessory(uint256 charTokenId, uint256 accessoryTokenId)
        public
        onlyOwner
    {
        require(
            tokenToType[charTokenId] == TokenType.CHARACTER,
            "can only equip accessories on characters"
        );
        require(
            tokenToType[accessoryTokenId] == TokenType.ACCESSORY,
            "can only equip accessories"
        );
        require(
            tokenIdToOwner[charTokenId] == msg.sender,
            "can only equip accessories on your own characters"
        );
        require(
            tokenIdToOwner[accessoryTokenId] == msg.sender,
            "can only equip accessories you own"
        );
        require(
            tokenIdToAccessoryCount[charTokenId] < 3,
            "can only equip up to 3 accessories"
        );

        uint256 prevOwner = accessoryTokenIdToCharTokenId[accessoryTokenId];
        if (prevOwner != 0) {
            removeAccessory(prevOwner, accessoryTokenId);
        }

        uint256[] storage currentAccessories = charTokenIdToAccessoryTokenIds[
            charTokenId
        ];
        currentAccessories.push(accessoryTokenId);
        charTokenIdToAccessoryTokenIds[charTokenId] = currentAccessories;
        tokenIdToAccessoryCount[charTokenId]++;
        emit AccessoryEquipped(msg.sender, charTokenId, accessoryTokenId, nftImages[accessoryTokenId]);
    }

    function getTransform(uint256 tokenId)
        public
        view
        returns (AccessoryTransform memory)
    {
        require(
            tokenToType[tokenId] == TokenType.ACCESSORY,
            "can only get transform for accessories"
        );

        return tokenIdToAccessoryTransform[tokenId];
    }

    function getAccessoryName(uint8 accessoryIndex)
        internal
        pure
        returns (string memory)
    {
        require(
            accessoryIndex >= 4 && accessoryIndex <= 6,
            "accessoryIndex must be between 4 and 6"
        );
        if (accessoryIndex == 4) {
            return "cigarette";
        } else if (accessoryIndex == 5) {
            return "eye lenser";
        } else if (accessoryIndex == 6) {
            return "hat";
        }
        return "";
    }

    function getAccessories(uint256 charTokenId)
        public
        view
        returns (Accessory[] memory)
    {
        require(
            tokenToType[charTokenId] == TokenType.CHARACTER,
            "can only get accessories for characters"
        );

        uint256[] memory accessoryTokenIds = charTokenIdToAccessoryTokenIds[
            charTokenId
        ];
        Accessory[] memory accessories = new Accessory[](
            accessoryTokenIds.length
        );
        for (uint8 i = 0; i < accessoryTokenIds.length; i++) {
            uint8 accessoryIndex = nftImages[accessoryTokenIds[i]];
            Accessory memory accessory = Accessory(
                accessoryIndex,
                getAccessoryName(accessoryIndex),
                getFullImage(accessoryTokenIds[i]),
                getTransform(accessoryTokenIds[i])
            );
            accessories[i] = accessory;
        }
        return accessories;
    }

    function getFullCharacterData(uint256 tokenId)
        public
        view
        returns (CharacterWithAccessories memory)
    {
        require(
            tokenToType[tokenId] == TokenType.CHARACTER,
            "method called on non-character token"
        );

        CharacterWithAccessories memory character = CharacterWithAccessories(
            nftImages[tokenId],
            getFullImage(tokenId),
            getBaseCharacterImage(tokenId),
            getAccessories(tokenId)
        );

        return character;
    }
}
