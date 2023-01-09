"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeStamp = exports.t = void 0;
const timestampModel_1 = require("../model/timestampModel");
const workers_1 = require("../workers");
const { isMainThread } = require('node:worker_threads');
let r;
function t(socket) {
    let interv = setInterval(() => __awaiter(this, void 0, void 0, function* () {
        switch (r) {
            default:
                socket.emit('timer', r);
                break;
            case 'stop':
                yield stop5minsRunning();
                // start new season and emit live
                clearInterval(interv);
                break;
            case 'warmup':
                // emit warmup
                socket.emit('redcode', true);
                socket.emit('warmup', true);
                let count = 4;
                let interval = setInterval(() => {
                    // start timer
                    if (count === 0) {
                        clearInterval(interval);
                    }
                    else {
                        socket.emit('warmingup', --count);
                    }
                }, 1000);
                break;
            case '90sec':
                socket.emit('90sec', 1);
                break;
            case 'slide':
                socket.emit('slide', 1);
                break;
        }
    }), 1000);
}
exports.t = t;
function TimeStamp() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isMainThread) {
            // use worker to establish large computation
            let getTimeStamp = Date.now();
            yield prepareNewTimestamp(getTimeStamp);
            yield (0, workers_1.Workers)(getTimeStamp, '/timeworker', cb);
            function cb(res) {
                return __awaiter(this, void 0, void 0, function* () {
                    r = res;
                });
            }
        }
    });
}
exports.default = TimeStamp;
function prepareNewTimestamp(getTimeStamp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // check if five_mins_stamp already exist
            const ifExist = yield timestampModel_1.timeStampModel.find({});
            if (!ifExist.length) {
                // save the time stamp!
                const Tstamp = new timestampModel_1.timeStampModel({
                    five_mins_timestamp: getTimeStamp,
                    is5minsRunning: true
                });
                yield Tstamp.save();
                return getTimeStamp;
            }
            const stampID = ifExist[0].id;
            if (ifExist[0].is5minsRunning && ifExist[0].five_mins_timestamp > getTimeStamp) {
                return ifExist[0].timestamp;
            }
            const keepTimeStampUpdated = yield timestampModel_1.timeStampModel.updateOne({ where: { id: stampID } }, { five_mins_timestamp: getTimeStamp, is5minsRunning: true });
            return getTimeStamp;
        }
        catch (error) {
            throw error;
        }
    });
}
function getTimeStamp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ifExist = yield timestampModel_1.timeStampModel.find({});
            if (ifExist.length)
                return ifExist[0];
        }
        catch (error) {
            throw error;
        }
    });
}
exports.getTimeStamp = getTimeStamp;
function stop5minsRunning() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ifExist = yield timestampModel_1.timeStampModel.find({});
            if (ifExist[0].length) {
                const keepTimeStampUpdated = yield timestampModel_1.timeStampModel.updateOne({ where: { id: ifExist[0].id } }, { is5minsRunning: false });
            }
        }
        catch (E) {
            console.error(E);
        }
    });
}
