"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePorcentage = exports.score = void 0;
var searchByParams_1 = __importDefault(require("../dataProcessor/searchByParams"));
function calculatePorcentage(total, concluded) {
    if (!total || !concluded) {
        return 0;
    }
    var n1 = concluded * 10;
    return Math.round((n1 / total) * 10);
}
exports.calculatePorcentage = calculatePorcentage;
function score(data, params) {
    var length = data.length;
    var filtered = (0, searchByParams_1.default)(data, params);
    var numberOfTargetWords = filtered.numberOfTargetWords;
    var porcentage = calculatePorcentage(length, numberOfTargetWords);
    var NoRepeat = [];
    filtered.targetWords;
    for (var index = 0; index < filtered.targetWords.length; index++) {
        var checkRepeated = NoRepeat.some(function (word) { return word; });
        if (!checkRepeated) {
            NoRepeat.push(filtered.targetWords[index]);
        }
    }
    var uniquePorcentage = calculatePorcentage(length, NoRepeat.length);
    var res = {
        bruto: porcentage,
        unique: uniquePorcentage
    };
    return res;
}
exports.score = score;
