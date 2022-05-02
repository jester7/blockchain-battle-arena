import GameScene from "./GameScene";
import * as C from "../constants";
import BCBA from "../BCBA";

export default class BattleArenaScene extends GameScene {
  protected initScene(args: any): void {
    const {roundNum} = args;
    this.initSprites();
    this.initArenaBoundaries();
    BCBA.getInstance().initPlayers();
    BCBA.getInstance().updateHealthInfo();
    //this.initSubScenes();
    this.startRound(roundNum);
  }

  private startRound(roundNum: number) {
    BCBA.getInstance().pause(); // don't allow movement during round start sequence
    BCBA.getInstance().setRound(roundNum);
    console.log("starting round " + roundNum);
    this._ctx.play("countdown", { speed: 1 });

    this._ctx.add([
      this._ctx.sprite("round" + roundNum),
      this._ctx.scale(0.5),
      this._ctx.origin("center"),
      this._ctx.z(2),
      this._ctx.pos(1500, 1240),
      this._ctx.lifespan(5.5, { fade: 5.5 }),
    ]);

    this._ctx.add([
      this._ctx.sprite("countdown_3"),
      this._ctx.scale(0.33),
      this._ctx.origin("center"),
      this._ctx.z(2),
      this._ctx.pos(1500, 1580),
      this._ctx.lifespan(1),
    ]);

    this._ctx.wait(1, () => {
      this._ctx.add([
        this._ctx.sprite("countdown_2"),
        this._ctx.scale(0.33),
        this._ctx.origin("center"),
        this._ctx.z(2),
        this._ctx.pos(1500, 1580),
        this._ctx.lifespan(1),
      ]);

      this._ctx.wait(1, () => {
        this._ctx.add([
          this._ctx.sprite("countdown_1"),
          this._ctx.scale(0.33),
          this._ctx.origin("center"),
          this._ctx.z(2),
          this._ctx.pos(1500, 1580),
          this._ctx.lifespan(1),
        ]);
        this._ctx.wait(1, () => {
          this._ctx.add([
            this._ctx.sprite("fight"),
            this._ctx.scale(0.75),
            this._ctx.origin("center"),
            this._ctx.z(100),
            this._ctx.pos(1500, 1580),
            this._ctx.lifespan(1, { fade: 1 }),
          ]);
          BCBA.getInstance().resume(); // allow movement after round start sequence
        });
      });
    });
  }

  public showRoundLost(roundNum: number) {
      BCBA.getInstance().pause();
    this._ctx.add([
        this._ctx.sprite("defeat"),
        this._ctx.scale(0.5),
        this._ctx.origin("center"),
        this._ctx.z(2),
        this._ctx.pos(1500, 1340),
        this._ctx.lifespan(3, { fade: 3 }),
      ]);
      this._ctx.wait(3, () => {
        this.startRound(roundNum + 1);
    });
  }

  
  public showRoundWon(roundNum: number) {
    BCBA.getInstance().pause();
  this._ctx.add([
      this._ctx.sprite("victory"),
      this._ctx.scale(0.5),
      this._ctx.origin("center"),
      this._ctx.z(2),
      this._ctx.pos(1500, 1340),
      this._ctx.lifespan(3, { fade: 3 }),
    ]);
    this._ctx.wait(3, () => {
      this.startRound(roundNum + 1);
  });
}


public showMatchLost() {
    BCBA.getInstance().pause();
  this._ctx.add([
      this._ctx.sprite("defeat"),
      this._ctx.scale(1),
      this._ctx.origin("center"),
      this._ctx.z(100),
      this._ctx.pos(1500, 1240),
      this._ctx.lifespan(6, { fade: 6 }),
    ]);
    this._ctx.wait(6, () => {
        BCBA.getInstance().setCurrentScene("title");
    });
}


public showMatchWon() {
  BCBA.getInstance().pause();
  this._ctx.play("cheers", { volume: 0.4, speed: 1 });

this._ctx.add([
    this._ctx.sprite("victory"),
    this._ctx.scale(1),
    this._ctx.origin("center"),
    this._ctx.z(100),
    this._ctx.pos(1500, 1240),
    this._ctx.lifespan(6, { fade: 6 }),
  ]);
  this._ctx.wait(6, () => {
    BCBA.getInstance().setCurrentScene("title");
});
}

  private initSubScenes() {
    this._ctx.scene("lose", () => {
      this._ctx.add([
        this._ctx.sprite("bg1", { scale: 0.5 }),
        this._ctx.pos(0, 0),
      ]);
      this._ctx.add([
        this._ctx.text("You Lost", { size: 150 }),
        this._ctx.pos(30, 30),
      ]);
      this._ctx.add([
        this._ctx.text(
          "Go back in the browser or reload the page to play again",
          {
            size: 35,
          }
        ),
        this._ctx.pos(25, 150),
      ]);
    });

    this._ctx.scene("winner", () => {
      this._ctx.play("cheers", { volume: 0.4, speed: 1 });

      this._ctx.add([
        this._ctx.sprite("bg1", { scale: 0.5 }),
        this._ctx.pos(0, 0),
      ]);
      this._ctx.add([
        this._ctx.text("You Won!", { size: 150 }),
        this._ctx.pos(30, 30),
      ]);
      this._ctx.add([
        this._ctx.text(
          "Go back in the browser or reload the page to play again",
          {
            size: 35,
          }
        ),
        this._ctx.pos(25, 150),
      ]);
    });
  }

  private initArenaBoundaries() {
    const wallLeft = this._ctx.add([
      this._ctx.rect(0, this._ctx.height() * 2),
      this._ctx.pos(0, 0),
      this._ctx.color(0, 255, 0),
      this._ctx.solid(),
      this._ctx.area(),
      C.TAG_ARENA_BOUNDARY,
    ]);

    const wallRight = this._ctx.add([
      this._ctx.rect(0, this._ctx.height() * 2),
      this._ctx.pos(3000, 0),
      this._ctx.color(0, 255, 0),
      this._ctx.solid(),
      this._ctx.area(),
      C.TAG_ARENA_BOUNDARY,
    ]);
    //return [floor, wallLeft, wallRight];
  }

  private addSprite(spriteName: string, scale: number = 1) {
    //this.sprites[spriteName] = this._ctx.add([
    this._ctx.add([this._ctx.sprite(spriteName), this._ctx.scale(scale)]);

    console.log("(added " + spriteName + " sprite)");
  }

  private async initSprites() {
    console.log("adding sprites for BA scene...");

    this._ctx.add([
      this._ctx.sprite("bg1"),
      this._ctx.pos(0, -776),
      this._ctx.scale(1),
    ]);

    this._ctx.add([
      this._ctx.sprite("bg1_arch"),
      //this._ctx.pos(0, 0),
      this._ctx.scale(1),
    ]);

    this._ctx.add([
      this._ctx.sprite("bg1_platform"),
      this._ctx.pos(666, 1840),
      this._ctx.area(),
      this._ctx.solid(),
      this._ctx.scale(1),
      C.TAG_PLATFORM,
    ]);

    this._ctx.add([
      this._ctx.sprite("bg1_platform_small"),
      this._ctx.pos(1012, 800),
      this._ctx.area(),
      this._ctx.solid(),
      this._ctx.scale(1),
      C.TAG_PLATFORM,
    ]);

    //let merged = await mergeImages([sprite_character1_head, sprite_mech_red]);
    //this._ctx.loadSprite("merged_red", merged);
  }
}
