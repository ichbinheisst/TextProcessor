import Base from "../main";

import { Ifiltered, IPrepare,ITense } from "../../../interfaces";
import SimplePast from "../tenses/simplePast";



class SecondCondition extends Base implements ITense {
  Aux: string[] = [
        "if", "If"]
   Modals: string[] = [
        "could",
        "should",
        "might",
        "would",
        "I'd",
        "you'd",
        "she'd",
        "i'd",
        "he'd",
        "she'd",
        "it'd",
        "they'd",
        "we'd"
    ]

    findAUX(data: IPrepare[], params: string[]): Ifiltered {
        const response = this.findByParams(data, params)
        return response

    }
    preparify(data: Ifiltered): IPrepare[] {
        const preparedResponse: IPrepare[] = data.sentences.map((sentence) => {
            return {
                text: sentence.split(" ")
            }
        })
        return preparedResponse
    }

    findSimplePast(data: IPrepare[]): Ifiltered {
        const simplePast = new SimplePast().Index(data)
        return simplePast
    }

    Index(data: IPrepare[]): Ifiltered {
        const ifSentences = this.findAUX(data, this.Aux)
        const pastSentences = this.findSimplePast(this.preparify(ifSentences))
        const complement = this.findAUX(data, this.Modals)
        return {
            targetWords: [...pastSentences.targetWords, ...complement.targetWords],
            sentences: [...pastSentences.sentences, ...complement.sentences],
            numberOfTargetWords: pastSentences.numberOfTargetWords + complement.numberOfTargetWords
        }

    }
}





export default SecondCondition