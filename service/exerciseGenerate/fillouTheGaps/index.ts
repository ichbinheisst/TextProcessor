import BaseActivity from "../main";
import { IActivity, ISubtitle } from '../interface'


const target = { "res": "didn't", "text": ["I", "*", "get", "the", "chance", "to"], "time": { "from": 185000, "to": 188500 } }
interface IValidSentence {
    sentence: string,
    word: string

}
interface Ifillout {
    res: string,
    text: string[]
}





class FillOutTheGaps extends BaseActivity {
    private validLenght: number = 4;
    constructor(lenght: number | null) {
        super()
        if (!lenght) {
            return
        }
        this.validLenght = lenght;
    }

    findSentencesWithParams(data: ISubtitle[], params: string[]): IValidSentence[] {
        const sentences: IValidSentence[] = [
        ]

        data.forEach((stc) => {
            stc.text.split(" ").forEach((word) => {
                const checkContensKeyWord = params.some((item) => item == word)
                if (checkContensKeyWord) {
                    sentences.push({ sentence: stc.text, word })
                }
            })

        })
        return sentences

    }

    create(data: ISubtitle[], params: string[]) {

        const sentences: Ifillout[] = []
        const valid = this.checkValidLengthSentence(data, this.validLenght)
        const unique = this.createArraywithUniqueElements(valid)
        const sentenceWithParams = this.findSentencesWithParams(unique, params)
        if (!sentenceWithParams.length) return
        sentenceWithParams.forEach((item) => {
            const sentenceArray = item.sentence.split(" ")
            const indexofWord = sentenceArray.indexOf(item.word)
            if (indexofWord < 0) return
            sentenceArray[indexofWord] = "*"
            sentences.push({
                res: item.word,
                text: sentenceArray
            })




        })





    }





}

export default FillOutTheGaps