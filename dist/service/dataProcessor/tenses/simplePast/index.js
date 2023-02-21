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
var irregularVerbs_1 = require("../../dictionary/irregularVerbs");
var presentPerfect_1 = __importDefault(require("../presentPerfect"));
var pastPerfect_1 = __importDefault(require("../pastPerfect"));
var main_1 = __importDefault(require("../../main"));
var SimplePast = /** @class */ (function (_super) {
    __extends(SimplePast, _super);
    function SimplePast() {
        var _this = _super.call(this) || this;
        _this.formatVerbs = [];
        _this.formatVerbs = irregularVerbs_1.irregularVerb.map(function (verb) {
            return verb["Past-simple"];
        });
        return _this;
    }
    SimplePast.prototype.getRidOfPerfect = function (data) {
        var PresentP = new presentPerfect_1.default().Index(data);
        var PastP = new pastPerfect_1.default().Index(data);
        var perfectsTenseSentences = __spreadArray(__spreadArray([], PastP.sentences, true), PresentP.sentences, true);
        var response = [];
        data.forEach(function (element) {
            var sentence = element.text.join(" ").trim();
            if (perfectsTenseSentences.some(function (stc) { return stc != sentence; }) && sentence.length > 0) {
                response.push({ text: sentence.split(" ") });
            }
        });
        return response;
    };
    SimplePast.prototype.indexIrregularVerbs = function (data) {
        var senteces = this.findByParams(data, this.formatVerbs);
        return senteces;
    };
    SimplePast.prototype.indexRegularVerbs = function (data) {
        var Sentences = [];
        var targetWords = [];
        data.forEach(function (sentences) {
            sentences.text.forEach(function (word) {
                if (word.includes("ed")) {
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
    };
    SimplePast.prototype.Index = function (data) {
        var IrregularVerbs = this.indexIrregularVerbs(data);
        var regularVerbs = this.indexRegularVerbs(data);
        var response = {
            targetWords: __spreadArray(__spreadArray([], IrregularVerbs.targetWords, true), regularVerbs.targetWords, true),
            sentences: __spreadArray(__spreadArray([], IrregularVerbs.sentences, true), IrregularVerbs.sentences, true),
            numberOfTargetWords: IrregularVerbs.numberOfTargetWords + IrregularVerbs.numberOfTargetWords
        };
        return response;
    };
    return SimplePast;
}(main_1.default));
exports.default = SimplePast;
