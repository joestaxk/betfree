

const {Schema, Model} = require('../database')


let strategySchema = new Schema({
    team_id: String,
    strategy: String
})

let  strategyModel = Model('teamStrategy', strategySchema)



export {strategyModel}