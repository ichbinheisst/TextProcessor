"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const regularVerbs_1 = __importDefault(require("../../dictionary/regularVerbs"));
const irregularVerbs_1 = __importDefault(require("../../dictionary/irregularVerbs"));
const simplePast_1 = __importDefault(require("../../grammar/tenses/simplePast"));
const presentPerfect_1 = __importDefault(require("../../grammar/tenses/presentPerfect"));
class Params {
    constructor() {
        this.subjectPronouns = ["I", "you", "she", "he", "it", "their", "we"];
        this.objectivePronouns = ["me", "you", "her", "him", "it", "them", "us"];
        this.possessivePronouns = ["mine", "yours", "his", "hers", "its", "ours", "theirs"];
        this.possessiveAdjs = ["my", "your", "his", "her", "their", "its", "our"];
        this.short = ["’re", "’s", "’d", "’m", "’ve", "’", "’n"];
    }
    addShorts(word) {
        const subjectPronouns = [...word];
        let subj = [...subjectPronouns];
        for (let index = 0; index < this.short.length; index++) {
            const newOne = subjectPronouns === null || subjectPronouns === void 0 ? void 0 : subjectPronouns.map((wrd) => wrd + this.short[index]);
            subj = [...subj, ...newOne];
        }
        return subj;
    }
    selectParams(key, text) {
        switch (key) {
            case "subject pronouns":
                return this.addShorts(this.subjectPronouns);
            case "objective pronouns":
                return this.objectivePronouns;
            case "possessive pronouns":
                return this.possessivePronouns;
            case "possessive adjective":
                return this.possessiveAdjs;
            case "verbs-present":
                return this.getAllVerbs("present");
            case "verbs-past":
                return this.getAllVerbs("past");
            case "verbs-participle":
                return this.getAllVerbs("participle");
            default:
                return [];
        }
    }
    getAllVerbs(type) {
        if (!type) {
            return ["nothing"];
        }
        const IrregularVerbs = this.getIrregularVerbs(type);
        const RegularVerbs = this.getRegularVerbs(type);
        const response = [...IrregularVerbs, ...RegularVerbs];
        return response;
    }
    getIrregularVerbs(type) {
        const verbs = irregularVerbs_1.default.map((verb) => {
            return {
                present: verb.Base,
                past: verb["Past-simple"],
                participle: verb["Past-Participle"]
            };
        });
        const response = verbs.map((verb) => verb[type]).filter((v) => typeof v == "string");
        return response;
    }
    getRegularVerbs(type) {
        const verbs = regularVerbs_1.default.map((verb) => {
            return {
                present: verb.present,
                past: verb.past,
                participle: verb.past
            };
        });
        const response = verbs.map((verb) => verb[type]).filter((v) => typeof v == "string");
        return response;
    }
    selectTense(key, text) {
        switch (key) {
            case "simplePast-regular":
                return simplePast_1.default.simplePastRegularVerbs(text);
            case "simplePast-irregular":
                return simplePast_1.default.simplePastIrregular(text);
            case "simplePast":
                return simplePast_1.default.simplePastFULL(text);
            case "presentPerfect":
                return presentPerfect_1.default.presentPrefect(text);
            default:
                return [];
        }
    }
}
exports.default = new Params();
