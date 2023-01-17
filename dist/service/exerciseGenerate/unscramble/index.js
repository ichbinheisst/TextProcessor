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
var uuid_1 = require("uuid");
var main_1 = __importDefault(require("../main"));
var Unscramble = /** @class */ (function (_super) {
    __extends(Unscramble, _super);
    function Unscramble(lenght) {
        var _this = _super.call(this) || this;
        _this.validLenght = 4;
        if (!lenght) {
            return _this;
        }
        _this.validLenght = lenght;
        return _this;
    }
    Unscramble.prototype.create = function (data) {
        var unique = this.createArraywithUniqueElements(data);
        var valid = this.checkValidLengthSentence(unique, this.validLenght);
        var activities = valid.map(function (element) {
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
    };
    Unscramble.prototype.CreateFunellParams = function (data, params) {
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
    };
    return Unscramble;
}(main_1.default));
exports.default = Unscramble;
