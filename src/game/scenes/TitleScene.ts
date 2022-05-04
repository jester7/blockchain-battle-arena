import BCBA from "../BCBA";
import GameScene from "./GameScene";

export default class TitleScene extends GameScene {
  protected initScene(): void {

    this._ctx.onKeyPress("f", () => {
      // toggle fullscreen
      this._ctx.fullscreen(!this._ctx.isFullscreen());
    });

    this._ctx.add([this._ctx.sprite("title-bg"), this._ctx.scale(1)]);

    this._ctx.add([
      this._ctx.sprite("logo"),
      this._ctx.scale(1),
      this._ctx.origin("center"),
      this._ctx.z(2),
      this._ctx.pos(this._ctx.center().x, 300),
      this.animate(),
    ]);
    this._ctx.add([
        this._ctx.text(
          "Press SPACE to start",
          {
            size: 60,
          }
        ),
        this._ctx.origin("center"),
      this._ctx.z(2),
      this._ctx.pos(this._ctx.center().x, this._ctx.center().y + 100),
    ]);

    this._ctx.add([
      this._ctx.text(
        "Press F to switch to fullscreen",
        {
          size: 60,
        }
      ),
      this._ctx.origin("center"),
    this._ctx.z(2),
    this._ctx.pos(this._ctx.center().x, this._ctx.center().y + 200),
  ]);

  this._ctx.add([
    this._ctx.text(
      "Press the BACK button in your browser to leave the game",
      {
        size: 40,
      }
    ),
    this._ctx.origin("center"),
  this._ctx.z(2),
  this._ctx.pos(this._ctx.center().x, this._ctx.center().y + 300),
]);


    this._ctx.onKeyPress("space", () => {
      BCBA.getInstance().setCurrentScene("stage1", {roundNum:1});
    });
  }

  private animate(): any {
    let ctx = this._ctx;
    return {
      id: "title-animate",
      update() {
        this.scale = Math.abs(Math.sin(ctx.time()) * 0.1) + 0.9;
      },
    };
  }
}
