const {Schema, Model} = require('../database');


let timeStampSchema = new Schema({
    five_mins_timestamp: Number,
    is5minsRunning: {
        type: Boolean,
        default: false
    },
    nintysecond_timestamp: Number
})

let timeStampModel = Model('timestamp', timeStampSchema)

export {timeStampModel};