"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIO = void 0;
// Depndencies
let config = require('./config/config');
const http = require('http');
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const socketController_1 = require("./controller/socketController");
const server = http.createServer(app);
// Socket init
const { Server } = require("socket.io");
exports.socketIO = new Server(server, {
    cors: {
        origin: config.CLIENT_PORT
    }
});
const corsOptions = {
    origin: config.VALID_CORS.split(','),
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
    maxAge: 3600,
    preflightContinue: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
// secure HTTP using helment
app.use(helmet);
// create socket connection
socketController_1.default.init();
// router file
const routes = require('./router/v1');
// app port
const port = config.PORT;
app.get('/', (req, res) => {
    res.send('Access our API at /v1/*');
});
app.use('/v1', routes);
module.exports = { port, server };
