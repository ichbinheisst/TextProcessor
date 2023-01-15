
import sample from "../sample";
import { v4 as uuidv4 } from "uuid";
import { IWord, IUnscramble, IUnscrambleActivity, ISubtitle } from "../interface";
import finByParams from "../../dataProcessor/searchByParams";

function createArraywithUniqueElements(data: ISubtitle[]): ISubtitle[] {
    const uniqueArray: ISubtitle[] = []
    data.forEach(element => {
        const check: boolean = uniqueArray.some((el) => el?.text == element.text)
        if (!check) {
            uniqueArray.push(element)
        }
    });
    return uniqueArray
}

function checkValibleSentence(data: ISubtitle[]): ISubtitle[] {
    const valiableDataArray: ISubtitle[] = []
    data.forEach((element) => {
        let text = element.text.split(" ")
        if (text.length > 4) {
            valiableDataArray.push(element)
        }
    })
    return valiableDataArray

}

function createUnscramble(data: ISubtitle[]): IUnscrambleActivity[] {
    const activities = data.map((element) => {
        return {
            ...element,
            activity: {
                words: element.text.split(" ").sort().map((wrd) => {
                    return {
                        wordId: uuidv4(),
                        word: wrd
                    }
                }),
                answer: element.text.trim()
            },

        }
    }
    )
    return activities
}

function Create(data: ISubtitle[]): IUnscrambleActivity[] {
    const unique = createArraywithUniqueElements(data)
    const valid = checkValibleSentence(unique)
    const activity = createUnscramble(valid)
    return activity
}


function CreateFunellParams(data: IUnscrambleActivity[], params: string[]): IUnscrambleActivity[] {
    const paramedResponse: IUnscrambleActivity[] = []
    data.forEach((element, index) => {
        element.text.split(" ").forEach((wrd) => {
            const checkParam = params.some((param) => param == wrd)
            if (checkParam) {
                paramedResponse.push(element)
            }
        })
    })

    return paramedResponse


}


export { Create, sample, CreateFunellParams }