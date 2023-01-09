"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomPerfect = exports.RandomNumber = void 0;
function RandomNumber(numb) {
    return Math.floor(Math.random() * numb);
}
exports.RandomNumber = RandomNumber;
function RandomPerfect(numb) {
    let lastNum;
    let rand = RandomNumber(numb);
}
exports.RandomPerfect = RandomPerfect;
