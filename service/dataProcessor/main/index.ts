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
    /*    calculatePorcentage(total: number, concluded: number) {
            if (!total || !concluded) {
                return 0;
            }
            let n1 = concluded * 10;
            return Math.round((n1 / total) * 10);
        }
    
    */


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

    generateUniqueArrayFromArraysOfString(data: string[], uniqueArray: string[]): void {
        data.forEach((element) => {
            const checkUnique = uniqueArray.some((el) => el.trim().toLowerCase() == element.trim().toLocaleLowerCase())
            if (checkUnique) {
                uniqueArray.push(element)
            }
        })
    }

    findByParams(data: IPrepare[], params: string[]): Ifiltered {
        let targetWords: Array<string> = [];
        let foundSentences: Array<string> = [];
        data.forEach(sentences => {
            const sentence = sentences.text.join(' ');
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

}

export default Base