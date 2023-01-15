"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const irregularVerbs_1 = __importDefault(require("../../../dictionary/irregularVerbs"));
const prepare_1 = require("../../../prepare");
//const filterbyParams = require("../../filterbyparams");
const searchByParams_1 = __importDefault(require("../../../searchByParams"));
function simplePastRegularVerbs(data) {
    let format = (0, prepare_1.Prepare)(data);
    if (!format || !format.length) {
        return [];
    }
    let listofRegularVerbs = [];
    let sentences = [];
    format.forEach((sentence) => {
        sentence.text.forEach((word) => {
            const letters = word.split("");
            if (letters[letters.length - 1] == "d" &&
                letters[letters.length - 2] == "e") {
                sentences.push(sentence.text.reduce((prev, curr) => prev + " " + curr));
                listofRegularVerbs.push(letters.reduce((prev, curr) => prev + curr));
            }
        });
    });
    let listofRegularVerbsFiltered = listofRegularVerbs.filter((element) => {
        return element != "need";
    });
    return {
        targetWords: listofRegularVerbsFiltered,
        numberOfTargetWords: listofRegularVerbs.length,
        sentences,
    };
}
function simplePastIrregular(data) {
    const verbs = irregularVerbs_1.default.map((verb) => {
        return verb["Past-simple"];
    });
    const res = (0, searchByParams_1.default)(data, verbs);
    return res;
}
class Past {
    simplePastIrregular(data) {
        const verbs = irregularVerbs_1.default.map((verb) => {
            return verb["Past-simple"];
        });
        const res = (0, searchByParams_1.default)(data, verbs);
        return res;
    }
    simplePastRegularVerbs(data) {
        let format = (0, prepare_1.Prepare)(data);
        if (!format || !format.length) {
            return {
                targetWords: [],
                numberOfTargetWords: 0,
                sentences: [],
            };
        }
        let listofRegularVerbs = [];
        let sentences = [];
        format.forEach((sentence) => {
            sentence.text.forEach((word) => {
                const letters = word.split("");
                if (letters[letters.length - 1] == "d" &&
                    letters[letters.length - 2] == "e") {
                    sentences.push(sentence.text.reduce((prev, curr) => prev + " " + curr));
                    listofRegularVerbs.push(letters.reduce((prev, curr) => prev + curr));
                }
            });
        });
        let listofRegularVerbsFiltered = listofRegularVerbs.filter((element) => {
            return element != "need";
        });
        return {
            targetWords: listofRegularVerbsFiltered,
            numberOfTargetWords: listofRegularVerbs.length,
            sentences,
        };
    }
    simplePastFULL(data) {
        const irregulars = this.simplePastIrregular(data);
        const regulars = this.simplePastRegularVerbs(data);
        return {
            regularVerbs: regulars.targetWords,
            totalregular: regulars.numberOfTargetWords,
            regularVerbsSentences: regulars.sentences,
            irregularVebs: irregulars.targetWords,
            totalIregular: irregulars.numberOfTargetWords,
            irregularVerbsSentences: irregulars.sentences,
            fulllist: [...regulars.targetWords, ...irregulars.targetWords],
            total: regulars.numberOfTargetWords + irregulars.numberOfTargetWords,
            sentences: [...regulars.sentences, irregulars.sentences],
        };
    }
}
exports.default = new Past();
