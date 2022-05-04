import MechPlayer from "./MechPlayer";
import * as C from "../constants";
import { GameObj, KaboomCtx } from "kaboom";
import { PlayerDirection } from "./Player";
import NullInputSource from "./input/NullInputSource";
import BCBA from "../BCBA";

export default class MechAIPlayer extends MechPlayer {
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
    startPosY: number
  ) {
    const AIstates = k.state("idle", [
      "idle",
      "move",
      "jump",
      "attack",
      "shield",
    ]);
    super(
      k,
      name,
      spriteNum,
      color,
      gun,
      facing,
      mainTag,
      tags,
      startPosX,
      startPosY,
      new NullInputSource(),
      AIstates
    );
    this.initAI(this.obj);
    this.obj.enterState("idle");
  }

  /**
   * TODO fine tune timings and transitions, move into separate AI class
   * @param obj
   */
  private initAI(obj: GameObj) {
    obj.onStateEnter("idle", async () => {
      await this.k.wait(0.5);
      if (BCBA.getInstance().isPaused()) {
        obj.enterState("idle");
      } else {
        obj.enterState(this.getRandomState());
      }
    });

    obj.onStateEnter("move", async () => {
      await this.k.wait(1);
      obj.enterState(this.getRandomState());
    });

    obj.onStateUpdate("move", async () => {
      if (!this._opponent?.obj.exists()) return;
      if (this._opponent.obj.pos.dist(this.obj.pos) < 100) return;

      const dir = this._opponent.obj.pos.sub(this.obj.pos).unit();
      this.obj.move(dir.scale(C.DEFAULT_PLAYER_SPEED - 200));
      await this.k.wait(1);
    });

    obj.onStateEnter("jump", async () => {
      if (!this._opponent?.obj.exists()) return;
      this.jump();
      obj.enterState("move"); // jump then start moving towards opponent
    });

    obj.onStateEnter("attack", async () => {
      this.shoot();
      await this.k.wait(1); // wait to prevent rapid fire by AI
      obj.enterState(this.getRandomState());
    });

    obj.onStateEnter("shield", async () => {
      //TODO separate shield into activate and release states
      this.startBlocking();
      await this.k.wait(1.5);
      this.stopBlocking();
      obj.enterState(this.getRandomState());
    });
  }

  private getRandomState(): string {
    const states = ["idle", "move", "jump", "attack", "shield"];
    const state = states[Math.floor(Math.random() * states.length)];
    return state;
  }
}
