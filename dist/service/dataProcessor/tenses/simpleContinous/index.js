"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentContinous = void 0;
var searchByParams_1 = __importDefault(require("../../searchByParams"));
var prepare_1 = require("../../prepare");
var tobe = ["is", "am", "are", "I'm", "you're", "she's", "he's", "it's", "they're", "we're", "isn't", "aren't", "be"];
function PresentContinous(data) {
    var res = (0, searchByParams_1.default)(data, tobe);
    var sentences = res.sentences;
    var targetWords = [];
    var MatchedSentences = [];
    sentences.forEach(function (sentence, index) {
        sentence.split(" ").forEach(function (word) {
            var letters = word.split("");
            if (letters.length > 3) {
                var lastLetterIndex = letters.length - 1;
                if (letters[lastLetterIndex] == "g" && letters[lastLetterIndex - 1] && "n" && letters[lastLetterIndex - 2] == "i") {
                    targetWords.push(word);
                    MatchedSentences.push(sentence);
                }
            }
        });
    });
    if (MatchedSentences.length) {
        var sentencesInUse = MatchedSentences.reduce(function (prev, current) { return "".concat(prev, "\n ").concat(current, " "); });
        var prepared = (0, prepare_1.Prepare)(sentencesInUse);
        var stc = (0, searchByParams_1.default)(prepared, tobe).targetWords;
        for (var index = 0; index < stc.length; index++) {
            var element = stc[index];
            targetWords.push(element);
        }
    }
    return {
        targetWords: targetWords,
        sentences: MatchedSentences,
        numberOfTargetWords: targetWords.length
    };
}
exports.PresentContinous = PresentContinous;
