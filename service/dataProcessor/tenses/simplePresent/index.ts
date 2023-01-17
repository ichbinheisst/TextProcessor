import Base from "../../main";

import { verbsMostCommonPresent } from "../../dictionary/simplePresentMostCommonVerbs";
import { IPrepare, Ifiltered, Iscore, ITense } from "../../../../interfaces";


type ending = "s" | "es" | "ies";

class SimplePresent extends Base implements ITense {

    public Index(data: IPrepare[]): Ifiltered {
        const baseForm = this.findByParams(data, verbsMostCommonPresent)
        const thirdPerson = this.IndexSimplePresentThirdPerson(data)
        return {
            targetWords: [...baseForm.targetWords, ...thirdPerson.targetWords],
            sentences: [...baseForm.sentences, ...thirdPerson.targetWords],
            numberOfTargetWords: baseForm.numberOfTargetWords + thirdPerson.numberOfTargetWords
        }
    }

    private cloneAndQuery(letters: Array<string>, word: ending, verbs: string[], arraytoPushInto: string[]): boolean {
        const clone = JSON.parse(JSON.stringify(letters))
        switch (word) {
            case "s":
                clone.pop()
                break;
            case "es":
                word.split('').forEach(() => clone.pop())
                break;
            case "ies":
                word.split('').forEach(() => clone.pop())
                clone.push("y");
                break;
        }
        const reshapedWord = clone.reduce((prev: string, current: string) => {
            return prev + current
        })
        const check = verbs.some((wrd) => wrd == reshapedWord)
        if (check) {
            arraytoPushInto.push(letters.reduce((prev: string, current: string) => {
                return prev + current
            }))
            return true
        }

        return false
    }

    private IndexSimplePresentThirdPerson(data: IPrepare[]): Ifiltered {
        const targetWords: string[] = []
        const sentences: string[] = []
        data.forEach((sentence, indexSentence) => {
            sentence.text.forEach((word, indexWord) => {
                let letters: string[] = word.trim().split('')
                const endings: ending[] = ["s", "es", "ies"]
                if (letters.length > 2) {
                    endings.forEach((end) => {
                        if (word.includes(end)) {
                            let res = this.cloneAndQuery(letters, end, verbsMostCommonPresent, targetWords)
                            if (res) {
                                sentences.push(sentence.text.reduce((prev, cur) => `${prev} ${cur}`))
                            }
                        }
                    })

                }

            })
        })

        const response = {
            targetWords,
            sentences,
            numberOfTargetWords: targetWords.length
        }
        return response
    }

}
export default SimplePresent