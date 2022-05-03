import { GameObj, KaboomCtx, Vec2 } from "kaboom";
import BCBA from "../BCBA";
import * as C from "../constants";

export interface IObjectPos {
    x: number;
    y: number;
}

export default class CameraController {

    constructor(private _ctx: any, private _trackObjects: Array<GameObj>) {
        this._trackObjects[0].onUpdate(() => {
            this.update();
        });
    }

    public update() {
        const minMax = this.getMinMaxX();

        const deltaX = minMax.max.x - minMax.min.x;
        const deltaY = minMax.max.y - minMax.min.y;
        let scaleX = (C.GAME_AREA_WIDTH / deltaX) * .1;
        //let scaleY = (C.GAME_AREA_HEIGHT / deltaY) * .1;
        let scale = scaleX;
        //scale = (scaleX < scaleY ? scaleY : scaleX);
        if (scale < 0.75) scale = 0.75;
        //console.log("deltax", deltaX);
        //this._ctx.camPos(deltaX/2 + C.GAME_AREA_WIDTH/2, -deltaY+C.GAME_AREA_HEIGHT);
        let pos = this._trackObjects[0].pos; //  this._trackObjects[0].pos.lerp(this._trackObjects[1].pos,0.5);
        let y = (pos.y > (C.GAME_AREA_HEIGHT - 100) ? C.GAME_AREA_HEIGHT - 100 : pos.y);
        let x = (pos.x > (C.GAME_AREA_WIDTH - 300) ? C.GAME_AREA_WIDTH - 300 : pos.x);
        //console.log(this._trackObjects[0].pos.y);
        this._ctx.camPos(this._ctx.vec2(x - deltaX/2 +800, y - deltaY/2+1000));
        this._ctx.camScale(1);
    }

    private camPos(): Vec2 {
        return this._ctx.camera.pos;
    }

    private getMinMaxX(): {min: IObjectPos, max: IObjectPos} {
        let mins: IObjectPos = {x:1500, y:800};
        let maxs: IObjectPos = {x:0, y:0};
       
        this._trackObjects.forEach(obj => {

            if (obj.pos.y > 3000) {
                obj.setHP(0);
                BCBA.getInstance().updateHealthInfo();
                return;
            }

            if (obj.pos.x < mins.x) {
                mins.x = obj.pos.x;
            }

            if (obj.pos.y < mins.y) {
                mins.y = obj.pos.y;
            }

            if (obj.pos.x > maxs.x) {
                maxs.x = obj.pos.x;
            }

            if (obj.pos.y > maxs.y) {
                maxs.y = obj.pos.y;
            }
        });
        //console.log("mins: ", mins, " maxs: ", maxs);

        return {min: mins, max: maxs};
    }

    
}


    /** CAM CHECK */
    // console.log("player1 pos ", this.player(1).obj.pos);
    // console.log(
    //   "player1 xpos - player2 xpos ",
    //   this.player(1).obj.pos.x -
    //     (this.player(1).obj.pos.x - this.player(2).obj.pos.x) / 2
    // );

    // console.log("dist ", this.player(1).obj.pos.dist(this.player(2).obj.pos));
    // console.log("camScale ", this.k.camScale());
    // console.log("camPos ", this.k.camPos());
    /** end CAM CHECK */


    // this.k.camPos(C.GAME_AREA_WIDTH / 2, C.GAME_AREA_HEIGHT / 2);

    //this.initOpponentAI();
    //this.k.wait(1, () => {
    //this.updateText("FIGHT!", this.k.pos(390,150));
    //});

/*
    //TODO finish CameraController class and get rid of this section
    this.player(1).obj.onUpdate(() => {
        
        // if (
        //   this.player(1).obj.pos.y > 80 &&
        //   this.player(2).obj.pos.y > 80 &&
        //   this.player(1).obj.pos.y < C.GAME_AREA_HEIGHT &&
        //   this.player(2).obj.pos.y < C.GAME_AREA_HEIGHT &&
        //   this.player(1).obj.pos.x > 245 &&
        //   this.player(2).obj.pos.x > 245 &&
        //   this.player(1).obj.pos.x < C.GAME_AREA_WIDTH - 145 &&
        //   this.player(2).obj.pos.x < C.GAME_AREA_WIDTH - 145
        // ) {

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
        // }
        // if (this.player(1).obj.pos.y > C.GAME_AREA_HEIGHT * 2) {
        //   this.k.go("lose");
        // }
      });


      */