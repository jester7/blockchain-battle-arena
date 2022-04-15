import { GameObj, KaboomCtx, Vec2 } from "kaboom";
import mergeImages from "./util/mergeImages";

// import sprite_mech_red from "./sprites/mech_fighter_red.png";
// import sprite_mech_blue from "./sprites/mech_fighter_blue.png";
import sprite_bg from "./sprites/bgarena.jpg";
import sprite_explosion from "./sprites/explosion.png";
import sprite_character1 from "./sprites/character_idea_1.png";
import sprite_character1_head from "./sprites/character_idea_1_head.png";

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

  public static init(canvasRef: any, debug: boolean = false): BCBA {
    const k = kaboom({
      global: false,
      debug: debug,
      canvas: canvasRef.current,
      width: C.GAME_AREA_WIDTH,
      height: C.GAME_AREA_HEIGHT,
      background: [ 11, 11, 11, ],
    });

    BCBA.instance = new BCBA(k, debug);
    canvasRef.current.focus();
    
    return BCBA.instance as BCBA;
  }

  private constructor(kaboomCtx: KaboomCtx, debug: boolean = false) {
    this.DEBUG = debug;
    this.k = kaboomCtx;
    this.loadSprites();
    this.loadSoundFX();
    this.initSprites();
    this.k.play("countdown", { speed: 1 });
    this.initPlayers(); // TODO need to be sure sprites have finished loading and merging before calling this
    this.updateHealthInfo();

    this.initKeyboardEvents();
    this.initArenaBoundaries();
    this.initCollisions();
    this.initOpponentAI();
    //this.k.wait(1, () => {
    //this.updateText("FIGHT!", this.k.pos(390,150));
    //});
  }

  private log(message: string) {
    if (this.DEBUG) this.k.debug.log(message);
  }

  private loadSprites() {
    this.log("loading sprites...");
    this.k.loadSprite("bg1", sprite_bg);
    LoadMechSpriteSheet(this.k);
    // this.k.loadSprite("mech_fighter_red", sprite_mech_red);
    // this.k.loadSprite("mech_fighter_blue", sprite_mech_blue);
    this.k.loadSprite("missile", sprite_missile);
    this.k.loadSprite("laser_ball", sprite_laser_ball);

    this.k.loadSprite("explosion", sprite_explosion);
    this.k.loadSprite("character1", sprite_character1);
    this.k.loadSprite("character1_head", sprite_character1_head);
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
        this.player(1).jump(1100);
      } else {
        this.player(1).jump(175);
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

    this.addSprite("bg1");
    //let merged = await mergeImages([sprite_character1_head, sprite_mech_red]);
    //this.k.loadSprite("merged_red", merged);
  }

  private initPlayers() {
    this.setPlayer(
      1,
      new MechPlayer(
        this.k,
        "player 1",
        "blue",
        "smallgun",
        PlayerDirection.RIGHT,
        [C.TAG_PLAYER, C.TAG_MAIN_PLAYER],
        100,
        0
      )
    );
    this.setPlayer(
      2,
      new MechPlayer(
        this.k,
        "player 2",
        "blue",
        "smallgun",
        PlayerDirection.LEFT,
        [C.TAG_PLAYER, C.TAG_OPPONENT],
        500,//800
        0
      )
    );

    this.player(1).setOpponent(this.player(2));
    this.player(2).setOpponent(this.player(1));
  }

  private initArenaBoundaries() {
    const floor = this.k.add([
      this.k.rect(this.k.width(), 0),
      this.k.pos(0, 710),
      this.k.color(0, 255, 0),
      this.k.solid(),
      this.k.area(),
      C.TAG_FLOOR,
    ]);

    const wallLeft = this.k.add([
      this.k.rect(0, this.k.height()),
      this.k.pos(18, 0),
      this.k.color(0, 255, 0),
      this.k.solid(),
      this.k.area(),
      C.TAG_ARENA_BOUNDARY,
    ]);

    const wallRight = this.k.add([
      this.k.rect(0, this.k.height()),
      this.k.pos(this.k.width() - 10, 0),
      this.k.color(0, 255, 0),
      this.k.solid(),
      this.k.area(),
      C.TAG_ARENA_BOUNDARY,
    ]);
  }

  public initCollisions() {
    this.player(2).obj.on("death", () => {
      this.k.destroy(this.player(2).obj);
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
        this.k.camScale(cscale.add(2 * this.k.dt()));
      } else {
        //this.k.camScale(1);
      }
    });

    this.k.play("cheers", { volume: 0.4, speed: 1 });

    this.k.add([
      this.k.pos(300, 200),
      this.k.text("YOU WIN!", {
        font: "apl386o",
        size: 128,
      }),
    ]);
  }

  public initOpponentAI() {
    this.k.loop(3, () => {
      //if (!this.player(2).isAlive()) return;
      let choice = Math.floor(Math.random() * 6);;
      this.log("choice: " + choice);
      switch (choice) {
        case 1:
         this.player(2).shoot();
          break;
        case 2:
          this.player(2).startBlocking();
          break;
        case 3:
          this.player(2).stopBlocking();
          break;
        case 4:
          this.player(2).jump();
          break;
        default:
          this.player(2).jump();
          break;
      }});

    // this.player(2).onStateEnter("idle", async () => {
    //   await wait(0.2);
    //   this.player(2).enterState("attack");
    // })
    // // When we enter "attack" state, we fire a bullet, and enter "move" state after 1 sec
    // this.player(2).onStateEnter("attack", async () => {
    //   // Don't do anything if player doesn't exist anymore
    //   if (this.player(1).exists()) {
    //     const dir = this.player(1).pos.sub(this.player(2).pos).unit();
    //     add([
    //       pos(this.player(2).pos),
    //       move(dir, C.DEFAULT_PROJECTILE_SPEED),
    //       rect(12, 12),
    //       area(),
    //       cleanup(),
    //       origin("center"),
    //       color(BLUE),
    //       "bullet",
    //     ])
    //   }
    //   await wait(1);
    //   this.player(2).enterState("move")
    // })
    // this.player(2).onStateEnter("move", async () => {
    //   await wait(2)
    //   this.player(2).enterState("idle")
    // })
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
      this.k.pos(30, 15),
    ]);
    this.lastPlayer2Health = this.k.add([
      this.k.text(this.player(2).name + ": " + this.player(2).hp(), {
        size: 34,
      }),
      this.k.pos(900, 15),
    ]);
  }
}
