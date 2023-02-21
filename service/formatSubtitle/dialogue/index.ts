import { IParams, IPrepare } from "../../../interfaces";

interface IDialogue {
    name: string,
    thumb: string,
    text: string,
    time: { from: number, to: number },
    selected: boolean,


}

function containsUppercase(str: string) {
    return /[A-Z]/.test(str);
}

function GenerateDialogue(data: IPrepare[]): IDialogue[] {
    const response: IDialogue[] = []
    data.forEach((item) => {
        item.text.forEach((word, index) => {
            if (word.includes(":") && containsUppercase(word)) {
                const copy: string[] = JSON.parse(JSON.stringify(item.text))
                copy.shift()
                const text = copy.reduce((prev, cur) => `${prev} ${cur}`)
                const res = {
                    name: word,
                    thumb: "s",
                    text,
                    time: { from: 0, to: 0 },
                    selected: false
                }
                response.push(res)

            }
        })

    })


    return response

}

export default GenerateDialogue


