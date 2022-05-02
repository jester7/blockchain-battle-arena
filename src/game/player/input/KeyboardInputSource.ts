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
      BCBA.getInstance().isPaused() || this._gameInstance.player(this._player).shoot();
    });

    this._ctx.onKeyPress(keys.SHIFT, () => {
      BCBA.getInstance().isPaused() || this._gameInstance.player(this._player).startBlocking();
    });

    this._ctx.onKeyRelease(keys.SHIFT, () => {
      BCBA.getInstance().isPaused() || this._gameInstance.player(this._player).stopBlocking();
    });

    this._ctx.onKeyDown("left", () => {
      BCBA.getInstance().isPaused() || this._gameInstance.player(this._player).moveLeft();
    });

    this._ctx.onKeyRelease(["left", "right"], () => {
      BCBA.getInstance().isPaused() || this._gameInstance.player(this._player).upright();
    });

    this._ctx.onKeyDown("right", () => {
      BCBA.getInstance().isPaused() || this._gameInstance.player(this._player).moveRight();
    });

    this._ctx.onKeyPress("space", () => {
      if (BCBA.getInstance().isPaused()) return;
      if (this._gameInstance.player(this._player).isGrounded()) {
        this._gameInstance.player(this._player).jump();
      } else {
        this._gameInstance.player(this._player).jump(C.PLAYER_AIR_JUMP_FORCE);
      }
    });
  }
}
