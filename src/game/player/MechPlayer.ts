import Player, { PlayerDirection } from "./Player";
import * as C from "../constants";
import { GameObj, KaboomCtx, StateComp, Vec2 } from "kaboom";
import BCBA from "../BCBA";
import InputSource from "./input/InputSource";

export default class MechPlayer extends Player {
  private _gun: string;
  private _projectileSpriteName: string;
  private _projectileCount: number = 0;
  private innerObj: GameObj;

  public constructor(
    k: KaboomCtx,
    name: string,
    spriteNum: number,
    color: string,
    gun: string,
    facing: PlayerDirection = PlayerDirection.RIGHT,
    mainTag: string,
    tags: string[] = [],
    startPosX: number,
    startPosY: number,
    inputSource: InputSource,
    states?: StateComp
  ) {
    const mechSprite = "mech-" + color + "-" + gun; // TODO replace all string literals with constants
    const projectileSprite = gun === "smallgun" ? "laser_ball" : "missile";
    const flip = facing === PlayerDirection.LEFT;
    const obj = k.add([
      k.sprite("mech", { flipX: flip, anim: mechSprite }),
      k.scale(0.5),
      k.pos(startPosX, startPosY),
      k.body(),
      k.area(),
      states,
      k.rotate(0),
      k.health(C.MAX_HEALTH),
      k.z(12),
      mainTag, // tags are used to check collisions and distinguish between own projectiles and opponent's projectiles
      ...tags,
    ]);

    super(k, obj, name, mechSprite, facing, mainTag, inputSource, startPosX, startPosY);
    this.innerObj = this.addCharacterSprite(spriteNum);
    this._projectileSpriteName = projectileSprite;
    this._gun = gun;

    // this.onCollide(C.TAG_PLAYER, () => { // TODO disabled because the sound can get annoying, fix buginess
    //   k.shake(1);
    //   k.play("clang", { volume: 0.05, speed: 2 });
    // });
  }

  public setFacingDirection(direction: PlayerDirection) {
    if (this._facing !== direction) {
      this._facing = direction;
      this.obj.flipX(direction === PlayerDirection.LEFT);
      this.innerObj.flipX(direction === PlayerDirection.LEFT);
    }
  }

  private addCharacterSprite(spriteNum: number) {
    let spriteName = "char" + spriteNum;

    const flip = this._facing === PlayerDirection.LEFT; // if facing LEFT add the sprites already flipped

    // here instead of spriteName, for NFTs we do kaboom.loadSprite with data uri and then add
    return this.k.add([
      this.k.sprite(spriteName, { flipX: flip }),
      this.k.z(10), // set a lower z index so that the character image is behind the mech suit
      this.k.pos(),
      this.k.follow(this.obj), // attaches the character sprite to mech suit, can attach multiple sprites such as accessories
      this.k.scale(0.5),
      this.k.rotate(0),
    ]);
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

  public shoot() {
    if (!this.isBlocking()) {
      // can't shoot and block at the same time
      const projectileTag =
        this._mainTag + "_" + C.TAG_PROJECTILE + this._projectileCount;
      this._projectileCount++;
      let projectile = this.k.add([
        this.k.sprite(this._projectileSpriteName, {
          flipX: this.isFacingLeft(),
        }),
        this.k.z(11),
        this.isFacingRight()
          ? this.k.pos(this.pos().add(140, 130))
          : this.k.pos(this.pos().add(-5, 130)),
        this.k.area(),
        this.k.move(
          0,
          this.isFacingLeft()
            ? -C.DEFAULT_PROJECTILE_SPEED
            : C.DEFAULT_PROJECTILE_SPEED
        ),
        this.k.cleanup(),
        this.k.scale(0.15),
        this.k.origin("center"),
        this._projectileSpriteName === "laser_ball" ? this.rotate() : "",
        C.TAG_PROJECTILE,
        projectileTag,
      ]);

      this.playShotSound();
      this.k.onCollide(
        projectileTag,
        this._opponent?.getMainTag() as string,
        (p: any, o: any) => {
          this.k.destroy(p);
          this.k.play("explosion1", { volume: 0.4, speed: 2.0 });
          const damage = this._opponent!.isBlocking()
            ? C.DEFAULT_PROJECTILE_DAMAGE / 10
            : C.DEFAULT_PROJECTILE_DAMAGE;
          o.hurt(damage);
          BCBA.getInstance().updateHealthInfo();
          this.addExplosion(p.pos);
          this.k.shake(5);
        }
      );

      // blow up the projectile if it collides with a platform
      this.k.onCollide(projectileTag, C.TAG_PLATFORM, (p: any, o: any) => {
        this.k.destroy(p);
        this.k.play("explosion1", { volume: 0.4, speed: 2.0 });
        this.addExplosion(p.pos);
        this.k.shake(2);
      });

      // blow up the projectile if it collides with another projectile
      // this.k.onCollide(C.TAG_PROJECTILE, C.TAG_PROJECTILE, (p: any, o: any) => {
      //   this.k.destroy(p);
      //   //this.k.destroy(o);
      //   this.k.play("explosion1", { volume: 0.4, speed: 2.0 });
      //   this.addExplosion(p.pos); //TODO known issue - explosion is not centered, triple explosion
      //   this.k.shake(1);
      // });
    }
  }

  private rotate(): any {
    let ctx = this.k;
    let facingLeft = this.isFacingLeft();
    return {
      id: "projectile_rotation",
      update() {
        this.angle = ctx.time() * 300 * (facingLeft ? -1 : 1); // rotate counter clockwise if facing left
      },
    };
  }

  public addExplosion(p: Vec2) {
    this.k.add([
      this.k.sprite("explosion"),
      this.k.z(20),
      this.k.scale(0.33),
      this.isFacingRight()
        ? this.k.pos(p.add(10, -40))
        : this.k.pos(p.add(-100, -40)),
      this.k.lifespan(0.5, { fade: 0.5 }),
    ]);
  }

  public moveLeft(): void {
    this.obj.angle = -C.PLAYER_TILT_ANGLE;
    this.innerObj.angle = -C.PLAYER_TILT_ANGLE;

    this.obj.move(-C.DEFAULT_PLAYER_SPEED, 0);
  }

  public moveRight(): void {
    this.obj.angle = C.PLAYER_TILT_ANGLE;
    this.innerObj.angle = C.PLAYER_TILT_ANGLE;

    this.obj.move(C.DEFAULT_PLAYER_SPEED, 0);
  }

  public moveTo(dest: Vec2, speed?: number): void {
    this.obj.moveTo(dest, speed);
  }

  public upright(): void {
    this.obj.angle = 0;
    this.innerObj.angle = 0;
  }
}
