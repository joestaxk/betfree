export{}
// Depndencies
const express = require('express');
import { Request, Response } from "express";
import { IntiateWeekController } from "./controller/initiateWeekController";
const config = require('./config/config')
const http    = require('http');
const helmet = require('helmet')
const cors = require('cors')
import SocketController from "./controller/socketController";
import { SelectionModel } from "./services/algo.services/selectionAlgoService";
const routes = require('./router/v1')

const app = express();
const server = http.createServer(app);
// Socket init
const { Server } = require("socket.io");


export const socketIO = new Server(server, {
    cors: {
        origin: config.CLIENT_PORT
    }
})


// secure HTTP using helment
app.use(helmet())

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: config.VALID_CORS.split(',')[0],
    methods: ['GET','PUT','POST','DELETE'],
    allowHeaders: ['Content-Type','Authorization', 'x-access-token'],
    maxAge: 3600,
    preflightContinue: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// server public file
app.use(express.static(__dirname + '/public'));

export function initialize() {
    // start and check teams
    // newLeagueController.init();
    console.log('initialize....');
    // once that is done
    (new IntiateWeekController).preSaveGames();
    
    // create socket connection
    SocketController.init();
}

// app port
const port = config.PORT

app.get('/', (req:Request, res: Response) => {
    res.send('Betfree')
})

// create route
app.use('/v1', routes)

module.exports = {port, server, initialize}