import Player, { PlayerDirection } from "./Player";
import * as C from "./constants";
import { KaboomCtx, Vec2 } from "kaboom";
import BCBA from "./BCBA";

export default class MechPlayer extends Player {
  private _gun: string;

  public constructor(
    k: KaboomCtx,
    name: string,
    color: string,
    gun: string,
    facing: PlayerDirection = PlayerDirection.RIGHT,
    tags: string[] = [],
    startPosX: number,
    startPosY: number
  ) {
    const mechSprite = "mech-" + color + "-" + gun; // TODO replace all string literals with constants
    const projectileSprite = gun === "smallgun" ? "laser_ball" : "missile";
    const flip = facing === PlayerDirection.LEFT;

    const obj = k.add([
      k.sprite("mech", { flipX: flip, anim: mechSprite }),
      k.scale(0.4),
      k.pos(startPosX, startPosY),
      k.body(),
      k.area(),
      k.rotate(0),
      k.health(C.MAX_HEALTH),
      ...tags,
    ]);

    super(k, obj, name, mechSprite, projectileSprite, facing);

    this._gun = gun;

    this.onCollide(C.TAG_PLAYER, () => {
      k.shake(1);
      k.play("clang", { volume: 0.05, speed: 2 });
    });
  }

  // play sound based on gun type
  public playShotSound() {
    if (this._gun === "smallgun") {
      this.k.play("shoot2", { volume: 0.3 });
    } else {
      this.k.play("shoot1", { volume: 0.3 });
    }
  }

  public startBlocking(): void {
    if (!this._isBlocking) {
      this._isBlocking = true;
      this.obj.play(this._spriteName + "-shield");
      this.k.play("shield", { volume: 0.1, detune: 200, speed: 1.5 });
    }
  }

  public stopBlocking(): void {
    if (this._isBlocking) {
      this._isBlocking = false;
      this.obj.play(this._spriteName);
      this.k.play("shield", { volume: 0.1, detune: -600, speed: 2 });
    }
  }
}
