import GameScene from "./GameScene";

export default class TitleScene extends GameScene {
  protected init(): void {
    this._ctx.scene(this._name, () => {
      console.log("TitleScene.init!!!!");
      this._ctx.add([
        this._ctx.sprite("title-bg"),
        this._ctx.scale(0.5),
        this._ctx.pos(0, 0),
      ]);

      this._ctx.add([
        this._ctx.sprite("logo"),
        this._ctx.scale(0.75),
        this._ctx.origin("center"),
        this._ctx.pos(0, 200),
        this.animate(),
      ]);

      //this._ctx.text("TitleScene");
    });
  }

  private animate(): any {
    let ctx = this._ctx;
    return {
      id: "title-animate",
      update() {
        this.scale = Math.abs(Math.sin(ctx.time()) * 0.05) + 0.75;
        this.pos.x = this.width / 2;
      },
    };
  }
}
