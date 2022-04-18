import { KaboomCtx } from "kaboom";
// import mergeImages from "./util/mergeImages";

import sprite_bg from "./sprites/background.jpg";
import sprite_explosion from "./sprites/explosion.png";
import sprite_character1 from "./sprites/character_idea_1.png";
import sprite_char1 from "./sprites/char1-small.png";
import sprite_char2 from "./sprites/char2-small.png";
import sprite_char3 from "./sprites/char3-small.png";

import sprite_missile from "./sprites/missile.png";
import sprite_laser_ball from "./sprites/laser-ball.png";

import sound_shot from "./sounds/146730__leszek-szary__shoot.wav";
import sound_laser from "./sounds/151022__bubaproducer__laser-shot-silenced.wav";
import sound_clang from "./sounds/351372__wilhellboy__lightringingclang.mp3";
import sound_explosion1 from "./sounds/136765__mitchelk__explode001.wav";
import sound_countdown from "./sounds/472853__nakamurasensei__countdown-to-fight.wav";
import sound_cheers from "./sounds/575563__keerotic__cheers.wav";
import sound_shield from "./sounds/425412__kurlyjoe__wub-2.wav";

import kaboom from "kaboom";

import * as C from "./constants";
import Player, { PlayerDirection } from "./Player";
import MechPlayer from "./MechPlayer";
import LoadMechSpriteSheet from "./LoadMechSpriteSheet";
import { GameCharacter } from "./Game";

interface ISpriteHash {
  [name: string]: string;
}

export default class BCBA {
  private static instance: BCBA | undefined = undefined;

  private DEBUG: boolean;
  private k: any;
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
    characterChoices: GameCharacter,
    debug: boolean = false
  ): BCBA {
    const k = kaboom({
      global: false,
      debug: debug,
      canvas: canvasRef.current,
      width: C.GAME_AREA_WIDTH,
      height: C.GAME_AREA_HEIGHT,
      background: [46, 115, 145],
    });

    BCBA.instance = new BCBA(k, characterChoices, debug);
    canvasRef.current.focus();

    return BCBA.instance as BCBA;
  }

  private constructor(
    kaboomCtx: KaboomCtx,
    characterChoices: GameCharacter,
    debug: boolean = false
  ) {
    this.DEBUG = debug;
    this.k = kaboomCtx;
    this.loadSprites();
    this.loadSoundFX();
    this.initSprites();
    this.initScenes();
    this.initPlayers(characterChoices);
    this.k.play("countdown", { speed: 1 });
    // TODO need to be sure sprites have finished loading and merging before calling this
    this.updateHealthInfo();

    this.initKeyboardEvents();
    this.initArenaBoundaries();
    this.initCollisions();

    console.log("player1 pos ", this.player(1).obj.pos);
    console.log(
      "player1 xpos - player2 xpos ",
      this.player(1).obj.pos.x -
        (this.player(1).obj.pos.x - this.player(2).obj.pos.x) / 2
    );

    console.log("dist ", this.player(1).obj.pos.dist(this.player(2).obj.pos));
    console.log("camScale ", this.k.camScale());
    console.log("camPos ", this.k.camPos());

    // this.k.camPos(C.GAME_AREA_WIDTH / 2, C.GAME_AREA_HEIGHT / 2);

    this.initOpponentAI();
    //this.k.wait(1, () => {
    //this.updateText("FIGHT!", this.k.pos(390,150));
    //});
  }

  public log(message: string) {
    if (this.DEBUG) this.k.debug.log(message);
  }

  private initScenes() {
    this.k.scene("lose", () => {
      this.k.add([this.k.sprite("bg1", { scale: 0.5 }), this.k.pos(0, 0)]);
      this.k.add([this.k.text("You Lost", { size: 150 }), this.k.pos(30, 30)]);
      this.k.add([
        this.k.text("Go back in the browser or reload the page to play again", {
          size: 35,
        }),
        this.k.pos(25, 150),
      ]);
    });

    this.k.scene("winner", () => {
      this.k.play("cheers", { volume: 0.4, speed: 1 });

      this.k.add([this.k.sprite("bg1", { scale: 0.5 }), this.k.pos(0, 0)]);
      this.k.add([this.k.text("You Won!", { size: 150 }), this.k.pos(30, 30)]);
      this.k.add([
        this.k.text("Go back in the browser or reload the page to play again", {
          size: 35,
        }),
        this.k.pos(25, 150),
      ]);
    });
  }

  private loadSprites() {
    this.log("loading sprites...");
    this.k.loadSprite("bg1", sprite_bg);
    LoadMechSpriteSheet(this.k);
    this.k.loadSprite("char1", sprite_char1);
    this.k.loadSprite("char2", sprite_char2);
    this.k.loadSprite("char3", sprite_char3);

    // this.k.loadSprite("mech_fighter_red", sprite_mech_red);
    // this.k.loadSprite("mech_fighter_blue", sprite_mech_blue);
    this.k.loadSprite("missile", sprite_missile);
    this.k.loadSprite("laser_ball", sprite_laser_ball);

    this.k.loadSprite("explosion", sprite_explosion);
    this.k.loadSprite("character1", sprite_character1);
  }

  private loadSoundFX() {
    this.k.loadSound("shoot1", sound_shot);
    this.k.loadSound("shoot2", sound_laser);

    this.k.loadSound("clang", sound_clang);
    this.k.loadSound("explosion1", sound_explosion1);
    this.k.loadSound("countdown", sound_countdown);
    this.k.loadSound("cheers", sound_cheers);
    this.k.loadSound("shield", sound_shield);
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

  private addSprite(spriteName: string, scale: number = 1) {
    this.sprites[spriteName] = this.k.add([
      this.k.sprite(spriteName),
      this.k.scale(scale),
    ]);

    this.log("(added " + spriteName + " sprite)");
  }

  private async initSprites() {
    this.log("adding sprites to game context...");

    this.addSprite("bg1", 0.5);
    //let merged = await mergeImages([sprite_character1_head, sprite_mech_red]);
    //this.k.loadSprite("merged_red", merged);
  }

  private initPlayers(charChoices: GameCharacter) {
    console.log("initPlayers");
    console.log(charChoices);
    this.setPlayer(
      1,
      new MechPlayer(
        this.k,
        "Player 1",
        charChoices.characterNum,
        charChoices.mechColor,
        charChoices.gunName,
        PlayerDirection.RIGHT,
        C.TAG_MAIN_PLAYER,
        [C.TAG_PLAYER],
        300,
        400
      )
    );
    const player2MechColor = charChoices.mechColor === "red" ? "blue" : "red";
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

    this.player(1).obj.onUpdate(() => {
      if (
        this.player(1).obj.pos.y > 80 &&
        this.player(2).obj.pos.y > 80 &&
        this.player(1).obj.pos.y < C.GAME_AREA_HEIGHT &&
        this.player(2).obj.pos.y < C.GAME_AREA_HEIGHT &&
        this.player(1).obj.pos.x > 245 &&
        this.player(2).obj.pos.x > 245 &&
        this.player(1).obj.pos.x < C.GAME_AREA_WIDTH - 145 &&
        this.player(2).obj.pos.x < C.GAME_AREA_WIDTH - 145
      ) {
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
      }
      if (this.player(1).obj.pos.y > C.GAME_AREA_HEIGHT * 2) {
        this.k.go("lose");
      }
    });

    this.player(2).obj.onUpdate(() => {
      if (this.player(2).obj.pos.y > C.GAME_AREA_HEIGHT * 2) {
        this.k.go("winner");
      }
    });

    //this.player(2).setFacingDirection(PlayerDirection.RIGHT);
  }

  private initArenaBoundaries() {
    const floor = this.k.add([
      this.k.rect(1682 / 2, 0),
      this.k.pos(452 / 2, 1122 / 2),
      this.k.color(0, 255, 0),
      this.k.solid(),
      this.k.area(),
      C.TAG_FLOOR,
    ]);

    const wallLeft = this.k.add([
      this.k.rect(0, this.k.height() * 1.5),
      this.k.pos(0, 0),
      this.k.color(0, 255, 0),
      this.k.solid(),
      this.k.area(),
      C.TAG_ARENA_BOUNDARY,
    ]);

    const wallRight = this.k.add([
      this.k.rect(0, this.k.height() * 1.5),
      this.k.pos(2560 / 2, 0),
      this.k.color(0, 255, 0),
      this.k.solid(),
      this.k.area(),
      C.TAG_ARENA_BOUNDARY,
    ]);
  }

  public initCollisions() {
    this.player(2).obj.on("death", () => {
      this.k.destroy(this.player(2).obj);
      this.k.destroy(this.player(2).innerObj);

      this.youWin();
    });
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
}
