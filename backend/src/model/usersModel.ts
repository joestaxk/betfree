import { Document } from "mongoose";

const {Schema, Model} = require('../database')

interface users {
    fullname: string;
    age: number;
    team: string
}



let userSchema:users = new Schema({
    fullname: String,
    age: Number,
    team: String,
})

let userModel:new(arg0: users) => Document = Model('User', userSchema)

export {userModel, users};