import { GameObj, KaboomCtx, Vec2 } from "kaboom";

import sprite_mech_red from "./sprites/mech_fighter_red.png";
import sprite_mech_blue from "./sprites/mech_fighter_blue.png";
import sprite_bg from "./sprites/bgarena.jpg";
import sprite_explosion from "./sprites/explosion.png";
import sprite_character1 from "./sprites/character_idea_1.png";
import sprite_character1_head from "./sprites/character_idea_1_head.png";


import sprite_projectile from "./sprites/projectile.png";
import sound_shoot1 from "./sounds/146730__leszek-szary__shoot.wav";
import sound_clang from "./sounds/351372__wilhellboy__lightringingclang.mp3";
import sound_explosion1 from "./sounds/136765__mitchelk__explode001.wav";
import sound_countdown from "./sounds/472853__nakamurasensei__countdown-to-fight.wav";
import sound_cheers from "./sounds/575563__keerotic__cheers.wav";

import kaboom from "kaboom";

import * as C from "./constants";

interface ISpriteHash {
  [name: string]: string;
}

export default class BCBA {
  private static instance: BCBA | undefined = undefined;

  private DEBUG: boolean;
  private k: any;
  private player: GameObj[] = new Array<GameObj>(C.MAX_PLAYERS + 1);
  private sprites: ISpriteHash = {};
  //private projectiles: GameObj[] = [];
  private projectileCount: number = 1;

  private isZooming = false;
  private lastShootTime: number = 0;

  private lastPlayer1Health: any = undefined;
  private lastPlayer2Health: any = undefined;


  private haveWinner: boolean = false;

  public static getInstance(): BCBA {
    if (BCBA.instance !== undefined) return BCBA.instance;
    throw new Error("getInstance failed. Run init() first.");
  }

  public static init(canvasRef: any, debug: boolean = false): BCBA {
    const k = kaboom({
      global: false,
      debug: debug,
      canvas: canvasRef.current,
      width: C.GAME_AREA_WIDTH,
      height: C.GAME_AREA_HEIGHT,
    });

    BCBA.instance = new BCBA(k, debug);
    k.focus();
    return BCBA.instance as BCBA;
  }

  private constructor(kaboomCtx: KaboomCtx, debug: boolean = false) {
    this.DEBUG = debug;
    this.k = kaboomCtx;
    this.loadSprites();
    this.loadSoundFX();
    this.initSprites();
    this.k.play("countdown", { speed: 1 });
    this.initPlayers();
    this.updateHealthInfo();

    this.initKeyboardEvents();
    this.initArenaBoundaries();
    this.initCollisions();
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
    this.k.loadSprite("mech_fighter_red", sprite_mech_red);
    this.k.loadSprite("mech_fighter_blue", sprite_mech_blue);
    this.k.loadSprite("projectile", sprite_projectile);
    this.k.loadSprite("explosion", sprite_explosion);
    this.k.loadSprite("character1", sprite_character1);
    this.k.loadSprite("character1_head", sprite_character1_head);
  }

  private loadSoundFX() {
    this.k.loadSound("shoot1", sound_shoot1);
    this.k.loadSound("clang", sound_clang);
    this.k.loadSound("explosion1", sound_explosion1);
    this.k.loadSound("countdown", sound_countdown);
    this.k.loadSound("cheers", sound_cheers);
  }

  private initKeyboardEvents() {
    this.log("adding keyboard event handlers...");

    this.k.onKeyPress("f", () => {
      this.k.fullscreen(!this.k.isFullscreen());
    });

    this.k.onKeyPress("control", () => {

      this.shootProjectile(1, "hello");
    });

    this.k.onKeyDown("left", () => {
      this.player[1].move(-C.DEFAULT_PLAYER_SPEED, 0);
      this.player[1].angle = -C.PLAYER_TILT_ANGLE;
    });

    this.k.onKeyRelease(["left", "right"], () => {
      this.player[1].angle = 0;
    });

    // this.player[2].onUpdate(() => { //spin
    //     this.player[2].angle = 1200 * this.k.dt();
    // });

    this.k.onKeyDown("right", () => {
      this.player[1].move(C.DEFAULT_PLAYER_SPEED, 0);
      this.player[1].angle = C.PLAYER_TILT_ANGLE;
    });

    this.k.onKeyPress("space", () => {
      if (this.player[1].isGrounded()) {
        this.player[1].jump();
      }
    });

    this.player[1].onGround(() => {
      //this.k.debug.log("landed!");
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
    let merged = await this.mergeImg([sprite_character1_head, sprite_mech_red]);
    this.k.loadSprite("merged_red", merged);
  }

  private initPlayers() {
    this.player[1] = this.k.add([
      this.k.sprite("merged_red", { flipX: false }),
      this.k.scale(0.4),
      this.k.pos(350, 20),
      this.k.body(),
      this.k.area(),
      this.k.rotate(0),
      this.k.health(C.MAX_HEALTH),
      C.TAG_PLAYER,
      C.TAG_MAIN_PLAYER,
    ]);

    this.player[2] = this.k.add([
      this.k.sprite("mech_fighter_blue", { flipX: true }),
      this.k.scale(0.4),
      this.k.pos(750, 20),
      this.k.body(),
      this.k.area(),
      this.k.health(C.MAX_HEALTH),
      C.TAG_PLAYER,
      C.TAG_OPPONENT,
      this.k.state("idle", ["idle", "attack", "move"]),
    ]);

    this.player[1].onCollide(C.TAG_PLAYER, () => {
      this.k.shake(1);
      this.k.play("clang", { volume: 0.1, speed: 1 });
      // this.isZooming = true;
      // this.k.wait(0.1, ()=>{this.isZooming = false;
      // });
      // this.player[1].onUpdate(()=>{
      //   if (this.isZooming) {const cscale = this.k.camScale();
      //   this.k.camScale(cscale.add(this.k.dt()));} else {
      //     this.k.camScale(1);
      //   }
      // });
    });

    this.player[2].onCollide(C.TAG_PLAYER, () => {
      this.k.shake(1);
      this.k.play("clang", { volume: 0.1, speed: 1 });
    });

    // this.player[1].onCollide(C.TAG_ARENA_BOUNDARY, () => {
    //   this.k.shake(1);
    // });

    // this.player[2].onCollide(C.TAG_ARENA_BOUNDARY, () => {
    //   this.k.shake(1);
    // });
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
    this.player[2].on("death", () => {
      this.k.destroy(this.player[2]);
      this.youWin();
    })

  }

  public youWin() {
    // this.player[1].onUpdate(() => { //spin
    //     this.player[1].angle += 120 * this.k.dt();
    // });

    this.isZooming = true;
    this.k.wait(0.3, () => {
      this.isZooming = false;
    });
    this.player[1].onUpdate(() => {
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
      })]);
  }

  public initOpponentAI() {
    // this.player[2].onStateEnter("idle", async () => {
    //   await wait(0.2);
    //   this.player[2].enterState("attack");
    // })
    // // When we enter "attack" state, we fire a bullet, and enter "move" state after 1 sec
    // this.player[2].onStateEnter("attack", async () => {
    //   // Don't do anything if player doesn't exist anymore
    //   if (this.player[1].exists()) {
    //     const dir = this.player[1].pos.sub(this.player[2].pos).unit();
    //     add([
    //       pos(this.player[2].pos),
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
    //   this.player[2].enterState("move")
    // })
    // this.player[2].onStateEnter("move", async () => {
    //   await wait(2)
    //   this.player[2].enterState("idle")
    // })
  }

  public shootProjectile(playerNum: number, sprite: string) {
    const projectileTag = C.TAG_PROJECTILE + this.projectileCount;
    this.projectileCount++;
    let projectile = this.k.add([
      this.k.sprite("projectile"),
      this.k.pos(this.player[1].pos.add(170, 200)),
      this.k.area(),
      this.k.move(0, C.DEFAULT_PROJECTILE_SPEED),
      this.k.cleanup(),
      C.TAG_PROJECTILE,
      projectileTag,
    ]);
    this.k.play("shoot1", {
      volume: 0.3,
    });

    this.k.onCollide(projectileTag, C.TAG_OPPONENT, (p: any, o: any) => {
      this.k.destroy(p);
      this.k.play("explosion1", { volume: 0.4, speed: 2.0 });

      o.hurt(C.DEFAULT_PROJECTILE_DAMAGE);
      this.updateHealthInfo();
      this.addExplosion(p.pos);
      this.k.shake(5);
    });
  }

  public addExplosion(p: Vec2) {
    this.k.add([
      this.k.sprite("explosion"),
      this.k.scale(0.6),
      this.k.pos(p.add(85, -70)),
      this.k.lifespan(0.5, { fade: 0.5 }),
    ]);
  }

  public updateHealthInfo() {
    if (this.lastPlayer1Health !== undefined) this.k.destroy(this.lastPlayer1Health);
    if (this.lastPlayer2Health !== undefined) this.k.destroy(this.lastPlayer2Health);

    this.lastPlayer1Health = this.k.add([this.k.text("you: " + this.player[1].hp(), { size: 34 }), this.k.pos(30, 15)]);
    this.lastPlayer2Health = this.k.add([this.k.text("opponent: " + this.player[2].hp(), { size: 34 }), this.k.pos(900, 15)]);

  }

  public mergeImg(urls: string[]) {
    let promises = new Array<Promise<any>>();
    for (let url of urls) {
      const img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous";
      promises.push(
        new Promise((resolve, reject) => {
          img.onload = () => {
            resolve(img);
          };
          img.onerror = () => {
            reject(`failed to load ${url}`);
          };
        })
      );
    }
    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then((images) => {
          const canvas = document.createElement("canvas");
          const width = images[1].width; // use dimensions of mech suit for final composite image
          const height = images[1].height;
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            images.forEach((img, i) => {
              if (i === 0) {
                ctx.drawImage(img, 38, 40); // shift the base NFT image slightly to fit in transparent area
              } else {
                ctx.drawImage(img, 0, 0);
              }

            });
            resolve(ctx.getImageData(0, 0, width, height));
          } else {
            reject();
          }
        })
        .catch((error) => reject(error));
    });
  }

}
