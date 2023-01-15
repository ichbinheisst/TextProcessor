import { IPrepare, Ifiltered } from "../../../../interfaces"
import finByParams from "../../searchByParams"
export function FutureSimple(data: IPrepare[]): Ifiltered {
    const paramSfuture = [
        "will",
        "won't",
        "it'll",
        "she'll",
        "he'll",
        "'ll",
        "I'll",
        "we'll",
        "they'll",
        "you'll"
    ]
    const res = finByParams(data, paramSfuture)
    return res
}
 