
import { IPrepare, Ifiltered, ITense } from "../../../../interfaces";
import Base from "../../main";

class SimplePresentContinous extends Base implements ITense {
    tobe = ["is", "am", "are", "I'm", "you're", "she's", "he's", "it's", "they're", "we're", "isn't", "aren't", "be"];
    private findSentencesverbTobe(data: IPrepare[]): Ifiltered {
        const res = this.finByParams(data, this.tobe)
        return res
    }
    private findSentecesWithING(data: Ifiltered): Ifiltered {
        const sentences = data.sentences;
        const targetWords: string[] = []
        const MatchedSentences: string[] = []
        sentences.forEach((sentence, index) => {
            sentence.split(" ").forEach((word) => {
                const letters = word.split("")
                if (letters.length > 3) {
                    const lastLetterIndex = letters.length - 1
                    if (letters[lastLetterIndex] == "g" && letters[lastLetterIndex - 1] && "n" && letters[lastLetterIndex - 2] == "i") {
                        targetWords.push(word)
                        MatchedSentences.push(sentence)
                    }
                }
            })
        })

        if (MatchedSentences.length) {
            const sentencesInUse: string = MatchedSentences.reduce((prev, current) => `${prev}\n ${current} `);
            const prepared = this.Prepare(sentencesInUse)
            const stc = this.findSentencesverbTobe(prepared).targetWords

            for (let index = 0; index < stc.length; index++) {
                const element = stc[index];
                targetWords.push(element);
            }
        }
        return {
            targetWords,
            sentences: MatchedSentences,
            numberOfTargetWords: targetWords.length
        }

    }
    Index(data: IPrepare[]): Ifiltered {
        const sentencesVerbTobe = this.findSentencesverbTobe(data)
        const PresentContinous = this.findSentecesWithING(sentencesVerbTobe);
        return PresentContinous
    }



}


export default SimplePresentContinous