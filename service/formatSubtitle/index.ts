import { IPrepare } from "../../interfaces";
import Base from "../dataProcessor/main";
import { ISubtitle } from '../exerciseGenerate/interface'


type IPontuation = "." | "?" | "!" | ","

class Format extends Base {
    private potuation = [".", "?", "!", ","]
    private auxModalList = [
        "does",
        "doesn't",
        "did",
        "didn't",
        "do",
        "don't",
        "have",
        "haven't",
        "has",
        "hasn't",
        "will",
        "won't",
        "can",
        "can't",
        "had",
        "hadn't",
        "must",
        "shoudn't",
        "shoud"
    ]
    checkIfThereIsPontuation(sentence: IPrepare): boolean {
        let response = false
        this.potuation.forEach((mark) => {
            const lastIndexText = sentence.text[sentence.text.length - 1]
            response = lastIndexText.includes(mark)
        })
        return response
    }
    checkIfthereIsAux(sentence: IPrepare): boolean {
        let response = false
        this.auxModalList.forEach((aux) => {
            const lastIndexText = sentence.text[0]
            response = lastIndexText.includes(aux)
        })
        return response
    }
    add(sentence: IPrepare, pontuation: IPontuation) {
        let last = sentence.text[sentence.text.length - 1] + pontuation;
        sentence.text.pop()
        sentence.text.push(last)

    }

    addPontuation(sentence: IPrepare): IPrepare {
        if (this.checkIfThereIsPontuation(sentence)) return sentence
        this.checkIfthereIsAux(sentence) ? this.add(sentence, "?") : this.add(sentence, ".")
        return sentence

    }

    create(text: IPrepare[]): ISubtitle[] {
        const response = text.map((element) => {
            const sentencePropelyPontuated = this.addPontuation(element)
            return {
                text: sentencePropelyPontuated.text.reduce((prev, cur) => `${prev} ${cur}`),
                time: {
                    from: 0,
                    to: 0,
                },
                selected: false,
                translation: "",
            }
        })
        return response
    }

}

export default Format









