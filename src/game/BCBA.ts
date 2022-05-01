import { KaboomCtx } from "kaboom";
// import mergeImages from "./util/mergeImages";


import kaboom from "kaboom";

import * as C from "./constants";
import Player, { PlayerDirection } from "./player/Player";
import MechPlayer from "./player/MechPlayer";
import AssetManager from "./util/AssetManager";
import TitleScene from "./scenes/TitleScene";
import BattleArenaScene from "./scenes/BattleArenaScene";

export default class BCBA {
  private static instance: BCBA | undefined = undefined;

  private DEBUG: boolean;
  protected k: any;
  private _characterChoices: IGameCharacter;
  private _currentScene: string = "stage1";
  private players: MechPlayer[] = new Array<MechPlayer>(C.MAX_PLAYERS);
  private sprites: ISpriteHash = {};

  private isZooming = false;

  private lastPlayer1Health: any = undefined;
  private lastPlayer2Health: any = undefined;

  private haveWinner: boolean = false;

  public static getInstance(): BCBA {
    if (BCBA.instance !== undefined) return BCBA.instance;
    throw new Error("getInstance failed. Run init() first.");
  }

  public player(n: number): Player {
    return this.players[n - 1];
  }

  public setPlayer(n: number, player: MechPlayer): void {
    this.players[n - 1] = player;
  }

  public static init(
    canvasRef: any,
    characterChoices: IGameCharacter,
    debug: boolean = false
  ): BCBA {
    const k = kaboom({
      global: false,
      debug: debug,
      canvas: canvasRef.current,
      width: C.GAME_AREA_WIDTH,
      height: C.GAME_AREA_HEIGHT,
      background: [46, 115, 145], // RGB
      crisp: false,
    });

    AssetManager.setContext(k);

    BCBA.instance = new BCBA(k, characterChoices, debug);
    BCBA.initScenes();

    canvasRef.current.focus();
    //SceneManager.go("title");

    return BCBA.instance as BCBA;
  }

  private constructor(kaboomCtx: KaboomCtx, characterChoices: IGameCharacter, debug: boolean = false) {
    this.DEBUG = debug;
    this.k = kaboomCtx;
    this.loadAssets();
    this._characterChoices = characterChoices;

    // this.initPlayers(characterChoices);
    
    //this.k.play("countdown", { speed: 1 });
    
    // TODO need to be sure sprites have finished loading and merging before calling this
    //this.updateHealthInfo();

    this.initKeyboardEvents();
    //this.initArenaBoundaries();
    this.initCollisions();


    /** CAM CHECK */
    // console.log("player1 pos ", this.player(1).obj.pos);
    // console.log(
    //   "player1 xpos - player2 xpos ",
    //   this.player(1).obj.pos.x -
    //     (this.player(1).obj.pos.x - this.player(2).obj.pos.x) / 2
    // );

    // console.log("dist ", this.player(1).obj.pos.dist(this.player(2).obj.pos));
    // console.log("camScale ", this.k.camScale());
    // console.log("camPos ", this.k.camPos());
    /** end CAM CHECK */


    // this.k.camPos(C.GAME_AREA_WIDTH / 2, C.GAME_AREA_HEIGHT / 2);

    //this.initOpponentAI();
    //this.k.wait(1, () => {
    //this.updateText("FIGHT!", this.k.pos(390,150));
    //});
  }

  public log(message: string) {
    if (this.DEBUG) this.k.debug.log(message);
  }

  private static async initScenes() {
    //SceneManager.init(BCBA.getInstance().k);

    //const titleScene = new TitleScene("title", this.k);
    //titleScene.go();
    const battleScene1 = await new BattleArenaScene("stage1", BCBA.getInstance().k);
    battleScene1.go();

  }

  private loadAssets() {
    AssetManager.loadAll();
  }


  private initKeyboardEvents() {
    this.log("adding keyboard event handlers...");

    this.k.onKeyPress("f", () => {
      this.k.fullscreen(!this.k.isFullscreen());
    });

    this.k.onKeyPress("control", () => {
      this.player(1).shoot();
    });

    this.k.onKeyPress("shift", () => {
      this.player(1).startBlocking();
    });

    this.k.onKeyRelease("shift", () => {
      this.player(1).stopBlocking();
    });

    this.k.onKeyDown("left", () => {
      this.player(1).moveLeft();
    });

    this.k.onKeyRelease(["left", "right"], () => {
      this.player(1).upright();
    });

    this.k.onKeyDown("right", () => {
      this.player(1).moveRight();
    });

    this.k.onKeyPress("space", () => {
      if (this.player(1).isGrounded()) {
        this.player(1).jump();
      } else {
        this.player(1).jump(C.PLAYER_AIR_JUMP_FORCE);
      }
    });
  }

  public initPlayers() {
    console.log("initPlayers");
    //console.log(charChoices);
    this.setPlayer(
      1,
      new MechPlayer(
        this.k,
        "Player 1",
        this._characterChoices.characterNum,
        this._characterChoices.mechColor,
        this._characterChoices.gunName,
        PlayerDirection.RIGHT,
        C.TAG_MAIN_PLAYER,
        [C.TAG_PLAYER],
        300,
        400
      )
    );
    const player2MechColor = this._characterChoices.mechColor === "red" ? "blue" : "red";
    const player2Num = Math.floor(Math.random() * 3) + 1;
    this.setPlayer(
      2,
      new MechPlayer(
        this.k,
        "Player 2",
        player2Num,
        player2MechColor,
        "biggun",
        PlayerDirection.LEFT,
        C.TAG_OPPONENT,
        [C.TAG_PLAYER],
        800, //800
        400,
        true
      )
    );

    this.player(1).setOpponent(this.player(2));
    this.player(2).setOpponent(this.player(1));

    //TODO finish CameraController class and get rid of this section
    this.player(1).obj.onUpdate(() => {
      // if (
      //   this.player(1).obj.pos.y > 80 &&
      //   this.player(2).obj.pos.y > 80 &&
      //   this.player(1).obj.pos.y < C.GAME_AREA_HEIGHT &&
      //   this.player(2).obj.pos.y < C.GAME_AREA_HEIGHT &&
      //   this.player(1).obj.pos.x > 245 &&
      //   this.player(2).obj.pos.x > 245 &&
      //   this.player(1).obj.pos.x < C.GAME_AREA_WIDTH - 145 &&
      //   this.player(2).obj.pos.x < C.GAME_AREA_WIDTH - 145
      // ) {
        const dx =
          this.player(1).obj.pos.x -
          (this.player(1).obj.pos.x - this.player(2).obj.pos.x) / 2;
        const dy =
          this.player(1).obj.pos.y -
          (this.player(1).obj.pos.y - this.player(2).obj.pos.y) / 2;
        // const y = (dy > C.GAME_AREA_HEIGHT/2) ? C.GAME_AREA_HEIGHT/2 : dy;
        // const x = (dx > C.GAME_AREA_WIDTH/2) ? C.GAME_AREA_WIDTH/2 : dx;
        this.k.camPos(dx, dy - 50);
        this.k.camScale((dx / C.GAME_AREA_WIDTH) * 3);
        // this.k.camPos(this.player(1).obj.pos.x-(this.player(1).obj.pos.x - this.player(2).obj.pos.x)/2,
        // this.player(1).obj.pos.y-(this.player(1).obj.pos.y - this.player(2).obj.pos.y)/2);
      // }
      // if (this.player(1).obj.pos.y > C.GAME_AREA_HEIGHT * 2) {
      //   this.k.go("lose");
      // }
    });

    // this.player(2).obj.onUpdate(() => {
    //   if (this.player(2).obj.pos.y > C.GAME_AREA_HEIGHT * 2) {
    //     this.k.go("winner");
    //   }
    // });

  }


  public initCollisions() {
    if (this._currentScene === "title") return;

    // this.player(2).obj.on("death", () => {
    //   this.k.destroy(this.player(2).obj);
    //   this.k.destroy(this.player(2).innerObj);

    //   this.youWin();
    // });
  }

  public youWin() {
    this.isZooming = true;
    this.k.wait(0.3, () => {
      this.isZooming = false;
    });
    this.player(1).onUpdate(() => {
      if (this.isZooming) {
        const cscale = this.k.camScale();
        this.k.camScale(cscale.add(4 * this.k.dt()));
      } else {
        //this.k.camScale(1);
      }
    });

    this.k.play("cheers", { volume: 0.4, speed: 1 });

    this.k.add([
      this.k.pos(300, 200),
      this.k.text("YOU WIN!", {
        size: 128,
      }),
    ]);
    this.k.add([
      this.k.pos(200, 300),
      this.k.text("Reload browser or go back to play again", {
        size: 35,
      }),
    ]);
  }

  public initOpponentAI() {
    this.k.loop(10, () => {
      this.player(2).shoot();
      //if (!this.player(2).isAlive()) return;
      //let choice = Math.floor(Math.random() * 6);
      //this.log("choice: " + choice);
      // switch (choice) {
      //   case 1:
      //     this.player(2).shoot();
      //     break;
      //   case 2:
      //     //this.player(2).startBlocking();
      //     break;
      //   case 3:
      //     //this.player(2).stopBlocking();
      //     break;
      //   case 4:
      //     this.player(2).shoot();
      //     break;
      //   default:
      //     //this.player(2).shoot();
      //     break;
      // }
    });
  }

  public updateHealthInfo() {
    if (this._currentScene === "title") return;
    if (this.lastPlayer1Health !== undefined)
      this.k.destroy(this.lastPlayer1Health);
    if (this.lastPlayer2Health !== undefined)
      this.k.destroy(this.lastPlayer2Health);

    this.lastPlayer1Health = this.k.add([
      this.k.text(this.player(1).name + ": " + this.player(1).hp(), {
        size: 34,
      }),
      this.k.fixed(),
      this.k.pos(30, 15),
    ]);
    this.lastPlayer2Health = this.k.add([
      this.k.text(this.player(2).name + ": " + this.player(2).hp(), {
        size: 34,
      }),
      this.k.fixed(),
      this.k.pos(900, 15),
    ]);
  }

  public setCurrentScene(scene: string) {
    this._currentScene = scene;
  }

  public go(scene: string, args?: any) {
    this.k.go(scene, args);
  }
}
