"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var indexer_1 = __importDefault(require("./service/indexer"));
var text = "I'm tired of being what you want me to be\n  Feeling so faithless, lost under the surface\n  Don't know what you're expecting of me\n  Put under the pressure of walking in your shoes\n  Every step that I take is another mistake to you\n  (Caught in the undertow, just caught in the undertow)\n  I've become so numb\n  I can't feel you there\n  Become so tired\n  So much more aware\n  I'm becoming this\n  All I want to do\n  Is be more like me\n  And be less like you\n  works like that \n  she watches tv \n  he goes to the park\n  he studies a lot  \n\n  ";
var glossary = new indexer_1.default();
var x = glossary.getByLevelGlossary("a1");
console.log(x);
