export{}
const mongoose = require('mongoose');
let config = require('../config/config');

(async function(){
    mongoose.connect(`mongodb://${config.MONGODB_PORT}/${config.MONGODB_NAME}`, {useNewUrlParser: true})
    try {
        console.log('>>> Db connected successfully');
    }catch(e) {
        console.error(e)
    }
})()
    
module.exports = {Schema: mongoose.Schema, Model: mongoose.model};