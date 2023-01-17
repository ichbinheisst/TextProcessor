import Base from "../../main";
import { IPrepare, Ifiltered, ITense } from "../../../../interfaces";
import { irregularVerb } from "../../dictionary/irregularVerbs"

class PresentPerfect extends Base implements ITense {
    private irregularVerbList: string[] = []
    constructor() {
        super()
        this.irregularVerbList = irregularVerb.map((verb) => {
            return verb["Past-Participle"]
        })

    }
    list: string[] = [
        "have",
        "has",
        "hasn't",
        "haven't",
        "she's",
        "he's",
        "it's",
        "they've",
        "you've",
        "I've"
    ]

    private findAux(data: IPrepare[]): IPrepare[] {
        const sentences: IPrepare[] = []
        data.forEach((stc) => {
            stc.text.forEach((word) => {
                const checkList = this.list.some((listItem) => word == listItem)
                if (checkList) {
                    sentences.push(stc)
                }
            })
        })
        return sentences
    }

    indexRegularVerbs(data: IPrepare[]): Ifiltered {
        const Sentences: string[] = [];
        const targetWords: string[] = []
        data.forEach((sentences) => {
            sentences.text.forEach((word) => {
              if(word.includes("ed")){
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
    indexIrregularVerbs(data: IPrepare[]): Ifiltered {
        const senteces = this.findByParams(data, this.irregularVerbList)
        return senteces
    }

    Index(data: IPrepare[]): Ifiltered {
        const validSentences: IPrepare[] = this.findAux(data)
        const sentencesRegularVerbs = this.indexRegularVerbs(validSentences)
        const sentencesIrregularVerbs = this.indexIrregularVerbs(validSentences)
        return {
            numberOfTargetWords: 1,
            sentences: [...sentencesIrregularVerbs.sentences, ...sentencesRegularVerbs.sentences],
            targetWords: [...sentencesIrregularVerbs.targetWords, ...sentencesRegularVerbs.targetWords]
        }


    }

}

export default PresentPerfect