"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeStampModel = void 0;
const { Schema, Model } = require('../database');
let timeStampSchema = new Schema({
    five_mins_timestamp: Number,
    is5minsRunning: {
        type: Boolean,
        default: false
    },
    nintysecond_timestamp: Number
});
let timeStampModel = Model('timestamp', timeStampSchema);
exports.timeStampModel = timeStampModel;
