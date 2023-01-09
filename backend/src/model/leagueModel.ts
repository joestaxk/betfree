const {Schema, Model} = require('../database')

type currentevent = 'analysis'|'live'|'finished'
interface leagueInterface {
    league: Number,
    week: Number,
    lastweek: Number,
    currentevent: currentevent
}


let leagueSchema:leagueInterface = new Schema({
    league: Number,
    week: Number,
    lastweek: Number,
    currentevent: String
})

let leagueModel = Model('League', leagueSchema)

export {leagueModel, leagueInterface, currentevent};