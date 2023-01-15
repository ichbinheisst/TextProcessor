"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prepare_1 = require("../../../prepare");
const irregularVerbs_1 = __importDefault(require("../.././../dictionary/irregularVerbs"));
function findAux(data) {
    const format = (0, prepare_1.Prepare)(data);
    if (!format || !format.length) {
        return [{
                index: 0,
                sentence: {
                    text: []
                }
            }];
    }
    const sentencesWithHave = [];
    const wordtobeFiltered = [
        "have",
        "has",
        "I've",
        "you've",
        "she's",
        "he's",
        "it's",
        "they've",
    ];
    format.forEach((sentence) => {
        sentence.text.forEach((word, index) => {
            const checkWords = wordtobeFiltered.some((w) => {
                return w == word;
            });
            if (checkWords) {
                sentencesWithHave.push({ sentence, index });
            }
        });
    });
    return sentencesWithHave;
}
// it returns words sentences with has or have 
class PresentPerfect {
    constructor() {
        this.wordtobeFiltered = [
            "have",
            "has",
            "I've",
            "you've",
            "she's",
            "he's",
            "it's",
            "they've",
        ];
    }
    findAux(data) {
        const format = (0, prepare_1.Prepare)(data);
        if (!format || !format.length) {
            return [];
        }
        const sentencesWithHave = [];
        format.forEach((sentence) => {
            sentence.text.forEach((word, index) => {
                const checkWords = this.wordtobeFiltered.some((w) => {
                    return w == word;
                });
                if (checkWords) {
                    sentencesWithHave.push({ sentence, index });
                }
            });
        });
        return sentencesWithHave;
    }
    findRegularVerbs(sentences) {
        const res = [];
        sentences.forEach((stc) => {
            const { sentence, index } = stc;
            const text = sentence === null || sentence === void 0 ? void 0 : sentence.text;
            text === null || text === void 0 ? void 0 : text.forEach((word) => {
                const letters = word.split("");
                if (letters[letters.length - 1] == "d" &&
                    letters[letters.length - 2] == "e") {
                    res.push({
                        sentence: text,
                        index,
                        word,
                    });
                }
            });
        });
        return res;
    }
    findIrregularverbs(sentences) {
        const res = [];
        sentences.forEach((stc) => {
            const { sentence, index } = stc;
            const text = sentence === null || sentence === void 0 ? void 0 : sentence.text;
            text === null || text === void 0 ? void 0 : text.forEach((word) => {
                const check = irregularVerbs_1.default.some((verb) => {
                    return verb["Past-Participle"] == word;
                });
                if (check) {
                    res.push({
                        sentence: text,
                        index,
                        word,
                    });
                }
            });
        });
        return res;
    }
    presentPrefect(data) {
        const sentences = this.findAux(data);
        if (!sentences.length) {
            return;
        }
        const irregulars = this.findIrregularverbs(sentences);
        const regulars = this.findRegularVerbs(sentences);
        function findBykey(data, key) {
            const res = data.map((element) => {
                if (key == "sentence") {
                    return element[key].reduce((prev, current) => `${prev}  ${current}`);
                }
                return element[key];
            });
            return res;
        }
        let regularVerbs = findBykey(regulars, "word");
        let irregularVebs = findBykey(irregulars, "word");
        return {
            regularVerbs: regularVerbs,
            regularVerbsSentences: findBykey(regulars, "sentence"),
            totalregular: regularVerbs === null || regularVerbs === void 0 ? void 0 : regularVerbs.length,
            irregularVebs: irregularVebs,
            irregularVerbsSentence: findBykey(irregulars, "sentence"),
            totalIregular: irregularVebs === null || irregularVebs === void 0 ? void 0 : irregularVebs.length,
            fulllist: [...regularVerbs, ...irregularVebs],
            total: (regularVerbs === null || regularVerbs === void 0 ? void 0 : regularVerbs.length) + (irregularVebs === null || irregularVebs === void 0 ? void 0 : irregularVebs.length),
        };
    }
}
exports.default = new PresentPerfect();
