import { KaboomCtx } from "kaboom";
import BCBA from "../BCBA";


export default abstract class GameScene {
    protected _name: string;
    protected _ctx: any;

    public get name(): string {
        return this._name;
    }

    constructor(name: string, ctx: KaboomCtx) { 
        this._name = name;
        this._ctx = ctx;
        this.init();
    }

    // onEnter , onExit methods? 
    // then() method? or next(), some kind of chaining mechanism


    /**
     * called by the constructor
     * classes that extend GameScene should do all scene setup here
     * **/
    protected abstract init(): void;

    // call this method to switch to this scene
    public go(args?: any): void {
        console.log("GameScene.go", this._name, args);
        BCBA.getInstance().setCurrentScene(this._name);
        this._ctx.go(this._name, args);
    }
}