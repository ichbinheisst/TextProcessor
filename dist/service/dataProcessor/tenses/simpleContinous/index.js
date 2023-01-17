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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __importDefault(require("../../main"));
var SimplePresentContinous = /** @class */ (function (_super) {
    __extends(SimplePresentContinous, _super);
    function SimplePresentContinous() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tobe = ["is", "am", "are", "I'm", "you're", "she's", "he's", "it's", "they're", "we're", "isn't", "aren't", "be"];
        return _this;
    }
    SimplePresentContinous.prototype.findSentencesverbTobe = function (data) {
        var res = this.findByParams(data, this.tobe);
        return res;
    };
    SimplePresentContinous.prototype.findSentencesWithING = function (data) {
        var sentences = data.sentences;
        var targetWords = [];
        var MatchedSentences = [];
        sentences.forEach(function (sentence, index) {
            sentence.split(" ").forEach(function (word) {
                var letters = word.split("");
                if (letters.length > 3) {
                    if (word.includes("ing")) {
                        targetWords.push(word);
                        MatchedSentences.push(sentence);
                    }
                }
            });
        });
        if (MatchedSentences.length) {
            var sentencesInUse = MatchedSentences.reduce(function (prev, current) { return "".concat(prev, "\n ").concat(current, " "); });
            var prepared = this.Prepare(sentencesInUse);
            var stc = this.findSentencesverbTobe(prepared).targetWords;
            for (var index = 0; index < stc.length; index++) {
                var element = stc[index];
                targetWords.push(element);
            }
        }
        return {
            targetWords: targetWords,
            sentences: MatchedSentences,
            numberOfTargetWords: targetWords.length
        };
    };
    SimplePresentContinous.prototype.Index = function (data) {
        var sentencesVerbTobe = this.findSentencesverbTobe(data);
        var PresentContinous = this.findSentencesWithING(sentencesVerbTobe);
        return PresentContinous;
    };
    return SimplePresentContinous;
}(main_1.default));
exports.default = SimplePresentContinous;
