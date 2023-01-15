"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treatData = exports.formatData = exports.Prepare = void 0;
function treatData(text) {
    var Text = text === null || text === void 0 ? void 0 : text.split("").map(function (letters) {
        if (letters == "\n") {
            return ".";
        }
        return letters;
    }).reduce(function (prev, current) {
        return prev + current;
    });
    return Text;
}
exports.treatData = treatData;
function formatData(data) {
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
}
exports.formatData = formatData;
function Prepare(text) {
    var cleanedData = treatData(text);
    var splited = formatData(cleanedData);
    return splited;
}
exports.Prepare = Prepare;
