import mech_sprites from "../sprites/all-mechs-medium.png";
import bg_stage_1_base from "../sprites/background_base_layer.jpg";
import base_platform from "../sprites/base_platform.png";
import platform from "../sprites/platform.png";
import bg_title from "../../home-background.jpg";
import sprite_explosion from "../sprites/explosion.png";
import sprite_character1 from "../sprites/character_idea_1.png";
import sprite_char1 from "../sprites/char1-small.png";
import sprite_char2 from "../sprites/char2-small.png";
import sprite_char3 from "../sprites/char3-small.png";
import logo from "../sprites/bcba-logo.png";

import sprite_missile from "../sprites/missile.png";
import sprite_laser_ball from "../sprites/laser-ball-2.png";

import sound_shot from "../sounds/146730__leszek-szary__shoot.wav";
import sound_laser from "../sounds/151022__bubaproducer__laser-shot-silenced.wav";
import sound_clang from "../sounds/351372__wilhellboy__lightringingclang.mp3";
import sound_explosion1 from "../sounds/136765__mitchelk__explode001.wav";
import sound_countdown from "../sounds/472853__nakamurasensei__countdown-to-fight.wav";
import sound_cheers from "../sounds/575563__keerotic__cheers.wav";
import sound_shield from "../sounds/425412__kurlyjoe__wub-2.wav";
import { KaboomCtx } from "kaboom";

export enum AssetType {
  SPRITE,
  SOUND,
}

export interface GameAsset {
  data: any;
  type: AssetType;
  options: any;
}

export default class AssetManager {
  private static _assets: { [name: string]: GameAsset } = {};
  private static _ctx: KaboomCtx;

  public static setContext(ctx: KaboomCtx): void {
    AssetManager._ctx = ctx;
  }

  public static get(name: string): GameAsset {
    return AssetManager._assets[name];
  }

  public static getData(name: string): any {
    return AssetManager._assets[name].data;
  }

  public static add(
    name: string,
    data: any,
    type: AssetType = AssetType.SPRITE,
    options?: any
  ): void {
    AssetManager._assets[name] = { data, type, options };
  }

  public static addSound(name: string, data: any, options?: any): void {
    AssetManager.add(name, data, AssetType.SOUND, options);
  }

  public static addAll(): void {
    AssetManager.add("mech", mech_sprites, AssetType.SPRITE, {
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
    });
    AssetManager.add("bg1", bg_stage_1_base);
    AssetManager.add("bg1_platform", base_platform);
    AssetManager.add("bg1_platform_small", platform);

    AssetManager.add("title-bg", bg_title);

    AssetManager.add("explosion", sprite_explosion);
    AssetManager.add("character1", sprite_character1);
    AssetManager.add("char1", sprite_char1);
    AssetManager.add("char2", sprite_char2);
    AssetManager.add("char3", sprite_char3);
    AssetManager.add("logo", logo);
    AssetManager.add("missile", sprite_missile);
    AssetManager.add("laser_ball", sprite_laser_ball);
    AssetManager.addSound("shoot1", sound_shot);
    AssetManager.addSound("shoot2", sound_laser);
    AssetManager.addSound("clang", sound_clang);
    AssetManager.addSound("explosion1", sound_explosion1);
    AssetManager.addSound("countdown", sound_countdown);
    AssetManager.addSound("cheers", sound_cheers);
    AssetManager.addSound("shield", sound_shield);
  }

  public static loadAll(): void {
    for (let key in AssetManager._assets) {
      if (AssetManager._assets[key].type === AssetType.SPRITE) {
        AssetManager._ctx.loadSprite(
          key,
          AssetManager._assets[key].data,
          AssetManager._assets[key].options
        );
      } else if (AssetManager._assets[key].type === AssetType.SOUND) {
        AssetManager._ctx.loadSound(key, AssetManager._assets[key].data);
      }
    }
  }
}

AssetManager.addAll();


// this.log("loading sprites...");
    // this.k.loadSprite("bg1", sprite_bg);
    // this.k.loadSprite("logo", logo);
    // LoadMechSpriteSheet(this.k);
    // this.k.loadSprite("char1", sprite_char1);
    // this.k.loadSprite("char2", sprite_char2);
    // this.k.loadSprite("char3", sprite_char3);

    // this.k.loadSprite("missile", sprite_missile);
    // this.k.loadSprite("laser_ball", sprite_laser_ball);

    // this.k.loadSprite("explosion", sprite_explosion);
    // this.k.loadSprite("character1", sprite_character1);

    // this.k.loadSound("shoot1", sound_shot);
    // this.k.loadSound("shoot2", sound_laser);

    // this.k.loadSound("clang", sound_clang);
    // this.k.loadSound("explosion1", sound_explosion1);
    // this.k.loadSound("countdown", sound_countdown);
    // this.k.loadSound("cheers", sound_cheers);
    // this.k.loadSound("shield", sound_shield);