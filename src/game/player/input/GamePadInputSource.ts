import InputSource from "./InputSource";

export default class GamePadInputSource extends InputSource {
  constructor() {
    super();
    const { addEventListener } = window;
    addEventListener("gamepadconnected", function () {
      var gp = navigator.getGamepads()[0];
      console.log(
        "gamepad connected: idx " +
          gp?.index +
          " w/ id " +
          gp?.id +
          ", w/ " +
          gp?.buttons.length +
          " buttons, " +
          gp?.axes.length +
          " axes"
      );
    });
  }
  public initHandlers(): void {
    throw new Error("Method not implemented.");
  }
}
