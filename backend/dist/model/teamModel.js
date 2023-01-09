"use strict";
// import { premierLeague } from "../utilities/team.utilities";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamModel = void 0;
const { Schema, Model } = require('../database');
let Teambuild = new Schema({
    team_name: String,
    code_name: String,
    skill_point: Number,
    lose: Number,
    draw: Number,
    win: Number,
    odds: Number,
    score_graph: String,
    strength: Number,
});
let teamSchema = new Schema({
    teamEpl: [Teambuild],
});
let teamModel = Model('Team', teamSchema);
exports.teamModel = teamModel;
