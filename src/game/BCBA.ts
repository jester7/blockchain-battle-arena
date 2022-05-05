import { GameObj, KaboomCtx } from 'kaboom'
import kaboom from 'kaboom'
import * as C from './constants'
import Player, { PlayerDirection } from './player/Player'
import MechPlayer from './player/MechPlayer'
import AssetManager from './util/AssetManager'
import TitleScene from './scenes/TitleScene'
import BattleArenaScene from './scenes/BattleArenaScene'
import GameScene from './scenes/GameScene'
import CameraController from './util/CameraController'
import MechAIPlayer from './player/MechAIPlayer'
import KeyboardInputSource from './player/input/KeyboardInputSource'
import GamePadInputSource from './player/input/GamePadInputSource'
import { IPlayer } from '../providers/types'
import NullInputSource from './player/input/NullInputSource'

/**
 * Main Blockchain Battle Arena singleton class, call init() first
 */
export default class BCBA {
  private static instance: BCBA | undefined

  private DEBUG: boolean
  private _ctx: any
  private _playerOptions: any
  private _scenes: { [name: string]: GameScene } = {}
  private _currentScene: GameScene | undefined
  private _currentRound: number = 1
  private players: MechPlayer[] = new Array<MechPlayer>(C.MAX_PLAYERS)
  private _cameraController: any

  private isZooming = false
  private _paused = true

  private _pausedObj: GameObj | undefined = undefined

  private lastPlayer1Health: any = undefined
  private lastPlayer2Health: any = undefined

  public static getInstance(): BCBA {
    if (BCBA.instance !== undefined) return BCBA.instance
    throw new Error('getInstance failed. Run init() first.')
  }

  // helper method to get the game context object
  public getContext(): KaboomCtx {
    return this._ctx
  }

  // static auxiliary method for getContext()
  public static getInstanceCtx(): KaboomCtx {
    return BCBA.getInstance().getContext()
  }

  public static terminate(): void {
    if (BCBA.instance === undefined) return;
    this.getInstanceCtx().destroyAll(C.TAG_BG)
    this.getInstanceCtx().destroyAll(C.TAG_PLAYER)
    this.getInstanceCtx().destroyAll(C.TAG_PROJECTILE)
    this.getInstanceCtx().destroyAll(C.TAG_PLATFORM)
  }

  public player(n: number): Player {
    return this.players[n - 1] // array is zero indexed so subtract 1
  }

  public setPlayer(n: number, player: MechPlayer): void {
    this.players[n - 1] = player
  }

  /**
   * Run initialization tasks for the game and return
   * the game instance after completion.
   */
  public static init(
    canvasRef: any,
    player: IPlayer,
    debug: boolean = false
  ): BCBA {
    const k = kaboom({
      global: false,
      debug: true,
      canvas: canvasRef.current,
      width: C.VIEWPORT_WIDTH,
      height: C.VIEWPORT_HEIGHT,
      background: C.CANVAS_BG_COLOR,
    })

    AssetManager.setContext(k)

    BCBA.instance = new BCBA(k, player, debug)
    BCBA.initScenes(k)

    canvasRef.current.focus()

    new GamePadInputSource() // testing gamepad support

    k.onLoad(async () => {
      BCBA.getInstance().setCurrentScene('title')
    })

    return BCBA.instance as BCBA
  }

  private constructor(
    kaboomCtx: KaboomCtx,
    player: IPlayer,
    debug: boolean = false
  ) {
    this.DEBUG = debug
    this._ctx = kaboomCtx
    this.loadAssets()
    this._playerOptions = player
  }

  public log(message: string) {
    if (this.DEBUG) this._ctx.debug.log(message)
  }

  private static initScenes(kCtx: KaboomCtx) {
    BCBA.getInstance().addScene(new TitleScene('title', kCtx))
    BCBA.getInstance().addScene(new BattleArenaScene('stage1', kCtx))
  }

  private loadAssets() {
    AssetManager.loadAll()
  }

  public initPlayers() {
    console.log('initPlayers')
    this.pause() // pause input and AI moves until intro sequence is complete
    this.setPlayer(
      1,
      new MechPlayer(
        this._ctx,
        this._playerOptions.displayName,
        1,
        'red',
        'biggun',
        PlayerDirection.RIGHT,
        C.TAG_MAIN_PLAYER,
        [C.TAG_PLAYER],
        1745,
        2274,
        new KeyboardInputSource(this._ctx, 1)
      )
    )
    const player2MechColor = 'blue'
    //this._characterChoices.mechColor === "red" ? "blue" : "red";
    const player2Num = Math.floor(Math.random() * 3) + 1
    this.setPlayer(
      2,
      new MechAIPlayer(
        this._ctx,
        'Player 2',
        player2Num,
        player2MechColor,
        'biggun',
        PlayerDirection.LEFT,
        C.TAG_OPPONENT,
        [C.TAG_PLAYER],
        3088,
        2274,
      )
    )

    // const player3MechColor = this._characterChoices.mechColor === "red" ? "blue" : "red";
    // const player3Num = Math.floor(Math.random() * 3) + 1;
    // this.setPlayer(
    //   3,
    //   new MechAIPlayer(
    //     this._ctx,
    //     "Player 3",
    //     player3Num,
    //     player3MechColor,
    //     "smallgun",
    //     PlayerDirection.LEFT,
    //     C.TAG_OPPONENT,
    //     [C.TAG_PLAYER],
    //     2788, //800
    //     2274,
    //   )
    // );

    // const player4MechColor = this._characterChoices.mechColor === "red" ? "blue" : "red";
    // const player4Num = Math.floor(Math.random() * 3) + 1;
    // this.setPlayer(
    //   4,
    //   new MechAIPlayer(
    //     this._ctx,
    //     "Player 4",
    //     player4Num,
    //     player4MechColor,
    //     "smallgun",
    //     PlayerDirection.LEFT,
    //     C.TAG_OPPONENT,
    //     [C.TAG_PLAYER],
    //     2500, //800
    //     2274,
    //   )
    // );

    this.player(1).setOpponent(this.player(2))
    this.player(2).setOpponent(this.player(1))
    // this.player(3).setOpponent(this.player(1));
    // this.player(4).setOpponent(this.player(1));

    this._cameraController = new CameraController(
      this._ctx,
      [
        this.player(1).obj,
        this.player(2).obj, // if more than 2 players, add more here
        //this.player(3).obj,
        //this.player(4).obj
      ],
      { x: 100, y: 100 },
      this.DEBUG
    )
  }

  public updateHealthInfo() {
    if (this._currentScene?.name === 'title') return
    if (this.lastPlayer1Health !== undefined)
      this._ctx.destroy(this.lastPlayer1Health)
    if (this.lastPlayer2Health !== undefined)
      this._ctx.destroy(this.lastPlayer2Health)

    if (this.player(1).hp() <= 0) {
      this.player(2).incRoundWinCount()
      if (this.player(2).getRoundWinCount() >= 2) {
        ;(this._currentScene as BattleArenaScene).showMatchLost()
        return
      }
      this.resetPlayers()
      ;(this._currentScene as BattleArenaScene).showRoundLost(
        this._currentRound
      )
    }

    if (this.player(2).hp() <= 0) {
      this.player(1).incRoundWinCount()
      if (this.player(1).getRoundWinCount() >= 2) {
        ;(this._currentScene as BattleArenaScene).showMatchWon()
        return
      }

      this.resetPlayers()
      ;(this._currentScene as BattleArenaScene).showRoundWon(this._currentRound)
    }

    this.lastPlayer1Health = this._ctx.add([
      this._ctx.text(this.player(1).name + ': ' + this.player(1).hp(), {
        size: 34,
      }),
      this._ctx.fixed(),
      this._ctx.pos(30, 15),
    ])
    this.lastPlayer2Health = this._ctx.add([
      this._ctx.text(this.player(2).name + ': ' + this.player(2).hp(), {
        size: 34,
      }),
      this._ctx.fixed(),
      this._ctx.pos(1600, 15),
    ])
  }

  public addScene(scene: GameScene) {
    this._scenes[scene.name] = scene
  }

  public setCurrentScene(sceneName: string, args?: any) {
    this._currentScene = this._scenes[sceneName]
    this._currentScene.go(args)
  }

  public isPaused() {
    return this._paused
  }

  public pause(showPauseScreen: boolean = false) {
    this._paused = true
    //this._ctx.debug.paused = true;
    if (showPauseScreen) {
      this._pausedObj = this._ctx.add([
        this._ctx.text('PAUSED', {
          size: 200,
        }),
        this._ctx.origin('center'),
        this._ctx.fixed(),
        this._ctx.z(200),
        this._ctx.pos(this._ctx.center().x, this._ctx.center().y + 100),
      ])
    }
  }

  public resume() {
    this._paused = false
    //this._ctx.debug.paused = false;
    this._ctx.destroy(this._pausedObj)
    this._pausedObj = undefined
  }

  public setRound(round: number) {
    this._currentRound = round
  }

  public goToNextRound() {
    this._currentRound++
  }

  private resetPlayers() {
    this.players.forEach((player) => {
      player.resetPlayer()
    })
  }
}
