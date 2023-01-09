// import { premierLeague } from "../utilities/team.utilities";

import mongoose, { model, models, Mongoose } from "mongoose"

const {Schema, Model} = require('../database')


type teamType = {
    id: string,
    team_name: string,
    code_name: string,
    skill_point: number,
    lose?: number,
    draw?: number,
    win?: number,
    odds?: number,
    score_graph?: string,
    strength?:number,
}

let Teambuild:teamType = new Schema({
    team_name: String,
    code_name: String,
    skill_point: Number,
    lose: Number,
    draw: Number,
    win: Number,
    odds: Number,
    score_graph: String,
    strength:Number,
})

let teamSchema:mongoose.Schema = new Schema({
    teamEpl: [Teambuild],
})

let teamModel = Model('Team', teamSchema)

export {teamModel, teamType};

