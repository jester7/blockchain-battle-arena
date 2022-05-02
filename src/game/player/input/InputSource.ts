export enum InputEvent {
    LEFT,
    RIGHT,
    JUMP,
    FIRE,
    SHIELD,
}

export default abstract class InputSource {
    public abstract initHandlers(): void;
}