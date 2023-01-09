"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapModel = void 0;
const { Schema, Model } = require('../database');
let SchemaType = new Schema({});
let mapSchema = new Schema({
    mapmeeting: Schema.Types.Mixed
});
let mapModel = Model('mapmeeting', mapSchema);
exports.mapModel = mapModel;
