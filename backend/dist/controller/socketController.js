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
const app_1 = require("../app");
const crontask_services_1 = require("../services/crontask.services");
const initiateWeekController_1 = require("./initiateWeekController");
// import { EventEmitter } from 'node:events';
class SocketController {
    static init() {
        app_1.socketIO.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
            if (socket.id) {
                console.log(`⚡: ${socket.id} user just connected!`);
                //   first connection
                socket.emit('ready', true);
                socket.emit('warmup', false);
                // Send week, league and games
                let newController = new initiateWeekController_1.IntiateWeekController();
                let currentGameData = (yield newController.getCurrentMatches())[0];
                socket.emit('fixture', currentGameData === null || currentGameData === void 0 ? void 0 : currentGameData.currentgame);
                socket.emit('week', currentGameData === null || currentGameData === void 0 ? void 0 : currentGameData.week);
                socket.emit('league', currentGameData === null || currentGameData === void 0 ? void 0 : currentGameData.league);
                let getTableData = (yield newController.newTable());
                if (getTableData) {
                    socket.emit('table', getTableData);
                }
                // emit last game also
                let lastGameData = (yield newController.getLastMatches())[0];
                socket.emit('marquee', lastGameData);
                // Emit Timmers.. includes 90's time and 5mins timer.
                (0, crontask_services_1.t)(socket);
            }
            socket.on('disconnect', () => {
                console.log('🔥: A user disconnected');
            });
        }));
    }
}
exports.default = SocketController;
