
import { IPrepare, Ifiltered } from "../../../../interfaces";
import finByParams from "../../searchByParams";
import { Prepare } from "../../prepare";

const tobe = ["is", "am", "are", "I'm", "you're", "she's", "he's", "it's", "they're", "we're", "isn't", "aren't", "be"];

export function PresentContinous(data: IPrepare[]): Ifiltered {
    const res = finByParams(data, tobe)
    const sentences = res.sentences
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
        const prepared = Prepare(sentencesInUse)
        const stc = finByParams(prepared, tobe).targetWords

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
