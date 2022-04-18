import { KaboomCtx } from "kaboom";
import mech_sprites from "./sprites/all-mechs-medium.png";


export default function LoadMechSpriteSheet(k: KaboomCtx) {
    
    k.loadSprite("mech", mech_sprites, {
        sliceX: 8, // 8 total mech sprites
        anims: {
            "mech-blue-smallgun": 0,
            "mech-blue-smallgun-shield": 1,
            "mech-blue-biggun": 2,
            "mech-blue-biggun-shield": 3,
            "mech-red-smallgun": 4,
            "mech-red-smallgun-shield": 5,
            "mech-red-biggun": 6,
            "mech-red-biggun-shield": 7,
        },
    })
    

}