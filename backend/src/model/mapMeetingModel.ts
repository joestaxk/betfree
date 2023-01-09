

const {Schema, Model} = require('../database')

let SchemaType = new Schema({
    
})

let mapSchema:Record<string, Record<string, number>> = new Schema({
    mapmeeting: Schema.Types.Mixed
})

let  mapModel = Model('mapmeeting', mapSchema)



export {mapModel}