// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

// import "hardhat/console.sol";

contract BattleArenaTypes {

    string internal constant char1_no_bg =
        "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_1.png";
    string internal constant char2_no_bg =
        "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_2.png";
    string internal constant char3_no_bg =
        "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_3.png";
    string internal constant char1_w_bg =
        "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_1_bg.png";
    string internal constant char2_w_bg =
        "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_2_bg.png";
    string internal constant char3_w_bg =
        "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_3_bg.png";
    string internal constant accessory1 =
        "https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/cigarette.png";
    string internal constant accessory2 =
        "https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/eye_lenser.png";
    string internal constant accessory3 =
        "https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/hat.png";

    event CharacterNFTMinted(address sender, uint256 tokenId, uint256 characterIndex);
    event AccessoryNFTMinted(address sender, uint256 characterTokenId, uint256 accessoryTokenId, uint256 accessoryIndex);
    event AccessoryEquipped(address sender, uint256 characterTokenId, uint256 accessoryTokenId, uint256 accessoryIndex);
    event AccessoryRemoved(address sender, uint256 characterTokenId, uint256 accessoryTokenId, uint256 accessoryIndex);
    event AccessoryTransformUpdated(uint256 tokenId, AccessoryTransform newTransform);

    enum TokenType {
        CHARACTER,
        ACCESSORY
    }

    struct AccessoryTransform {
        uint16 x;
        uint16 y;
        uint16 rotationAngle;
        uint16 scale;
        uint8 zIndex;
        bool flipX;
        bool flipY;
    }

    struct Accessory {
        uint8 accessoryId;
        string name;
        string imageUrl;
        AccessoryTransform transform;
    }

    struct CharacterWithAccessories {
        uint8 characterId;
        string fullImageUrl;
        string baseImageUrl;
        Accessory[] accessories;
    }
}