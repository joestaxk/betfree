"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const countdown_utilities_1 = require("../utilities/countdown.utilities");
class SocketController {
    static countdown_socket(socketFn) {
        (0, countdown_utilities_1.countdown)(4, socketFn);
    }
    static init() {
        app_1.socketIO.on('connection', (socket) => {
            console.log(`⚡: ${socket.id} user just connected!`);
            setInterval(() => {
                SocketController.countdown_socket(function (minute, seconds) {
                    socket.emit('running_countdown', `${minute}:${seconds}`);
                });
            }, SocketController.speed);
            socket.on('disconnect', () => {
                console.log('🔥: A user disconnected');
            });
        });
    }
}
exports.default = SocketController;
SocketController.speed = 50;
