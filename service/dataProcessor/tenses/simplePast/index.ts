import { IPrepare, Ifiltered } from "../../../../interfaces";
import { irregularVerb } from "../../dictionary/irregularVerbs";
import finByParams from "../../searchByParams";

const formatVerbs = irregularVerb.map((verb) => {
    return verb["Past-simple"]
})

export function indexIrregularVerbs(data: IPrepare[]): Ifiltered {
    const senteces = finByParams(data, formatVerbs)
    return senteces
}


export function indexRegularVerbs(data: IPrepare[]): Ifiltered {
    const Sentences: string[] = [];
    const targetWords: string[] = []
    data.forEach((sentences) => {
        sentences.text.forEach((word) => {
            const letter = word.split("")
            const lastIndex = letter.length - 1
            if (letter[lastIndex] == "d" &&
                letter[lastIndex - 1] == "e"
            ) {
                Sentences.push(sentences.text.reduce((prev, cur) => `${prev} ${cur}`))
                targetWords.push(word)
            }
        })
    })
    return {
        sentences: Sentences,
        targetWords,
        numberOfTargetWords: targetWords.length
    }
}


export function SimplePastAnalyse(data: IPrepare[]) {
    const irregulars = indexIrregularVerbs(data)
    const regulars = indexRegularVerbs(data)
    return {
        regularVerbs: regulars.targetWords,
        totalregular: regulars.numberOfTargetWords,
        regularVerbsSentences: regulars.sentences,
        irregularVebs: irregulars.targetWords,
        totalIregular: irregulars.numberOfTargetWords,
        irregularVerbsSentences: irregulars.sentences,
        fulllist: [...regulars.targetWords, ...irregulars.targetWords],
        total: regulars.numberOfTargetWords + irregulars.numberOfTargetWords,
        sentences: [...regulars.sentences, irregulars.sentences],
    };
}


export function SimplePast(data: IPrepare[]): Ifiltered {
    const IrregularVerbs = indexIrregularVerbs(data)
    const regularVerbs = indexRegularVerbs(data)
    return {
        targetWords: [...IrregularVerbs.targetWords, ...regularVerbs.targetWords],
        sentences: [...IrregularVerbs.sentences, ...IrregularVerbs.sentences],
        numberOfTargetWords: IrregularVerbs.numberOfTargetWords + IrregularVerbs.numberOfTargetWords
    }
}