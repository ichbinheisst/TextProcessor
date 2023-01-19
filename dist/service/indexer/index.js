"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Glossary = /** @class */ (function () {
    function Glossary() {
        this.glossary = [
            {
                level: "a1",
                content: [
                    { name: "personal pronouns", id: 1 },
                    { name: "objective pronouns", id: 2 },
                    { name: "adjective possessive pronouns", id: 3 },
                    { name: "to be", id: 4 },
                    { name: "can", id: 5 },
                    { name: "preposition of place", id: 6 },
                    { name: "preposition of time", id: 7 },
                    { name: "adverbs of frequency", id: 8 },
                ],
                tenses: [
                    "simple present",
                    "present continous",
                    "simple past",
                    "future-will",
                ],
                vocabulary: [
                    "weather"
                ]
            }
        ];
        this.params = [
            {
                data: ["I", "you", "she", "he", "it", "their", "we"],
                type: "subject pronouns",
                level: "a1",
                id: 1
            },
            {
                data: ["me", "you", "her", "him", "it", "them", "us"],
                type: "objective pronouns",
                level: "a1",
                id: 2
            },
            {
                data: ["mine", "yours", "his", "hers", "its", "ours", "theirs"],
                type: "possessive pronouns",
                level: "a1",
                id: 20,
            },
            {
                data: ["my", "your", "his", "her", "their", "its", "our"],
                type: "possessive adjective",
                level: "a1",
                id: 3
            },
            {
                data: ["in", "on", "at", "next to", "under", "into", "above", "behind", "over", "bellow", "underneath", "in front of"],
                type: "preposition of place",
                level: "a1",
                id: 6,
            },
            {
                data: ["is", "am", "are", "I'm", "you're", "she's", "he's", "it's", "they're", "we're", "isn't", "aren't", "be"],
                type: "verb to be present",
                level: "a1",
                id: 4,
            },
            {
                data: ["can", "cannot", "can't"],
                type: "can",
                level: "a1",
                id: 5
            },
            {
                data: ["in", "on", "at", "within"],
                type: "preposition of time",
                level: "a1",
                id: 7
            },
            {
                data: [
                    "never",
                    "every hour",
                    "constantly",
                    "Daily",
                    "Yearly",
                    "Occasionally",
                    "rarely",
                    "hardly ever",
                    "selDom",
                    "everyday",
                    "ever",
                    "frenquently",
                    "generally",
                    "fegularly",
                    "usually",
                    "scarcely",
                    "always",
                    "often",
                    "eventually",
                    "hourly",
                    "monthly",
                    "sometimes",
                    "normaly",
                    "now and then"
                ],
                type: "adverbs of frequency",
                level: "a1 to  b1",
                id: 8
            },
        ];
    }
    Glossary.prototype.getParamsbyId = function (id) {
        var res = this.params.find(function (param) {
            return param.id == id;
        });
        if (!res) {
            return {
                data: [],
                type: "",
                level: "",
                id: id
            };
        }
        return res;
    };
    Glossary.prototype.getGlossary = function () {
        return this.glossary;
    };
    Glossary.prototype.getByLevelGlossary = function (level) {
        var res = this.glossary.find(function (param) {
            return param.level == level;
        });
        if (!res) {
            throw new Error("param not found");
        }
        return res;
    };
    Glossary.prototype.getParams = function () {
        return this.params;
    };
    Glossary.prototype.getParamasByname = function (name) {
        var res = this.params.find(function (param) {
            return param.type == name;
        });
        if (!res) {
            return {
                data: [],
                type: "",
                level: "",
                id: name
            };
        }
        return res;
    };
    return Glossary;
}());
exports.default = Glossary;
