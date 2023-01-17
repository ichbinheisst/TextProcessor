"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base = /** @class */ (function () {
    function Base() {
    }
    /*    calculatePorcentage(total: number, concluded: number) {
            if (!total || !concluded) {
                return 0;
            }
            let n1 = concluded * 10;
            return Math.round((n1 / total) * 10);
        }
    
    */
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
    Base.prototype.generateUniqueArrayFromArraysOfString = function (data, uniqueArray) {
        data.forEach(function (element) {
            var checkUnique = uniqueArray.some(function (el) { return el.trim().toLowerCase() == element.trim().toLocaleLowerCase(); });
            if (checkUnique) {
                uniqueArray.push(element);
            }
        });
    };
    Base.prototype.findByParams = function (data, params) {
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
    };
    return Base;
}());
exports.default = Base;
