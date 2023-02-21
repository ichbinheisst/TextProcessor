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
Object.defineProperty(exports, "__esModule", { value: true });
var Base = /** @class */ (function () {
    function Base() {
    }
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
        var response = this.formatData(cleanedData);
        return response;
    };
    Base.prototype.generateUniqueArrayFromArraysOfString = function (data, uniqueArray) {
        data.forEach(function (element) {
            var checkUnique = uniqueArray.some(function (el) { return el.trim().toLowerCase() == element.trim().toLocaleLowerCase(); });
            if (checkUnique) {
                uniqueArray.push(element);
            }
        });
    };
    Base.prototype.findByParamsSingle = function (data, params) {
        var targetWords = [];
        var foundSentences = [];
        data.forEach(function (sentences) {
            sentences.text.forEach(function (word) {
                if (params.some(function (param) { return param == word; })) {
                    foundSentences.push(sentences.text.reduce(function (prev, cur) { return "".concat(prev, " ").concat(cur); }));
                    targetWords.push(word);
                }
            });
        });
        return {
            targetWords: targetWords,
            numberOfTargetWords: targetWords.length,
            sentences: foundSentences
        };
    };
    Base.prototype.findByParamsMulti = function (data, params) {
        var targetWords = [];
        var foundSentences = [];
        data.forEach(function (sentences) {
            var sentence = sentences.text.join(' ').toLocaleLowerCase();
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
    Base.prototype.findByParams = function (data, params) {
        var multi = [];
        var single = [];
        params.forEach(function (param) {
            if (param.split(" ").length != 1)
                return multi.push(param);
            single.push(param);
        });
        var resMulti = this.findByParamsMulti(data, multi);
        var resSingle = this.findByParamsSingle(data, single);
        return {
            targetWords: __spreadArray(__spreadArray([], resMulti.targetWords, true), resSingle.targetWords, true),
            numberOfTargetWords: resSingle.numberOfTargetWords + resMulti.numberOfTargetWords,
            sentences: __spreadArray(__spreadArray([], resMulti.sentences, true), resSingle.sentences, true)
        };
        //return resSingle
    };
    return Base;
}());
exports.default = Base;
