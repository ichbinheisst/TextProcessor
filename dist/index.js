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

   GET  => OBTER
   POST => POSTAR
   PUT  => ATUALIZAR
   DELETE => DELETER

   MC


   MODEL  = DB
   const user = {
    name:"Erick",
    id:"123"
   }

   Controller
   recebe informacao => trata  => banco

   Router  =



    router => controler

    C
    R
    U
    D

*/ 
