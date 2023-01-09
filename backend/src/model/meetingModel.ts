import { leagueInterface } from "./leagueModel"

const {Schema, Model} = require('../database')

interface meetingInterface extends leagueInterface {
    id: string,
    currentgame: string,    
}

let meetingSchema:meetingInterface = new Schema({
    currentgame: String,
    league: Number,
    week: Number,
})

let  meetingModel = Model('meeting', meetingSchema)

export {meetingModel, meetingInterface}