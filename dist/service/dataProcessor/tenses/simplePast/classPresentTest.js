"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var classText_1 = __importDefault(require("../../../../classText"));
var verbsMostUsed_1 = require("../../../../verbsMostUsed");
var PresentSimple = /** @class */ (function (_super) {
    __extends(PresentSimple, _super);
    function PresentSimple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PresentSimple.prototype.Index = function (data) {
        var baseForm = this.finByParams(data, verbsMostUsed_1.verbsMostCommonPresent);
        var thirdPerson = this.IndexSimplePresentThirdPerson(data);
        return {
            targetWords: __spreadArray(__spreadArray([], baseForm.targetWords, true), thirdPerson.targetWords, true),
            sentences: __spreadArray(__spreadArray([], baseForm.sentences, true), thirdPerson.targetWords, true),
            numberOfTargetWords: baseForm.numberOfTargetWords + thirdPerson.numberOfTargetWords
        };
    };
    PresentSimple.prototype.cloneAndQuery = function (letters, word, verbs, arraytoPushInto) {
        var clone = JSON.parse(JSON.stringify(letters));
        switch (word) {
            case "s":
                clone.pop();
                break;
            case "es":
                word.split('').forEach(function () { return clone.pop(); });
                break;
            case "ies":
                word.split('').forEach(function () { return clone.pop(); });
                clone.push("y");
                break;
        }
        var reshapedWord = clone.reduce(function (prev, current) {
            return prev + current;
        });
        var check = verbs.some(function (wrd) { return wrd == reshapedWord; });
        if (check) {
            arraytoPushInto.push(reshapedWord);
            return true;
        }
        return false;
    };
    PresentSimple.prototype.IndexSimplePresentThirdPerson = function (data) {
        var _this = this;
        var targetWords = [];
        var sentences = [];
        data.forEach(function (sentence, indexSentence) {
            sentence.text.forEach(function (word, indexWord) {
                var letters = word.trim().split('');
                if (letters.length > 2 &&
                    letters[letters.length - 1] == "s" &&
                    letters[letters.length - 2] != "s") {
                    var res = _this.cloneAndQuery(letters, "s", verbsMostUsed_1.verbsMostCommonPresent, targetWords);
                    if (res) {
                        sentences.push(sentence.text.reduce(function (prev, cur) { return "".concat(prev, " ").concat(cur); }));
                    }
                }
                if (letters.length > 2 &&
                    letters[letters.length - 1] == "s" &&
                    letters[letters.length - 2] == "e") {
                    var res = _this.cloneAndQuery(letters, "es", verbsMostUsed_1.verbsMostCommonPresent, targetWords);
                    if (res) {
                        sentences.push(sentence.text.reduce(function (prev, cur) { return "".concat(prev, " ").concat(cur); }));
                    }
                }
                if (letters.length > 3 &&
                    letters[letters.length - 2] == "e" &&
                    letters[letters.length - 3] == "i" &&
                    letters[letters.length - 1] == "s") {
                    var res = _this.cloneAndQuery(letters, "ies", verbsMostUsed_1.verbsMostCommonPresent, targetWords);
                    if (res) {
                        sentences.push(sentence.text.reduce(function (prev, cur) { return "".concat(prev, " ").concat(cur); }));
                    }
                }
            });
        });
        var response = {
            targetWords: targetWords,
            sentences: sentences,
            numberOfTargetWords: targetWords.length
        };
        return response;
    };
    PresentSimple.prototype.PrepareTense = function (data, txt) {
        var text = data.targetWords;
        var res = text.map(function (el, index) {
            return {
                text: Array.of(el)
            };
        });
        res.forEach(function (element) {
            txt.pop();
        });
        return __spreadArray(__spreadArray([], res, true), txt, true);
    };
    PresentSimple.prototype.TenseSCore = function (data) {
        var NotReapeated = [];
        var _loop_1 = function (index) {
            var word = data.targetWords[index];
            var checkWord = NotReapeated.some(function (wrd) { return wrd == word; });
            if (!checkWord) {
                NotReapeated.push(word);
            }
        };
        for (var index = 0; index < data.targetWords.length; index++) {
            _loop_1(index);
        }
        return {
            bruto: data.numberOfTargetWords,
            unique: NotReapeated.length
        };
    };
    return PresentSimple;
}(classText_1.default));
exports.default = PresentSimple;
