import Base from "../../main";

import { verbsMostCommonPresent } from "../../dictionary/simplePresentMostCommonVerbs";
import { IPrepare, Ifiltered, Iscore, ITense } from "../../../../interfaces";


type ending = "s" | "es" | "ies";

class PresentSimple extends Base implements ITense {

    public Index(data: IPrepare[]): Ifiltered {
        const baseForm = this.finByParams(data, verbsMostCommonPresent)
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
            arraytoPushInto.push(reshapedWord)
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
                if (
                    letters.length > 2 &&
                    letters[letters.length - 1] == "s" &&
                    letters[letters.length - 2] != "s"
                ) {
                    let res = this.cloneAndQuery(letters, "s", verbsMostCommonPresent, targetWords)
                    if (res) {
                        sentences.push(sentence.text.reduce((prev, cur) => `${prev} ${cur}`))
                    }
                }
                if (
                    letters.length > 2 &&
                    letters[letters.length - 1] == "s" &&
                    letters[letters.length - 2] == "e"
                ) {
                    let res = this.cloneAndQuery(letters, "es", verbsMostCommonPresent, targetWords)
                    if (res) {
                        sentences.push(sentence.text.reduce((prev, cur) => `${prev} ${cur}`))
                    }
                }
                if (
                    letters.length > 3 &&
                    letters[letters.length - 2] == "e" &&
                    letters[letters.length - 3] == "i" &&
                    letters[letters.length - 1] == "s"
                ) {
                    let res = this.cloneAndQuery(letters, "ies", verbsMostCommonPresent, targetWords)
                    if (res) {
                        sentences.push(sentence.text.reduce((prev, cur) => `${prev} ${cur}`))
                    }
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


    PrepareTense(data: Ifiltered, txt: IPrepare[]): IPrepare[] {
        const text = data.targetWords;
        const res = text.map((el, index) => {
            return {
                text: Array.of(el)
            }
        })
        res.forEach(element => {
            txt.pop()
        });


        return [...res, ...txt]

    }


    TenseSCore(data: Ifiltered): Iscore {
        const NotReapeated: string[] = []
        for (let index = 0; index < data.targetWords.length; index++) {
            const word = data.targetWords[index];

            const checkWord = NotReapeated.some((wrd) => wrd == word)
            if (!checkWord) {
                NotReapeated.push(word)
            }
        }
        return {
            bruto: data.numberOfTargetWords,
            unique: NotReapeated.length
        }

    }


}
export default PresentSimple