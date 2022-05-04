import { GameObj, Vec2 } from "kaboom";
import BCBA from "../BCBA";
import * as C from "../constants";

export interface xyTuple {
  x: number;
  y: number;
}

export interface GameArea {
  viewport: xyTuple;
  world: xyTuple;
}

/**
 * Handles camera object tracking and zooming. Attempts to maintain all tracked objects
 * visible in the current viewport as long as they are inside the bounds of the world.
 * It was meant to be used with player objects but any object can be tracked, such as NPCs
 * or animated bg objects or scenery.
 */
export default class CameraController {
  private _ctx: any;
  private _trackObjects: Array<GameObj>;
  private _edgeBuffer: xyTuple; // maintains this x and y distance between objects and viewport edges

  private DEBUG;
  private frameCount = 0;
  // the following controls logging frequency when debug enabled, lower number spikes browser resource use
  private _logSkipFrames: number; // at 60 FPS: a val of 60 here is once per second, 300 = once every 5 seconds

  // stores the last time the update() method was called on any of the tracked objects
  private _lastUpdateTime: number = 0;

  private _preferredObjectIdx: number = 0; // not implemented yet, will be used to prefer tracking a specific object over the others under certain circumstances
  private _currentLeftMostIdx: number = 0;
  private _currentRightMostIdx: number = 0;
  private _currentTopMostIdx: number = 0;
  private _currentBottomMostIdx: number = 0;

  private MAX_X_SCALE: number = C.WORLD_WIDTH / C.VIEWPORT_WIDTH;
  private MAX_Y_SCALE: number = C.WORLD_HEIGHT / C.VIEWPORT_HEIGHT;
  private MAX_SCALE: number =
    this.MAX_X_SCALE > this.MAX_Y_SCALE ? this.MAX_Y_SCALE : this.MAX_X_SCALE;

  constructor(
    ctx: any,
    trackObjects: Array<GameObj>,
    edgeBuffer: xyTuple,
    debugMode: boolean = false,
    logSkipFrames: number = 600
  ) {
    this._ctx = ctx;
    this._trackObjects = trackObjects;
    this._edgeBuffer = edgeBuffer;
    this.DEBUG = debugMode;
    this._logSkipFrames = logSkipFrames;

    // Loops through all tracked objects and adds this classes update() method as onUpdate callback:
    // it is necessary to do this on all of them because it assures it will run even if most objects are not moving.
    // Even if only one is moving it might be necessary to adjust the camera to keep all objects visible.
    for (let i = 0; i < this._trackObjects.length; i++) {
      // capture the i as id/index for running extra update handlers
      // for individual objects (not implemented yet)
      // TODO: add methods to add/remove extra update handlers
      this._trackObjects[i].onUpdate(() => {
        this.update(i);
      });
    }
  }

  private log(msg?: any, ...optionalParams: any[]) {
    // only log if debug mode is enabled and the remainder of frame count divided by num of frames to skip is zero (<= 1 instead of === for rounding)
    if (this.DEBUG && this.frameCount % this._logSkipFrames <= 1) {
      console.log(msg, optionalParams);
    }
  }

  public setPreferredObject(idx: number) {
    this._preferredObjectIdx = idx;
  }

  public getPreferredObject(): GameObj {
    return this._trackObjects[this._preferredObjectIdx];
  }

  public getTrackedObject(n: number): GameObj {
    return this._trackObjects[n];
  }

  public pushTrackedObject(obj: GameObj) {
    this._trackObjects.push(obj);
  }

  public popTrackedObject(): GameObj | undefined {
    return this._trackObjects.pop();
  }

  public update(id?: number) {
    if (this.DEBUG) this.frameCount++; // TODO I forgot the max for numbers in js, is overflow possible? probably not
    if (this._ctx.time() === this._lastUpdateTime) return; // skip update if it was already called this frame

    this._lastUpdateTime = this._ctx.time();
    //this.log("last update time: ", this._lastUpdateTime);

    const minMax = this.getMinMaxXY(); // get maxes and mins for x and y coords of all tracked objects

    const deltaX = minMax.max.x + 155 - minMax.min.x; // compensate for width of player
    const deltaY = minMax.max.y - minMax.min.y + 197; // compensate for height of player
    let midpointX = deltaX / 2 + minMax.min.x;
    let midpointY = deltaY / 2 + minMax.min.y;
    const scaleX = C.VIEWPORT_WIDTH / (deltaX + this._edgeBuffer.x * 2); // edge buffer is so that viewport is not exactly at the object's edge
    const scaleY = C.VIEWPORT_HEIGHT / (deltaY + this._edgeBuffer.y * 2);

    let scale = scaleX > scaleY ? scaleY : scaleX;

    if (scale > 2) scale = 2; // TODO make this a constant, or make it constructor param
    if (scale < 1 / this.MAX_SCALE) scale = 1 / this.MAX_SCALE;

    if (midpointX < C.VIEWPORT_WIDTH / 2 / scale) {
      midpointX = C.VIEWPORT_WIDTH / 2 / scale;
    }
    if (midpointY < C.VIEWPORT_HEIGHT / 2 / scale) {
      midpointY = C.VIEWPORT_HEIGHT / 2 / scale;
    }
    if (midpointX > C.WORLD_WIDTH - C.VIEWPORT_WIDTH / 2 / scale) {
      midpointX = C.WORLD_WIDTH - C.VIEWPORT_WIDTH / 2 / scale;
    }
    if (midpointY > C.WORLD_HEIGHT - C.VIEWPORT_HEIGHT / 2 / scale) {
      midpointY = C.WORLD_HEIGHT - C.VIEWPORT_HEIGHT / 2 / scale;
    }
    this.log(scale, midpointX, midpointY);

    this._ctx.camPos(this._ctx.vec2(midpointX, midpointY));
    this._ctx.camScale(scale);
  }

  private camPos(): Vec2 {
    return this._ctx.camera.pos;
  }

  private getMinMaxXY(): { min: xyTuple; max: xyTuple } {
    let mins: xyTuple = { x: 5000, y: 2956 };
    let maxs: xyTuple = { x: 0, y: 0 };

    for (let i = 0; i < this._trackObjects.length; i++) {
      if (this._trackObjects[i].pos.y > C.WORLD_HEIGHT * 2) {
        this._trackObjects[i].setHP(0); // kill the player if they go to far down
        BCBA.getInstance().updateHealthInfo();
        break;
      }

      if (this._trackObjects[i].pos.x < mins.x) {
        mins.x =
          this._trackObjects[i].pos.x < 0 ? 0 : this._trackObjects[i].pos.x;
        this._currentLeftMostIdx = i; // store the index of the leftmost object
      }

      if (this._trackObjects[i].pos.y < mins.y) {
        mins.y =
          this._trackObjects[i].pos.y < 0 ? 0 : this._trackObjects[i].pos.y;
        this._currentBottomMostIdx = i;
      }

      if (this._trackObjects[i].pos.x > maxs.x) {
        maxs.x =
          this._trackObjects[i].pos.x > C.WORLD_WIDTH
            ? C.WORLD_WIDTH
            : this._trackObjects[i].pos.x;
        this._currentRightMostIdx = i;
      }

      if (this._trackObjects[i].pos.y > maxs.y) {
        maxs.y =
          this._trackObjects[i].pos.y > C.WORLD_HEIGHT
            ? C.WORLD_HEIGHT
            : this._trackObjects[i].pos.y;
        this._currentTopMostIdx = i;
      }
    }

    //this.log("mins: ", mins, " maxs: ", maxs);

    return { min: mins, max: maxs };
  }
}
