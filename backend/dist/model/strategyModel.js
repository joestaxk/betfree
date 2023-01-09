"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategyModel = void 0;
const { Schema, Model } = require('../database');
let strategySchema = new Schema({
    team_id: String,
    strategy: String
});
let strategyModel = Model('teamStrategy', strategySchema);
exports.strategyModel = strategyModel;
