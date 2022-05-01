import GameScene from "./GameScene";
import * as C from "../constants";
import BCBA from "../BCBA";

export default class BattleArenaScene extends GameScene {

  protected init(): void {
    this.initSprites();
    this.initArenaBoundaries();
    BCBA.getInstance().initPlayers();
    this.initSubScenes();
  }

  private initSubScenes() {


    this._ctx.scene("lose", () => {
        this._ctx.add([this._ctx.sprite("bg1", { scale: 0.5 }), this._ctx.pos(0, 0)]);
        this._ctx.add([this._ctx.text("You Lost", { size: 150 }), this._ctx.pos(30, 30)]);
        this._ctx.add([
          this._ctx.text("Go back in the browser or reload the page to play again", {
            size: 35,
          }),
          this._ctx.pos(25, 150),
        ]);
      });
  
      this._ctx.scene("winner", () => {
        this._ctx.play("cheers", { volume: 0.4, speed: 1 });
  
        this._ctx.add([this._ctx.sprite("bg1", { scale: 0.5 }), this._ctx.pos(0, 0)]);
        this._ctx.add([this._ctx.text("You Won!", { size: 150 }), this._ctx.pos(30, 30)]);
        this._ctx.add([
          this._ctx.text("Go back in the browser or reload the page to play again", {
            size: 35,
          }),
          this._ctx.pos(25, 150),
        ]);
      });
  
    
}

  private initArenaBoundaries(){
    
    const wallLeft = this._ctx.add([
      this._ctx.rect(0, this._ctx.height() * 1.5),
      this._ctx.pos(0, 0),
      this._ctx.color(0, 255, 0),
      this._ctx.solid(),
      this._ctx.area(),
      C.TAG_ARENA_BOUNDARY,
    ]);

    const wallRight = this._ctx.add([
      this._ctx.rect(0, this._ctx.height() * 1.5),
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

    this._ctx.add([this._ctx.sprite("bg1"),
        //this._ctx.pos(0, 0),
        this._ctx.scale(0.5),
        
  ]);
  this._ctx.add([this._ctx.sprite("bg1_platform"),
        this._ctx.pos(333, 920),
        this._ctx.area(),
        this._ctx.solid(),
        this._ctx.scale(0.5),
        C.TAG_PLATFORM,
  ]);

  this._ctx.add([this._ctx.sprite("bg1_platform_small"),
  this._ctx.pos(506, 400),
  this._ctx.area(),
  this._ctx.solid(),
  this._ctx.scale(1),
  C.TAG_PLATFORM,
]);

    //let merged = await mergeImages([sprite_character1_head, sprite_mech_red]);
    //this._ctx.loadSprite("merged_red", merged);
  }
}
