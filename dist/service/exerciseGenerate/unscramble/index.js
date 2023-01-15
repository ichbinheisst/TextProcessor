"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFunellParams = exports.sample = exports.Create = void 0;
var sample_1 = __importDefault(require("../sample"));
exports.sample = sample_1.default;
var uuid_1 = require("uuid");
function createArraywithUniqueElements(data) {
    var uniqueArray = [];
    data.forEach(function (element) {
        var check = uniqueArray.some(function (el) { return (el === null || el === void 0 ? void 0 : el.text) == element.text; });
        if (!check) {
            uniqueArray.push(element);
        }
    });
    return uniqueArray;
}
function checkValibleSentence(data) {
    var valiableDataArray = [];
    data.forEach(function (element) {
        var text = element.text.split(" ");
        if (text.length > 4) {
            valiableDataArray.push(element);
        }
    });
    return valiableDataArray;
}
function createUnscramble(data) {
    var activities = data.map(function (element) {
        return __assign(__assign({}, element), { activity: {
                words: element.text.split(" ").sort().map(function (wrd) {
                    return {
                        wordId: (0, uuid_1.v4)(),
                        word: wrd
                    };
                }),
                answer: element.text.trim()
            } });
    });
    return activities;
}
function Create(data) {
    var unique = createArraywithUniqueElements(data);
    var valid = checkValibleSentence(unique);
    var activity = createUnscramble(valid);
    return activity;
}
exports.Create = Create;
function CreateFunellParams(data, params) {
    var paramedResponse = [];
    data.forEach(function (element, index) {
        element.text.split(" ").forEach(function (wrd) {
            var checkParam = params.some(function (param) { return param == wrd; });
            if (checkParam) {
                paramedResponse.push(element);
            }
        });
    });
    return paramedResponse;
}
exports.CreateFunellParams = CreateFunellParams;
