"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const { Schema, Model } = require('../connectModel');
let userSchema = new Schema({
    fullname: String,
    age: Number,
    team: String,
});
let userModel = Model('User', userSchema);
exports.userModel = userModel;
