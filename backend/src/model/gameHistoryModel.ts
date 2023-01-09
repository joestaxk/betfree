import { leagueInterface } from "./leagueModel"

const {Schema, Model} = require('../database')

interface historyInterface extends leagueInterface {
    id: string,
    lastgame: string,    
}

let historySchema = new Schema({
    lastgame: String,
    league: Number,
    week: Number,
})

let  historyModel = Model('gameHistory', historySchema)



export {historyModel, historyInterface}