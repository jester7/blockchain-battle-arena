import Player, { PlayerDirection } from "./Player";
import * as C from "../constants";
import { GameObj, KaboomCtx } from "kaboom";

export default class MechPlayer extends Player {
  private _gun: string;

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
    useAI: boolean = false
  ) {
    const mechSprite = "mech-" + color + "-" + gun; // TODO replace all string literals with constants
    const projectileSprite = gun === "smallgun" ? "laser_ball" : "missile";
    const flip = facing === PlayerDirection.LEFT;
    const s = useAI  ? k.state("move", [ "idle", "move", "jump", "attack", "shield"]) : "";
    const obj = k.add([
      k.sprite("mech", { flipX: flip, anim: mechSprite }),
      k.scale(0.2),
      k.pos(startPosX, startPosY),
      k.body(),
      k.area(),
      s,
      k.rotate(0),
      k.health(C.MAX_HEALTH),
      k.z(10),
      mainTag, // tags are used to check collisions and distinguish between own projectiles and opponent's projectiles
      ...tags,
      
    ]);

    super(k, obj, name, spriteNum, mechSprite, projectileSprite, facing, mainTag);

    this._gun = gun;

    this.onCollide(C.TAG_PLAYER, () => {
      k.shake(1);
      k.play("clang", { volume: 0.05, speed: 2 });
    });

    if (useAI) {
      this.initAI(obj);

      console.log(obj);
      obj.enterState("move");
    }
    
  }

  /**
   * TODO fine tune timings and transitions, move into separate AI class
   * @param obj 
   */
  private initAI(obj:GameObj) {
    obj.onStateEnter("idle", async () => {
      await this.k.wait(0.5);
      obj.enterState(this.getRandomState());
    });

    obj.onStateEnter("move", async () => {
      await this.k.wait(1);
      obj.enterState(this.getRandomState());
    });

    obj.onStateUpdate("move", async () => {
      if (!this._opponent?.obj.exists()) return;
      if (this._opponent.obj.pos.dist(this.obj.pos) < 100) return;
        
      const dir = this._opponent.obj.pos.sub(this.obj.pos).unit();
      this.obj.move(dir.scale(C.DEFAULT_PLAYER_SPEED-200));
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

    obj.onStateEnter("shield", async () => { //TODO separate shield into activate and release states
      this.startBlocking();
      await this.k.wait(1.5);
      this.stopBlocking();
      obj.enterState(this.getRandomState());
    });
    
  }

  private getRandomState(): string {
    const states = ["idle", "move", "jump", "attack", "shield"];
    const state = states[Math.floor(Math.random() * states.length)];
    console.log("getRandomState returning " + state);

    return state;
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
