import { Request, Response } from "express";
// import { initialize } from "../../app";


export class EplRoute{

    static createNextEvent(req:Request,res:Response) {
        if(req.method.toLowerCase() === 'get') {
            // starting engine
            // -check timer
            // -check weeks and league
            // initialize()
            
            res.send('Everything fires up and running...')
        }
    }
}