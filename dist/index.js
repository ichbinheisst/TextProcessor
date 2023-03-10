"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var port = process.env.PORT ? process.env.PORT : 4333;
app_1.default.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:".concat(port));
});
/*

import SimplePast from "./service/dataProcessor/tenses/simplePast";
import { IPrepare } from "./interfaces";
import GenerateDialogue from "./service/formatSubtitle/dialogue";
import Score from "./service/score";

const past = new SimplePast()

const text = ` Tamara: Hi, Mario. Do you want to go and watch a film?

Mario: Hi, Tamara. Sure, what’s on?

Tamara: Well, there are two action films, Mr and Mrs Jones and War Games, and they’re both in 3D.

Mario: I’ve already seen Mr and Mrs Jones. I haven’t seen War Games, but I don’t really want to see an action film. What else is on?

Tamara: There’s that science fiction film, Robot 2075, but I’ve already seen it.

Mario: Is it good?

Tamara: Yes, it is, but I don’t want to see it again. There’s a romantic comedy called Forever.

Mario: Mmm, I’m not sure. Are there any horror films on?

Tamara: Yes, there’s Midnight Moon. It’s got vampires in it.

Mario: OK, sounds good. Let’s go and watch Midnight Moon. What time is it on?

Tamara: It’s on at 12 o’clock or at half past two.

Mario: Is it on this evening?

Tamara: Yes, at 7:30.

Mario: Perfect. Let’s go at 7:30.

Tamara: OK, shall we meet at the cinema at 7:00?

Mario: Great! See you later.

Tamara: Bye.`;

const score = new Score()


*/ 
