import { IPrepare, Ifiltered, ITense } from "../../../../interfaces";
import { irregularVerb } from "../../dictionary/irregularVerbs";
import PresentPerfect from "../presentPerfect";
import PastPerfect from "../pastPerfect";
import Base from "../../main";


class SimplePast extends Base implements ITense {
    private formatVerbs: string[] = []
    constructor() {
        super()
        this.formatVerbs = irregularVerb.map((verb) => {
            return verb["Past-simple"]
        })
    }


    getRidOfPerfect(data: IPrepare[]): IPrepare[] {
        const PresentP = new PresentPerfect().Index(data)
        const PastP = new PastPerfect().Index(data)
        const perfectsTenseSentences: string[] = [...PastP.sentences, ...PresentP.sentences]
        const response: IPrepare[] = []

        data.forEach((element) => {
            const sentence = element.text.join(" ").trim()
            if (perfectsTenseSentences.some((stc) => stc != sentence) && sentence.length > 0) {
                response.push({ text: sentence.split(" ") })
            }

        })
       

        return response
    }

    indexIrregularVerbs(data: IPrepare[]): Ifiltered {
        const senteces = this.findByParams(data, this.formatVerbs)
        return senteces
    }
    indexRegularVerbs(data: IPrepare[]): Ifiltered {
        const Sentences: string[] = [];
        const targetWords: string[] = []
        data.forEach((sentences) => {
            sentences.text.forEach((word) => {
                if (word.includes("ed")) {
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

        const dataWithoutPerfectTense = this.getRidOfPerfect(data)
        const IrregularVerbs = this.indexIrregularVerbs(dataWithoutPerfectTense)
        const regularVerbs = this.indexRegularVerbs(dataWithoutPerfectTense)
        const response = {
            targetWords: [...IrregularVerbs.targetWords, ...regularVerbs.targetWords],
            sentences: [...IrregularVerbs.sentences, ...IrregularVerbs.sentences],
            numberOfTargetWords: IrregularVerbs.numberOfTargetWords + IrregularVerbs.numberOfTargetWords
        }
        return response


    }

}

export default SimplePast