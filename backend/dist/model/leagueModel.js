"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leagueModel = void 0;
const { Schema, Model } = require('../database');
let leagueSchema = new Schema({
    league: Number,
    week: Number,
    lastweek: Number,
    currentevent: String
});
let leagueModel = Model('League', leagueSchema);
exports.leagueModel = leagueModel;
