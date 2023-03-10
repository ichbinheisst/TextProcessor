/*
 Aqui será feito todo o processamento
 Preciso fazer parametros para cada subject ser aceito 




*/
import { IPrepare, Ifiltered, Iscore } from "../../../interfaces"

interface IBase {
    Prepare: (data: string) => IPrepare[]
    findByParams(data: IPrepare[], params: string[]): Ifiltered
}

class Base implements IBase {

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
        const response = this.formatData(cleanedData);
        return response;
    }

    generateUniqueArrayFromArraysOfString(data: string[], uniqueArray: string[]): void {
        data.forEach((element) => {
            const checkUnique = uniqueArray.some((el) => el.trim().toLowerCase() == element.trim().toLocaleLowerCase())
            if (checkUnique) {
                uniqueArray.push(element)
            }
        })
    }

    findByParamsSingle(data: IPrepare[], params: string[]): Ifiltered {
        let targetWords: Array<string> = [];
        let foundSentences: Array<string> = [];
        data.forEach((sentences) => {
            sentences.text.forEach((word) => {
                if (params.some((param) => param == word)) {
                    foundSentences.push(sentences.text.reduce((prev, cur) => `${prev} ${cur}`))

                    targetWords.push(word)
                }
            })
        })

        return {
            targetWords,
            numberOfTargetWords: targetWords.length,
            sentences: foundSentences
        };
    }
    findByParamsMulti(data: IPrepare[], params: string[]): Ifiltered {
        let targetWords: Array<string> = [];
        let foundSentences: Array<string> = [];
        data.forEach(sentences => {
            const sentence = sentences.text.join(' ').toLocaleLowerCase();
            params.forEach(word => {
                if (sentence.includes(word)) {
                    targetWords.push(word);
                    if (!foundSentences.includes(sentence)) {
                        foundSentences.push(sentence);
                    }
                }

            });
        });
        return {
            targetWords,
            numberOfTargetWords: targetWords.length,
            sentences: foundSentences
        };
    }

    findByParams(data: IPrepare[], params: string[]): Ifiltered {
        const multi: string[] = []
        const single: string[] = []
        params.forEach((param) => {
            if (param.split(" ").length != 1) return multi.push(param)
            single.push(param)
        })

        const resMulti = this.findByParamsMulti(data, multi)
        const resSingle = this.findByParamsSingle(data, single)
        return {
            targetWords: [...resMulti.targetWords, ...resSingle.targetWords],
            numberOfTargetWords: resSingle.numberOfTargetWords + resMulti.numberOfTargetWords,
            sentences: [...resMulti.sentences, ...resSingle.sentences]
        };

        //return resSingle
    }

}

export default Base