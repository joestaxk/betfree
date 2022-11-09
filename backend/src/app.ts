export{}
// Depndencies
let config = require('./config/config')
const http    = require('http');
const express = require('express');
const app = express();
const helmet = require('helmet')
const cors = require('cors')
import { Request, Response } from "express";
import SocketController from "./controller/socketController";
const server = http.createServer(app);

// Socket init
const { Server } = require("socket.io");

export const socketIO = new Server(server, {
    cors: {
        origin: config.CLIENT_PORT
    }
})

const corsOptions = {
    origin: config.VALID_CORS.split(','),
    methods: ['GET','PUT','POST','DELETE'],
    allowHeaders: ['Content-Type','Authorization', 'x-access-token'],
    maxAge: 3600,
    preflightContinue: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// secure HTTP using helment
app.use(helmet)

// create socket connection
SocketController.init()

// router file
const routes = require('./router/v1')


// app port
const port = config.PORT

app.get('/', (req:Request, res: Response) => {
    res.send('Access our API at /v1/*')
})

app.use('/v1', routes)

module.exports = {port, server}