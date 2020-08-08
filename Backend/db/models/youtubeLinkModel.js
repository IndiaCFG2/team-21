const mongo = require('mongoose')

const yLink = mongo.Schema({
    name :{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
})

module.exports = mongo.model('yLink',yLink);