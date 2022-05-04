import { KaboomCtx } from "kaboom";

export default abstract class GameScene {
  protected _name: string;
  protected _ctx: any;

  public get name(): string {
    return this._name;
  }

  /**
   * initScene() is called by the constructor.
   * Classes that extend GameScene should do all scene setup here
   * **/
  protected abstract initScene(args?: any): void;

  constructor(name: string, ctx: KaboomCtx) {
    this._name = name;
    this._ctx = ctx;

    // wrap initScene for subclasses in scene callback
    this._ctx.scene(this._name, (args?: any) => {
      this.initScene(args);
    });
  }

  // call this method to switch to this scene
  public go(args?: any): void {
    console.log("GameScene.go", this._name, args);
    this._ctx.go(this._name, args);
  }
}
