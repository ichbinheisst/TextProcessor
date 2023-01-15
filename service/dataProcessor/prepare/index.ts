import { v4 as uuidv4 } from 'uuid';
import { Script, IPrepare } from '../../../interfaces'

function treatData(text: string): string {
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

function formatData(data: string): Array<IPrepare> {

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


function Prepare(text: string): Array<IPrepare> {
    const cleanedData = treatData(text);
    const splited = formatData(cleanedData);
    return splited;
}



export { Prepare, formatData, treatData } 