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
var main_1 = __importDefault(require("../dataProcessor/main"));
var indexer_1 = __importDefault(require("../indexer"));
var simpleFuture_1 = __importDefault(require("../dataProcessor/tenses/simpleFuture"));
var simplePresent_1 = __importDefault(require("../dataProcessor/tenses/simplePresent"));
var simplePastContinous_1 = __importDefault(require("../dataProcessor/tenses/simplePastContinous"));
var simpleContinous_1 = __importDefault(require("../dataProcessor/tenses/simpleContinous"));
var simplePast_1 = __importDefault(require("../dataProcessor/tenses/simplePast"));
var firstConditional_1 = __importDefault(require("../dataProcessor/conditional/firstConditional"));
var secondConditional_1 = __importDefault(require("../dataProcessor/conditional/secondConditional"));
var Score = /** @class */ (function (_super) {
    __extends(Score, _super);
    function Score() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Score.prototype.calculatePorcentage = function (total, concluded) {
        if (!total || !concluded) {
            return 0;
        }
        var n1 = concluded * 10;
        return Math.round((n1 / total) * 10);
    };
    Score.prototype.FilterTenses = function (data, tense) {
        var response = tense.map(function (element) {
            var res;
            switch (element) {
                case "simple present":
                    res = new simplePresent_1.default().Index(data);
                    break;
                case "simple past":
                    res = new simplePast_1.default().Index(data);
                    break;
                case "future-will":
                    res = new simpleFuture_1.default().Index(data);
                    break;
                case "present continous":
                    res = new simpleContinous_1.default().Index(data);
                    break;
                case "past continuous":
                    res = new simplePastContinous_1.default().Index(data);
                    break;
                case "first condition":
                    res = new firstConditional_1.default().Index(data);
                    break;
                case "second condition":
                    res = new secondConditional_1.default().Index(data);
            }
            res.subject = element;
            return res;
        });
        return response;
    };
    Score.prototype.JoinResponses = function (text) {
        var _this = this;
        var txt = this.Prepare(text);
        var response = [];
        var glos = new indexer_1.default();
        glos.getGlossary().forEach(function (param) {
            var responseTenses = _this.FilterTenses(txt, param.tenses);
            responseTenses.forEach(function (rs) { return response.push(rs); });
            param.content.forEach(function (par) {
                var params = glos.getParamsbyId(par.id);
                var responseParams = _this.findByParams(txt, params.data);
                responseParams.subject = par.name;
                response.push(responseParams);
            });
        });
        return response;
    };
    Score.prototype.score = function (text) {
        var _this = this;
        var fullLength = this.Prepare(text).length;
        var res = this.JoinResponses(text);
        res.forEach(function (items) {
            var value = items.sentences.length;
            var porcentage = _this.calculatePorcentage(fullLength, value);
            console.table("subject: ".concat(items.subject, " possui ").concat(items.numberOfTargetWords, " \n            palavras do assunto em texto de ").concat(fullLength, " linhas, sendo ").concat(items.sentences.length, " com conte\u00FAdo, \n            ou ").concat(porcentage, "% de aproveitamento"));
        });
    };
    return Score;
}(main_1.default));
exports.default = Score;
