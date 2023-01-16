import { IPrepare, Ifiltered, ITense } from "../../../../interfaces";
import { irregularVerb } from "../../dictionary/irregularVerbs";
import Base from "../../main";

class SimplePast extends Base implements ITense {
    private formatVerbs: string[] = []
    constructor() {
        super()
        this.formatVerbs = irregularVerb.map((verb) => {
            return verb["Past-simple"]
        })
    }
    indexIrregularVerbs(data: IPrepare[]): Ifiltered {
        const senteces = this.finByParams(data, this.formatVerbs)
        return senteces
    }
    indexRegularVerbs(data: IPrepare[]): Ifiltered {
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
    Index(data: IPrepare[]): Ifiltered {
        const IrregularVerbs = this.indexIrregularVerbs(data)
        const regularVerbs = this.indexRegularVerbs(data)
        return {
            targetWords: [...IrregularVerbs.targetWords, ...regularVerbs.targetWords],
            sentences: [...IrregularVerbs.sentences, ...IrregularVerbs.sentences],
            numberOfTargetWords: IrregularVerbs.numberOfTargetWords + IrregularVerbs.numberOfTargetWords
        }
    }

}

export default SimplePast