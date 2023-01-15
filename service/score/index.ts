import { Ifiltered, IPrepare, Iscore } from '../../interfaces';
import finByParams from '../dataProcessor/searchByParams';

function calculatePorcentage(total: number, concluded: number) {
    if (!total || !concluded) {
        return 0;
    }
    let n1 = concluded * 10;
    return Math.round((n1 / total) * 10);
}

function score(data: Array<IPrepare>, params: string[]): Iscore {
    const length = data.length
    const filtered = finByParams(data, params)
    const numberOfTargetWords = filtered.numberOfTargetWords
    const porcentage = calculatePorcentage(length, numberOfTargetWords)
    const NoRepeat: string[] = []

    filtered.targetWords
    for (let index = 0; index < filtered.targetWords.length; index++) {
        let checkRepeated = NoRepeat.some((word) => word)
        if (!checkRepeated) {
            NoRepeat.push(filtered.targetWords[index])
        }

    }

    const uniquePorcentage = calculatePorcentage(length, NoRepeat.length)
    const res = {
        bruto: porcentage,
        unique: uniquePorcentage
    }

    return res
}

export { score, calculatePorcentage }