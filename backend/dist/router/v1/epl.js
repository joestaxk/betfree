"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EplRoute = void 0;
// import { initialize } from "../../app";
class EplRoute {
    static createNextEvent(req, res) {
        if (req.method.toLowerCase() === 'get') {
            // starting engine
            // -check timer
            // -check weeks and league
            // initialize()
            res.send('Everything fires up and running...');
        }
    }
}
exports.EplRoute = EplRoute;
