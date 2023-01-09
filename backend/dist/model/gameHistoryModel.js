"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyModel = void 0;
const { Schema, Model } = require('../database');
let historySchema = new Schema({
    lastgame: String,
    league: Number,
    week: Number,
});
let historyModel = Model('gameHistory', historySchema);
exports.historyModel = historyModel;
