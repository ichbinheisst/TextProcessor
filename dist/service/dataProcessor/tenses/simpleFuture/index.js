"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FutureSimple = void 0;
var searchByParams_1 = __importDefault(require("../../searchByParams"));
function FutureSimple(data) {
    var paramSfuture = [
        "will",
        "won't",
        "it'll",
        "she'll",
        "he'll",
        "'ll",
        "I'll",
        "we'll",
        "they'll",
        "you'll"
    ];
    var res = (0, searchByParams_1.default)(data, paramSfuture);
    return res;
}
exports.FutureSimple = FutureSimple;
