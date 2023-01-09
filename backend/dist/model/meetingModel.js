"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetingModel = void 0;
const { Schema, Model } = require('../database');
let meetingSchema = new Schema({
    currentgame: String,
    league: Number,
    week: Number,
});
let meetingModel = Model('meeting', meetingSchema);
exports.meetingModel = meetingModel;
