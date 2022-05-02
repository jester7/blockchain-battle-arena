import InputSource from "./InputSource";
import { KaboomCtx, Key } from "kaboom";
import * as C from "../../constants";
import BCBA from "../../BCBA";

export const keys = {
  CONTROL: "control" as Key,
  LEFT: "left" as Key,
  RIGHT: "right" as Key,
  UP: "up" as Key,
  DOWN: "down" as Key,
  SHIFT: "shift" as Key,
};

export default class KeyboardInputSource extends InputSource {
  private _gameInstance: BCBA;

  public constructor(private _ctx: KaboomCtx, private _player: number) {
    super();
    this._gameInstance = BCBA.getInstance();
  }

  public initHandlers() {
    this._ctx.onKeyPress(keys.CONTROL, () => {
      this._gameInstance.player(this._player).shoot();
    });

    this._ctx.onKeyPress(keys.SHIFT, () => {
      this._gameInstance.player(this._player).startBlocking();
    });

    this._ctx.onKeyRelease(keys.SHIFT, () => {
      this._gameInstance.player(this._player).stopBlocking();
    });

    this._ctx.onKeyDown("left", () => {
      this._gameInstance.player(this._player).moveLeft();
    });

    this._ctx.onKeyRelease(["left", "right"], () => {
      this._gameInstance.player(this._player).upright();
    });

    this._ctx.onKeyDown("right", () => {
      this._gameInstance.player(this._player).moveRight();
    });

    this._ctx.onKeyPress("space", () => {
      if (this._gameInstance.player(this._player).isGrounded()) {
        this._gameInstance.player(this._player).jump();
      } else {
        this._gameInstance.player(this._player).jump(C.PLAYER_AIR_JUMP_FORCE);
      }
    });
  }
}
