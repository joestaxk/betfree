"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countdown = void 0;
let minute = 4;
let seconds = 59;
let milliseconds = 59;
let switchPoint = 0;
let restartsecCount = 59;
function countdown(stopcountdown = 4, cb) {
    milliseconds--;
    if (milliseconds === switchPoint && seconds !== switchPoint) {
        seconds--;
        milliseconds = restartsecCount;
    }
    else if (milliseconds === switchPoint && seconds === switchPoint) {
        minute--;
        seconds = restartsecCount;
        milliseconds = restartsecCount;
    }
    else if (minute === switchPoint && seconds === switchPoint) {
        minute = stopcountdown;
        seconds = restartsecCount;
        milliseconds = restartsecCount;
    }
    cb(formatToTime(minute), formatToTime(seconds));
}
exports.countdown = countdown;
function formatToTime(n) {
    return n < 10 ? `0${n}` : n.toString();
}
