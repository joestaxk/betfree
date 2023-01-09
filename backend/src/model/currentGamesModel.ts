import mongoose from "mongoose"
import { leagueInterface } from "./leagueModel"

const {Schema, Model} = require('../database')

interface currentGameInterface extends leagueInterface {
    id: string,
    currentgame: string,    
}

let currentgameSchema = new Schema({
    currentgame: String,
    league: Number,
    week: Number,
})


let  currentGameModel:mongoose.Document|mongoose.Models|any =  Model('currentgame', currentgameSchema)



export {currentGameModel, currentGameInterface}