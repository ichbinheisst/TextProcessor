import { IPrepare, Ifiltered } from '../../../interfaces/'


function finByParams(data: IPrepare[], params: string[]): Ifiltered {
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




export default finByParams;


///isUniqueFunction 