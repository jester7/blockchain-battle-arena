import { Collision, GameObj, KaboomCtx, Tag, Vec2 } from "kaboom";
import * as C from "../constants";
import InputSource from "./input/InputSource";

export enum PlayerDirection {
  LEFT,
  RIGHT,
}

export default abstract class Player {
  protected k: KaboomCtx;
  public obj: GameObj;

  protected _name: string;
  protected _spriteName: string;
  protected _facing: PlayerDirection;
  protected _opponent: Player | undefined = undefined;
  protected _isBlocking: boolean = false;
  protected _mainTag: string;

  public constructor(
    k: KaboomCtx,
    playerObj: GameObj,
    name: string,
    spriteName: string,
    facing: PlayerDirection = PlayerDirection.RIGHT,
    mainTag: string,
    inputSource: InputSource
  ) {
    this.k = k;
    this.obj = playerObj;
    this._name = name;
    this._spriteName = spriteName;

    this._facing = facing;
    this._mainTag = mainTag;
    inputSource.initHandlers();
    
    this.onUpdate(() => {
      this.checkFacingDirection();
    });
  }

  public getMainTag(): string {
    return this._mainTag;
  }

  private checkFacingDirection() {
    if (this.obj.pos.x > this._opponent!.obj.pos.x) {
      this.setFacingDirection(PlayerDirection.LEFT);
    } else {
      this.setFacingDirection(PlayerDirection.RIGHT);
    }
  }

  public abstract setFacingDirection(direction: PlayerDirection): void;

  public abstract shoot(): void;

  public abstract playShotSound(): void;

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

  public jump(force: number = C.PLAYER_JUMP_FORCE): void {
    this.obj.jump(force);
  }

  public littleJump(): void {
    this.obj.jump(1);
  }

  public isBehind(other: Player): boolean {
    return this.obj.x < other.obj.x;
  }

  public abstract moveLeft(): void;
  public abstract moveRight(): void;
  public abstract moveTo(dest: Vec2, speed?: number): void;
  public abstract upright(): void;

  public onCollide(tag: Tag, f: (obj: GameObj, col?: Collision) => void) {
    this.obj.onCollide(tag, f);
  }

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
