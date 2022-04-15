import { Collision, GameObj, KaboomCtx, Tag, Vec2 } from "kaboom";
import BCBA from "./BCBA";
import * as C from "./constants";

export enum PlayerDirection {
  LEFT,
  RIGHT,
}

export default abstract class Player {
  protected k: KaboomCtx;
  public obj: GameObj;
  private _name: string;
  protected _spriteName: string;
  private _projectileSpriteName: string;
  private _facing: PlayerDirection;
  private _opponent: Player | undefined = undefined;
  private _projectileCount: number = 0;
  protected _isBlocking: boolean = false;

  public constructor(
    k: KaboomCtx,
    playerObj: GameObj,
    name: string,
    spriteName: string,
    projectileSpriteName: string,
    facing: PlayerDirection = PlayerDirection.RIGHT
  ) {
    this.k = k;
    this.obj = playerObj;
    this._name = name;
    this._spriteName = spriteName;
    this._projectileSpriteName = projectileSpriteName;
    this._facing = facing;
    this.onUpdate(() => {
      this.checkFacingDirection();
      //this.k.camPos(this.obj.pos.scale(this.obj.pos.dist(this._opponent?.pos)));
      //if (this.isFacingRight()){this.k.camPos(this.obj.pos.sub(100,0));}
     // if (this.isFacingLeft()){this.k.camPos(this.obj.pos.add(100,0));}

    });
  }

  private checkFacingDirection() {
    if (this.obj.pos.x > this._opponent!.obj.pos.x) {
      this.setFacingDirection(PlayerDirection.LEFT);
    } else {
      this.setFacingDirection(PlayerDirection.RIGHT);
    }
  }

  private setFacingDirection(direction: PlayerDirection) {
    if (this._facing !== direction) {
      this._facing = direction;
      this.obj.flipX(direction === PlayerDirection.LEFT);
    }
  }

  public shoot() {
    if (!this.isBlocking()) { // can't shoot and block at the same time
      const projectileTag = C.TAG_PROJECTILE + this._projectileCount;
      this._projectileCount++;
      let projectile = this.k.add([
        this.k.sprite(this._projectileSpriteName),
        this.isFacingRight()
          ? this.k.pos(this.pos().add(220/2, 180/2))
          : this.k.pos(this.pos().add(-20/2, 180/2)),
        this.k.area(),
        this.k.move(
          0,
          this.isFacingLeft()
            ? -C.DEFAULT_PROJECTILE_SPEED
            : C.DEFAULT_PROJECTILE_SPEED
        ),
        this.k.cleanup(),
        this.k.scale(0.2/2),
        C.TAG_PROJECTILE,
        projectileTag,
      ]);

      this.playShotSound();

      this.k.onCollide(projectileTag, C.TAG_OPPONENT, (p: any, o: any) => {
        this.k.destroy(p);
        this.k.play("explosion1", { volume: 0.4, speed: 2.0 });
        const damage = this._opponent!.isBlocking()
          ? C.DEFAULT_PROJECTILE_DAMAGE / 10
          : C.DEFAULT_PROJECTILE_DAMAGE;
        o.hurt(damage);
        BCBA.getInstance().updateHealthInfo();
        this.addExplosion(p.pos);
        this.k.shake(5);
      });
    }
  }

  public abstract playShotSound(): void;

  public addExplosion(p: Vec2) {
    this.k.add([
      this.k.sprite("explosion"),
      this.k.scale(0.6/2),
      this.isFacingRight()
        ? this.k.pos(p.add(40/2, -60/2))
        : this.k.pos(p.add(-80/2, -60/2)),
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

  public jump(force?: number): void {
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
    this.obj.move(-C.DEFAULT_PLAYER_SPEED, 0);
  }

  public moveRight(): void {
    this.obj.angle = C.PLAYER_TILT_ANGLE;
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
