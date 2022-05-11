import BCBA from '../../BCBA';
import InputSource from './InputSource'

export default class GamePadInputSource extends InputSource {
  private _gameInstance: BCBA;
  private _idx: number;
  private _isConnected: boolean;
  private _gamepad: any = undefined;

  constructor(gamepadIdx: number = 0) {
    super();

    this._gameInstance = BCBA.getInstance();

    this._idx = gamepadIdx;
    this._isConnected = false;

    const { addEventListener } = window
    addEventListener('gamepadconnected', () => {
      this.onConnectHandler();
    });

    addEventListener('gamepaddisconnected', () => {
      this.onDisconnectHandler();
    });

    
  }

  private onConnectHandler(): void {
    let gamePad = navigator.getGamepads()[this._idx];
    if (gamePad) {
      this._isConnected = true
      this._gamepad = gamePad

      console.log(
        'gamepad connected: idx ' +
        gamePad?.index +
        ' w/ id ' +
        gamePad?.id +
        ', w/ ' +
        gamePad?.buttons.length +
        ' buttons, ' +
        gamePad?.axes.length +
        ' axes'
      )
    }
  }

  private onDisconnectHandler(): void {
    console.log("gamepad disconnected");
  }

  private isButtonPressed(b: any): boolean {
    if (typeof(b) == "object") {
      //if (b.pressed) console.log("button pressed: " + b.pressed);
      return b.pressed;
    }
    return false;
  }

  public initHandlers(): void {
    const ctx = this._gameInstance.getContext();
    //ctx.loop(0.1, () => { this.checkButtons(); });
    
    

  }

  public checkButtons(): void {
    if (this._gamepad === undefined) return;
    if (this.isButtonPressed(this._gamepad.buttons[0])) {
      BCBA.getInstance().isPaused() || this._gameInstance.player(2).jump();
    }
    if (this.isButtonPressed(this._gamepad.buttons[1])) {
      BCBA.getInstance().isPaused() || this._gameInstance.player(2).shoot();
    }
    if (this.isButtonPressed(this._gamepad.buttons[14])) {
      BCBA.getInstance().isPaused() || this._gameInstance.player(2).moveLeft();
    } else if (this.isButtonPressed(this._gamepad.buttons[15])) {
      BCBA.getInstance().isPaused() || this._gameInstance.player(2).moveRight();

    }

    if (this.isButtonPressed(this._gamepad.buttons[4])) {
      BCBA.getInstance().isPaused() || this._gameInstance.player(2).startBlocking();
    } else if (this.isButtonPressed(this._gamepad.buttons[5])) {
      BCBA.getInstance().isPaused() || this._gameInstance.player(2).startBlocking();
    }

    if (!this.isButtonPressed(this._gamepad.buttons[4]) && !this.isButtonPressed(this._gamepad.buttons[5])) {
      BCBA.getInstance().isPaused() || this._gameInstance.player(2).stopBlocking();
    }
  }
}
