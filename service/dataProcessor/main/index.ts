/*
 Aqui será feito todo o processamento
 Preciso fazer parametros para cada subject ser aceito 




*/
import { IPrepare, Ifiltered, Iscore } from "../../../interfaces"

interface IBase {
    Prepare: (data: string) => IPrepare[]
    finByParams(data: IPrepare[], params: string[]): Ifiltered


}

class Base implements IBase {

    calculatePorcentage(total: number, concluded: number) {
        if (!total || !concluded) {
            return 0;
        }
        let n1 = concluded * 10;
        return Math.round((n1 / total) * 10);
    }
    private treatData(text: string): string {
        const Text = text
            ?.split("")
            .map((letters) => {
                if (letters == "\n") {
                    return ".";
                }
                return letters;
            })
            .reduce((prev, current) => {
                return prev + current;
            });
        return Text;
    }
    private formatData(data: string): Array<IPrepare> {

        const arrayofText = data
            .split(".")
            .map((txt) => {
                if (txt && txt != " ") {
                    return {
                        text: txt.split(" "),
                    };
                }
            })
            .filter((script: any) => {
                return script != undefined && script != " ";
            });

        const ready = arrayofText.map((sentence: any) => {
            const clear = sentence.text.filter((word: string) => {
                return word !== "";
            });
            return {
                text: clear,
            };
        });

        return ready;
    }
    Prepare(text: string): Array<IPrepare> {
        const cleanedData = this.treatData(text);
        const splited = this.formatData(cleanedData);
        return splited;
    }
    finByParams(data: IPrepare[], params: string[]): Ifiltered {
        let targetWords: Array<string> = [];
        let foundSentences: Array<string> = []
        data.forEach((sentences) => {
            params.forEach((word) => {
                const wordsArray: string[] = []
                let wordsSplited = word.split(" ")
                let i = 0;
                const FirstWord = sentences.text.findIndex((wrd) => wrd == wordsSplited[0])
                if (FirstWord > 0) {
                    while (wordsSplited.length > i) {
                        wordsArray.push(wordsSplited[i])
                        i++
                    }
                    const newWordString = wordsArray.reduce((prev, cur) => `${prev} ${cur}`)
                    const check = params.some((wrd) => wrd.trim() == newWordString)
                    if (check) {
                        targetWords.push(newWordString)
                        const sentencesReduced = sentences.text.reduce((prev, cur) => `${prev} ${cur}`)
                        const checkNoRepeated = foundSentences.some((stc) => stc.trim().toLowerCase() == sentencesReduced.trim().toLowerCase())
                        if (!checkNoRepeated) {
                            foundSentences.push(sentencesReduced)
                        }
                    }

                }

            })

        })

        const res = {
            targetWords,
            numberOfTargetWords: targetWords.length,
            sentences: foundSentences
        }
        return res


    }
    score(data: Array<IPrepare>, params: string[]): Iscore {
        const length = data.length
        const filtered = this.finByParams(data, params)
        const numberOfTargetWords = filtered.numberOfTargetWords
        const porcentage = this.calculatePorcentage(length, numberOfTargetWords)
        const NoRepeat: string[] = []

        filtered.targetWords
        for (let index = 0; index < filtered.targetWords.length; index++) {
            let checkRepeated = NoRepeat.some((word) => word)
            if (!checkRepeated) {
                NoRepeat.push(filtered.targetWords[index])
            }

        }

        const uniquePorcentage = this.calculatePorcentage(length, NoRepeat.length)
        const res = {
            bruto: porcentage,
            unique: uniquePorcentage
        }

        return res
    }


}

export default Base