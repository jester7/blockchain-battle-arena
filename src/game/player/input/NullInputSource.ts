import BCBA from "../../BCBA";
import InputSource from "./InputSource";

// dummy input source used by AI
export default class NullInputSource extends InputSource {

    constructor(player: number = 0) {
        super(BCBA.getInstanceCtx(), player);
    }

    public initHandlers(): void {
    }
}
