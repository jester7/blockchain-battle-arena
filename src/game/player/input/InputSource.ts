import { KaboomCtx } from "kaboom";

export enum InputEvent {
    LEFT,
    RIGHT,
    JUMP,
    FIRE,
    SHIELD,
}

export default abstract class InputSource {

    constructor(protected _ctx: KaboomCtx, protected _player: number) {}

    public abstract initHandlers(): void;
}