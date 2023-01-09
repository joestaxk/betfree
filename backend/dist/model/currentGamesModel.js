"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentGameModel = void 0;
const { Schema, Model } = require('../database');
let currentgameSchema = new Schema({
    currentgame: String,
    league: Number,
    week: Number,
});
let currentGameModel = Model('currentgame', currentgameSchema);
exports.currentGameModel = currentGameModel;
