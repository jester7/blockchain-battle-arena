import { KaboomCtx } from "kaboom";
import kaboom from "kaboom";
import * as C from "./constants";
import Player, { PlayerDirection } from "./player/Player";
import MechPlayer from "./player/MechPlayer";
import AssetManager from "./util/AssetManager";
import TitleScene from "./scenes/TitleScene";
import BattleArenaScene from "./scenes/BattleArenaScene";
import GameScene from "./scenes/GameScene";
import CameraController from "./util/CameraController";
import MechAIPlayer from "./player/MechAIPlayer";
import KeyboardInputSource from "./player/input/KeyboardInputSource";
import GamePadInputSource from "./player/input/GamePadInputSource";

/**
 * Main Blockchain Battle Arena singleton class, call init() first
 */
export default class BCBA {
  private static instance: BCBA | undefined;

  private DEBUG: boolean;
  private _ctx: any;
  private _characterChoices: IGameCharacter;
  private _scenes: { [name: string]: GameScene } = {};
  private _currentScene: GameScene | undefined;
  private _currentRound: number = 1;
  private players: MechPlayer[] = new Array<MechPlayer>(C.MAX_PLAYERS);
  private _playerName: string;
  private _cameraController: any;

  private isZooming = false;
  private _paused = true;

  private lastPlayer1Health: any = undefined;
  private lastPlayer2Health: any = undefined;

  public static getInstance(): BCBA {
    if (BCBA.instance !== undefined) return BCBA.instance;
    throw new Error("getInstance failed. Run init() first.");
  }

  // helper method to get the game context object
  public getContext(): KaboomCtx {
    return this._ctx;
  }

  // static auxiliary method for getContext()
  public static getInstanceCtx(): KaboomCtx {
    return BCBA.getInstance().getContext();
  }

  public player(n: number): Player { 
    return this.players[n - 1]; // array is zero indexed so subtract 1
  }

  public setPlayer(n: number, player: MechPlayer): void {
    this.players[n - 1] = player;
  }

  /**
   * Run initialization tasks for the game and return
   * the game instance after completion.
   */
  public static init(
    canvasRef: any,
    characterChoices: any,
    debug: boolean = false
  ): BCBA {
    const k = kaboom({
      global: false,
      debug: true,
      canvas: canvasRef.current,
      width: C.GAME_AREA_WIDTH,
      height: C.GAME_AREA_HEIGHT,
      background: C.CANVAS_BG_COLOR,
    });

    AssetManager.setContext(k);

    BCBA.instance = new BCBA(k, characterChoices, name, debug);
    BCBA.initScenes(k);
    
    canvasRef.current.focus();

    new GamePadInputSource(); // testing gamepad support
    
    k.onLoad(async () => {
        BCBA.getInstance().setCurrentScene("title");
    });
    
    return BCBA.instance as BCBA;
  }

  private constructor(
    kaboomCtx: KaboomCtx,
    characterChoices: any,
    debug: boolean = false
  ) {
    this.DEBUG = debug;
    this._ctx = kaboomCtx;
    this.loadAssets();
    this._characterChoices = characterChoices;
    this._playerName = name;

    this.initCollisions();
    this.initKeyboardEvents();
  }

  /**
   * Initialize global keyboard event handlers.
   * Player input is initialized by the player classes themselves.
   */
  private initKeyboardEvents() {
    this._ctx.onKeyPress("f", () => {
      // toggle fullscreen
      this._ctx.fullscreen(!this._ctx.isFullscreen());
    });
  }

  public log(message: string) {
    if (this.DEBUG) this._ctx.debug.log(message);
  }

  private static initScenes(kCtx: KaboomCtx) {
    BCBA.getInstance().addScene(new TitleScene("title", kCtx));
    BCBA.getInstance().addScene(
      new BattleArenaScene("stage1", kCtx)
    );
  }

  private loadAssets() {
    AssetManager.loadAll();
  }

  public initPlayers() {
    console.log("initPlayers");
    this.pause(); // pause input and AI moves until intro sequence is complete
    this.setPlayer(
      1,
      new MechPlayer(
        this._ctx,
        this._playerName,
        this._characterChoices.characterNum,
        this._characterChoices.mechColor,
        this._characterChoices.gunName,
        PlayerDirection.RIGHT,
        C.TAG_MAIN_PLAYER,
        [C.TAG_PLAYER],
        950,
        1620,
        new KeyboardInputSource(this._ctx, 1)
      )
    );
    const player2MechColor =
      this._characterChoices.mechColor === "red" ? "blue" : "red";
    const player2Num = Math.floor(Math.random() * 3) + 1;
    this.setPlayer(
      2,
      new MechAIPlayer(
        this._ctx,
        "Player 2",
        player2Num,
        player2MechColor,
        "biggun",
        PlayerDirection.LEFT,
        C.TAG_OPPONENT,
        [C.TAG_PLAYER],
        1900, //800
        1620
      )
    );

    // const player3MechColor = this._characterChoices.mechColor === "red" ? "blue" : "red";
    // const player3Num = Math.floor(Math.random() * 3) + 1;
    // this.setPlayer(
    //   3,
    //   new MechPlayer(
    //     this._ctx,
    //     "Player 3",
    //     player3Num,
    //     player3MechColor,
    //     "smallgun",
    //     PlayerDirection.LEFT,
    //     C.TAG_OPPONENT,
    //     [C.TAG_PLAYER],
    //     1200, //800
    //     0,
    //     true
    //   )
    // );

    // const player4MechColor = this._characterChoices.mechColor === "red" ? "blue" : "red";
    // const player4Num = Math.floor(Math.random() * 3) + 1;
    // this.setPlayer(
    //   4,
    //   new MechPlayer(
    //     this._ctx,
    //     "Player 4",
    //     player4Num,
    //     player4MechColor,
    //     "smallgun",
    //     PlayerDirection.LEFT,
    //     C.TAG_OPPONENT,
    //     [C.TAG_PLAYER],
    //     1000, //800
    //     0,
    //     true
    //   )
    // );

    this.player(1).setOpponent(this.player(2));
    this.player(2).setOpponent(this.player(1));
    // this.player(3).setOpponent(this.player(1));
    // this.player(4).setOpponent(this.player(1));

    this._cameraController = new CameraController(this._ctx, [
      this.player(1).obj,
      this.player(2).obj, // if more than 2 players, add more here
    ]);

    // this.player(2).obj.onUpdate(() => {
    //   if (this.player(2).obj.pos.y > C.GAME_AREA_HEIGHT * 2) {
    //     this._ctx.go("winner");
    //   }
    // });
  }

  public initCollisions() {
    if (this._currentScene?.name === "title") return;

    // this.player(2).obj.on("death", () => {
    //   this._ctx.destroy(this.player(2).obj);
    //   this._ctx.destroy(this.player(2).innerObj);

    //   this.youWin();
    // });
  }

  public youWin() {
    this.isZooming = true;
    this._ctx.wait(0.3, () => {
      this.isZooming = false;
    });
    this.player(1).onUpdate(() => {
      if (this.isZooming) {
        const cscale = this._ctx.camScale();
        this._ctx.camScale(cscale.add(4 * this._ctx.dt()));
      } else {
        //this._ctx.camScale(1);
      }
    });

    this._ctx.play("cheers", { volume: 0.4, speed: 1 });

    this._ctx.add([
      this._ctx.pos(300, 200),
      this._ctx.text("YOU WIN!", {
        size: 128,
      }),
    ]);
    this._ctx.add([
      this._ctx.pos(200, 300),
      this._ctx.text("Reload browser or go back to play again", {
        size: 35,
      }),
    ]);
  }

  public updateHealthInfo() {
    if (this._currentScene?.name === "title") return;
    if (this.lastPlayer1Health !== undefined)
      this._ctx.destroy(this.lastPlayer1Health);
    if (this.lastPlayer2Health !== undefined)
      this._ctx.destroy(this.lastPlayer2Health);

    if (this.player(1).hp() <= 0) {
      this.player(2).incRoundWinCount();
      if (this.player(2).getRoundWinCount() >= 2) {
        (this._currentScene as BattleArenaScene).showMatchLost();
        return;
      }
      this.resetPlayers();
      (this._currentScene as BattleArenaScene).showRoundLost(this._currentRound);
    }

    if (this.player(2).hp() <= 0) {
      this.player(1).incRoundWinCount();
      if (this.player(1).getRoundWinCount() >= 2) {
        (this._currentScene as BattleArenaScene).showMatchWon();
        return;
      }

      this.resetPlayers();
      (this._currentScene as BattleArenaScene).showRoundWon(this._currentRound);
    }

    this.lastPlayer1Health = this._ctx.add([
      this._ctx.text(this.player(1).name + ": " + this.player(1).hp(), {
        size: 34,
      }),
      this._ctx.fixed(),
      this._ctx.pos(30, 15),
    ]);
    this.lastPlayer2Health = this._ctx.add([
      this._ctx.text(this.player(2).name + ": " + this.player(2).hp(), {
        size: 34,
      }),
      this._ctx.fixed(),
      this._ctx.pos(1600, 15),
    ]);
  }

  public addScene(scene: GameScene) {
    this._scenes[scene.name] = scene;
  }

  public setCurrentScene(sceneName: string, args?: any) {
    this._currentScene = this._scenes[sceneName];
    this._currentScene.go(args);
  }

  public isPaused() {
    return this._paused;
  }

  public pause() {
    this._paused = true;
  }

  public resume() {
    this._paused = false;
  }

  public setRound(round: number) {
    this._currentRound = round;
  }

  public goToNextRound() {
    this._currentRound++;
  }

  private resetPlayers() {
    this.players.forEach(player => {
      player.resetPlayer();
    });
  }
}
