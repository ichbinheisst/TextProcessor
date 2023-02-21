import { IPrepare, Ifiltered, ITense } from "../../../interfaces";
import SecondCondition from "./secondConditional";
import SimpleFuture from "../tenses/simpleFuture";
class FirstCondition extends SecondCondition implements ITense {
    excludeSimplePast(data: Ifiltered) {
        const sentences: string[] = []
        const simplepPastSentences = this.findSimplePast(this.preparify(data))
        data.sentences.forEach((sentence) => {
            if (!simplepPastSentences.sentences.some((stc) => stc == sentence)) {
                sentences.push(sentence)
            }
        })
        const response: IPrepare[] = sentences.map((sentence) => {
            return {
                text: sentence.split(" ")
            }
        })

        return response
    }
    override Index(data: IPrepare[]): Ifiltered {
        const ifSentences = this.findAUX(data, this.Aux)
        const filteredSentences = this.excludeSimplePast(ifSentences)
        const uniqueIf = this.findAUX(filteredSentences, this.Aux)
        if (!uniqueIf.sentences.length) {
            return {
                sentences: [],
                targetWords: [],
                numberOfTargetWords: 0
            }
        }
        const simpleFuture = new SimpleFuture() 
        const  complement = simpleFuture.Index(data)
        return {
            sentences:[...uniqueIf.sentences,...complement.sentences],
            targetWords:[...uniqueIf.targetWords,... complement.targetWords],
            numberOfTargetWords:uniqueIf.numberOfTargetWords  + complement.numberOfTargetWords
    
        }
    }

}

 export default FirstCondition