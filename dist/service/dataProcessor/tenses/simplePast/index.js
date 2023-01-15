"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimplePast = exports.SimplePastAnalyse = exports.indexRegularVerbs = exports.indexIrregularVerbs = void 0;
var irregularVerbs_1 = require("../../dictionary/irregularVerbs");
var searchByParams_1 = __importDefault(require("../../searchByParams"));
var formatVerbs = irregularVerbs_1.irregularVerb.map(function (verb) {
    return verb["Past-simple"];
});
function indexIrregularVerbs(data) {
    var senteces = (0, searchByParams_1.default)(data, formatVerbs);
    return senteces;
}
exports.indexIrregularVerbs = indexIrregularVerbs;
function indexRegularVerbs(data) {
    var Sentences = [];
    var targetWords = [];
    data.forEach(function (sentences) {
        sentences.text.forEach(function (word) {
            var letter = word.split("");
            var lastIndex = letter.length - 1;
            if (letter[lastIndex] == "d" &&
                letter[lastIndex - 1] == "e") {
                Sentences.push(sentences.text.reduce(function (prev, cur) { return "".concat(prev, " ").concat(cur); }));
                targetWords.push(word);
            }
        });
    });
    return {
        sentences: Sentences,
        targetWords: targetWords,
        numberOfTargetWords: targetWords.length
    };
}
exports.indexRegularVerbs = indexRegularVerbs;
function SimplePastAnalyse(data) {
    var irregulars = indexIrregularVerbs(data);
    var regulars = indexRegularVerbs(data);
    return {
        regularVerbs: regulars.targetWords,
        totalregular: regulars.numberOfTargetWords,
        regularVerbsSentences: regulars.sentences,
        irregularVebs: irregulars.targetWords,
        totalIregular: irregulars.numberOfTargetWords,
        irregularVerbsSentences: irregulars.sentences,
        fulllist: __spreadArray(__spreadArray([], regulars.targetWords, true), irregulars.targetWords, true),
        total: regulars.numberOfTargetWords + irregulars.numberOfTargetWords,
        sentences: __spreadArray(__spreadArray([], regulars.sentences, true), [irregulars.sentences], false),
    };
}
exports.SimplePastAnalyse = SimplePastAnalyse;
function SimplePast(data) {
    var IrregularVerbs = indexIrregularVerbs(data);
    var regularVerbs = indexRegularVerbs(data);
    return {
        targetWords: __spreadArray(__spreadArray([], IrregularVerbs.targetWords, true), regularVerbs.targetWords, true),
        sentences: __spreadArray(__spreadArray([], IrregularVerbs.sentences, true), IrregularVerbs.sentences, true),
        numberOfTargetWords: IrregularVerbs.numberOfTargetWords + IrregularVerbs.numberOfTargetWords
    };
}
exports.SimplePast = SimplePast;
