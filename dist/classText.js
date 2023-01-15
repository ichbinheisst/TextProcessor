"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base = /** @class */ (function () {
    function Base() {
    }
    Base.prototype.calculatePorcentage = function (total, concluded) {
        if (!total || !concluded) {
            return 0;
        }
        var n1 = concluded * 10;
        return Math.round((n1 / total) * 10);
    };
    Base.prototype.treatData = function (text) {
        var Text = text === null || text === void 0 ? void 0 : text.split("").map(function (letters) {
            if (letters == "\n") {
                return ".";
            }
            return letters;
        }).reduce(function (prev, current) {
            return prev + current;
        });
        return Text;
    };
    Base.prototype.formatData = function (data) {
        var arrayofText = data
            .split(".")
            .map(function (txt) {
            if (txt && txt != " ") {
                return {
                    text: txt.split(" "),
                };
            }
        })
            .filter(function (script) {
            return script != undefined && script != " ";
        });
        var ready = arrayofText.map(function (sentence) {
            var clear = sentence.text.filter(function (word) {
                return word !== "";
            });
            return {
                text: clear,
            };
        });
        return ready;
    };
    Base.prototype.Prepare = function (text) {
        var cleanedData = this.treatData(text);
        var splited = this.formatData(cleanedData);
        return splited;
    };
    Base.prototype.finByParams = function (data, params) {
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
    };
    Base.prototype.score = function (data, params) {
        var length = data.length;
        var filtered = this.finByParams(data, params);
        var numberOfTargetWords = filtered.numberOfTargetWords;
        var porcentage = this.calculatePorcentage(length, numberOfTargetWords);
        var NoRepeat = [];
        filtered.targetWords;
        for (var index = 0; index < filtered.targetWords.length; index++) {
            var checkRepeated = NoRepeat.some(function (word) { return word; });
            if (!checkRepeated) {
                NoRepeat.push(filtered.targetWords[index]);
            }
        }
        var uniquePorcentage = this.calculatePorcentage(length, NoRepeat.length);
        var res = {
            bruto: porcentage,
            unique: uniquePorcentage
        };
        return res;
    };
    return Base;
}());
exports.default = Base;
