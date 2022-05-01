import { Collision, GameObj, KaboomCtx, Tag, Vec2 } from "kaboom";
import BCBA from "../BCBA";
import * as C from "../constants";

export enum PlayerDirection {
  LEFT,
  RIGHT,
}

export default abstract class Player {
  protected k: KaboomCtx;
  public obj: GameObj;
  public innerObj: GameObj;

  private _name: string;
  protected _spriteName: string;
  private _projectileSpriteName: string;
  private _facing: PlayerDirection;
  protected _opponent: Player | undefined = undefined;
  private _projectileCount: number = 0;
  protected _isBlocking: boolean = false;
  protected _mainTag: string;

  public constructor(
    k: KaboomCtx,
    playerObj: GameObj,
    name: string,
    spriteNum: number,
    spriteName: string,
    projectileSpriteName: string,
    facing: PlayerDirection = PlayerDirection.RIGHT,
    mainTag: string,
  ) {
    this.k = k;
    this.obj = playerObj;
    this._name = name;
    this._spriteName = spriteName;
    this._projectileSpriteName = projectileSpriteName;
    this._facing = facing;
    this.innerObj = this.addCharacterSprite(spriteNum);
    this._mainTag = mainTag;
    this.onUpdate(() => {
      this.checkFacingDirection();
    });

  }

  public getMainTag(): string {
    return this._mainTag;
  }


  private addCharacterSprite(spriteNum: number) {
    let spriteName = "char" + spriteNum;
    
    const flip = this._facing === PlayerDirection.LEFT; // if facing LEFT add the sprites already flipped

    // here instead of spriteName, for NFTs we do kaboom.loadSprite with data uri and then add
    return this.k.add([
      this.k.sprite(spriteName, {flipX: flip} ),
      this.k.z(1), // set a lower z index so that the character image is behind the mech suit
      this.k.pos(),
      this.k.follow(this.obj), // attaches the character sprite to mech suit, can attach multiple sprites such as accessories
      this.k.scale(0.20),
      this.k.rotate(0),
    ]);
  }


  private checkFacingDirection() {
    if (this.obj.pos.x > this._opponent!.obj.pos.x) {
      this.setFacingDirection(PlayerDirection.LEFT);
    } else {
      this.setFacingDirection(PlayerDirection.RIGHT);
    }
  }

  public setFacingDirection(direction: PlayerDirection) {
    if (this._facing !== direction) {
      this._facing = direction;
      this.obj.flipX(direction === PlayerDirection.LEFT)
      this.innerObj.flipX(direction === PlayerDirection.LEFT);
    }
  }

  public shoot() {
    if (!this.isBlocking()) { // can't shoot and block at the same time
      const projectileTag = this._mainTag + "_" + C.TAG_PROJECTILE + this._projectileCount;
      this._projectileCount++;
      let projectile = this.k.add([
        this.k.sprite(this._projectileSpriteName, {flipX: this.isFacingLeft()}),
        this.k.z(11),
        this.isFacingRight()
          ? this.k.pos(this.pos().add(40, 42))
          : this.k.pos(this.pos().add(-5, 42)),
        this.k.area(),
        this.k.move(
          0,
          this.isFacingLeft()
            ? -C.DEFAULT_PROJECTILE_SPEED
            : C.DEFAULT_PROJECTILE_SPEED
        ),
        this.k.cleanup(),
        this.k.scale(0.06),
        this.k.origin("center"),
        this._projectileSpriteName === "laser_ball" ? this.rotate() : "",
        C.TAG_PROJECTILE,
        projectileTag,
      ]);

      this.playShotSound();
      //console.log(this._opponent?.getMainTag() + " " + projectileTag);
      this.k.onCollide(projectileTag, this._opponent?.getMainTag() as string, (p: any, o: any) => {
        //console.log("onCollide: ", projectileTag, this._opponent?.getMainTag(), p, o);
        this.k.destroy(p);
        this.k.play("explosion1", { volume: 0.4, speed: 2.0 });
        const damage = this._opponent!.isBlocking()
          ? C.DEFAULT_PROJECTILE_DAMAGE / 10
          : C.DEFAULT_PROJECTILE_DAMAGE;
        o.hurt(damage);
        BCBA.getInstance().updateHealthInfo();
        console.log(p.pos);
        this.addExplosion(p.pos);
        this.k.shake(5);
      });

      // blow up the projectile if it collides with a platform
      this.k.onCollide(projectileTag, C.TAG_PLATFORM, (p: any, o: any) => {
        this.k.destroy(p);
        this.k.play("explosion1", { volume: 0.4, speed: 2.0 });
        this.addExplosion(p.pos);
        this.k.shake(2);
      });

      // blow up the projectile if it collides with another projectile
      this.k.onCollide(C.TAG_PROJECTILE, C.TAG_PROJECTILE, (p: any, o: any) => {
        this.k.destroy(p);
        //this.k.destroy(o);
        this.k.play("explosion1", { volume: 0.4, speed: 2.0 });
        this.addExplosion(p.pos); //TODO known issue - explosion is not centered, triple explosion
        this.k.shake(1);
      });
      

    }
  }

  private rotate(): any {
    let ctx = this.k;
    let facingLeft = this.isFacingLeft();
    return {
      id: "projectile_rotation",
      update() {
        this.angle = ctx.time() * 300 * (facingLeft ? -1 : 1);
        //this.pos.x = this.width / 2;
      },
    };
  }

  public abstract playShotSound(): void;

  public addExplosion(p: Vec2) {
    this.k.add([
      this.k.sprite("explosion"),
      this.k.z(12),
      this.k.scale(0.15),
      this.isFacingRight()
        ? this.k.pos(p.add(5, -15))
        : this.k.pos(p.add(-30, -15)),
      this.k.lifespan(0.5, { fade: 0.5 }),
    ]);
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public setOpponent(other: Player) {
    this._opponent = other;
    //this.checkFacingDirection();
  }

  public move(direction: number | Vec2, speed: number) {
    this.obj.move(direction, speed);
  }

  public isFacingLeft(): boolean {
    return this._facing === PlayerDirection.LEFT;
  }

  public isFacingRight(): boolean {
    return this._facing === PlayerDirection.RIGHT;
  }

  public isGrounded(): boolean {
    return this.obj.isGrounded();
  }

  public isJumping(): boolean {
    return !this.obj.isGrounded();
  }

  public jump(force: number = C.PLAYER_JUMP_FORCE): void {
    this.obj.jump(force);
  }

  public littleJump(): void {
    this.obj.jump(1);
  }

  public isBehind(other: Player): boolean {
    return this.obj.x < other.obj.x;
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

  // public moveRightBy(pixels: number): void {
  //     this.obj.moveBy(pixels, 0);
  // }

  public upright(): void {
    this.obj.angle = 0;
    this.innerObj.angle = 0;
  }

  public onCollide(tag: Tag, f: (obj: GameObj, col?: Collision) => void) {
    this.obj.onCollide(tag, f);
  }

  // public on(event:string, f: () => void) {
  //     this.obj.on(event, f);
  // }

  public onUpdate(f: () => void) {
    this.obj.onUpdate(f);
  }

  public pos(): Vec2 {
    return this.obj.pos;
  }

  public hp(): number {
    return this.obj.hp();
  }

  public abstract startBlocking(): void;

  public isBlocking(): boolean {
    return this._isBlocking;
  }

  public abstract stopBlocking(): void;

}
