import { IPrepare, Ifiltered, ITense } from "../../../../interfaces"
import Base from "../../main"

class SimpleFuture extends Base implements ITense {
    private list = [
        "will",
        "won't",
        "it'll",
        "she'll",
        "he'll",
        "'ll",
        "I'll",
        "we'll",
        "they'll",
        "you'll"]

    Index(data: IPrepare[]): Ifiltered {
        const res = this.finByParams(data, this.list)
        return res

    }

}

export default SimpleFuture