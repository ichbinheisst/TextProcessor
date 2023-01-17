"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findByParams(data, params) {
    var targetWords = [];
    var foundSentences = [];
    data.forEach(function (sentences) {
        params.forEach(function (word) {
            var wordsArray = [];
            var wordsSplited = word.split(" ");
            var i = 0;
            var FirstWord = sentences.text.findIndex(function (wrd) { return wrd == wordsSplited[0]; });
            if (FirstWord > 0) {
                while (wordsSplited.length > i) {
                    wordsArray.push(wordsSplited[i]);
                    i++;
                }
                var newWordString_1 = wordsArray.reduce(function (prev, cur) { return "".concat(prev, " ").concat(cur); });
                var check = params.some(function (wrd) { return wrd.trim() == newWordString_1; });
                if (check) {
                    targetWords.push(newWordString_1);
                    var sentencesReduced_1 = sentences.text.reduce(function (prev, cur) { return "".concat(prev, " ").concat(cur); });
                    var checkNoRepeated = foundSentences.some(function (stc) { return stc.trim().toLowerCase() == sentencesReduced_1.trim().toLowerCase(); });
                    if (!checkNoRepeated) {
                        foundSentences.push(sentencesReduced_1);
                    }
                }
            }
        });
    });
    var res = {
        targetWords: targetWords,
        numberOfTargetWords: targetWords.length,
        sentences: foundSentences
    };
    return res;
}
function findByParams2(data, params) {
    var targetWords = [];
    var foundSentences = [];
    data.forEach(function (sentences) {
        var sentence = sentences.text.join(' ');
        params.forEach(function (word) {
            if (sentence.includes(word)) {
                targetWords.push(word);
                if (!foundSentences.includes(sentence)) {
                    foundSentences.push(sentence);
                }
            }
        });
    });
    return {
        targetWords: targetWords,
        numberOfTargetWords: targetWords.length,
        sentences: foundSentences
    };
}
exports.default = findByParams2;
///isUniqueFunction 
