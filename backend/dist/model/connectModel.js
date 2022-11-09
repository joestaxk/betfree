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
const mongoose = require('mongoose');
let config = require('../config/config');
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose.connect(`mongodb://${config.MONGODB_PORT}/${config.MONGODB_NAME}`, { useNewUrlParser: true });
        try {
            console.log('>>> Db connected successfully');
        }
        catch (e) {
            console.error(e);
        }
    });
})();
module.exports = { Schema: mongoose.Schema, Model: mongoose.model };
