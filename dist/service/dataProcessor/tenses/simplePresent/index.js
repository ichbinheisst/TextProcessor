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
exports.PrepareTense = exports.TenseSCore = exports.FindSimplePresent = exports.FindSimplePresentThirdPerson = void 0;
var verbsMostUsed_1 = require("../../../../verbsMostUsed");
var searchByParams_1 = __importDefault(require("../../searchByParams"));
var wordtobeFiltered = [
    "will",
    "won't",
    "it'll",
    "she'll",
    "he'll",
    "'ll",
    "I'll",
    "we'll",
    "they'll",
];
function cloneAndQuery(letters, word, verbs, arraytoPushInto) {
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
}
function FindSimplePresentThirdPerson(data) {
    var targetWords = [];
    var sentences = [];
    data.forEach(function (sentence, indexSentence) {
        sentence.text.forEach(function (word, indexWord) {
            var letters = word.trim().split('');
            if (letters.length > 2 &&
                letters[letters.length - 1] == "s" &&
                letters[letters.length - 2] != "s") {
                var res = cloneAndQuery(letters, "s", verbsMostUsed_1.verbsMostCommonPresent, targetWords);
                if (res) {
                    sentences.push(sentence.text.reduce(function (prev, cur) { return "".concat(prev, " ").concat(cur); }));
                }
            }
            if (letters.length > 2 &&
                letters[letters.length - 1] == "s" &&
                letters[letters.length - 2] == "e") {
                var res = cloneAndQuery(letters, "es", verbsMostUsed_1.verbsMostCommonPresent, targetWords);
                if (res) {
                    sentences.push(sentence.text.reduce(function (prev, cur) { return "".concat(prev, " ").concat(cur); }));
                }
            }
            if (letters.length > 3 &&
                letters[letters.length - 2] == "e" &&
                letters[letters.length - 3] == "i" &&
                letters[letters.length - 1] == "s") {
                var res = cloneAndQuery(letters, "ies", verbsMostUsed_1.verbsMostCommonPresent, targetWords);
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
}
exports.FindSimplePresentThirdPerson = FindSimplePresentThirdPerson;
function FindSimplePresent(data) {
    var baseForm = (0, searchByParams_1.default)(data, verbsMostUsed_1.verbsMostCommonPresent);
    var thirdPerson = FindSimplePresentThirdPerson(data);
    return {
        targetWords: __spreadArray(__spreadArray([], baseForm.targetWords, true), thirdPerson.targetWords, true),
        sentences: __spreadArray(__spreadArray([], baseForm.sentences, true), thirdPerson.targetWords, true),
        numberOfTargetWords: baseForm.numberOfTargetWords + thirdPerson.numberOfTargetWords
    };
}
exports.FindSimplePresent = FindSimplePresent;
function TenseSCore(data) {
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
}
exports.TenseSCore = TenseSCore;
function PrepareTense(data, txt) {
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
}
exports.PrepareTense = PrepareTense;
