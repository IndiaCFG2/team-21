const mongo = require('mongoose')

const article = mongo.Schema({
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
    },
    photo:{
        type:String,
        required:true
    }
    ,
    yes:{
        type:Number,
        default:0
    },
    no:{
        type:Number,
        default:0
    },
    language:{
        type:String
    }
    
})

module.exports = mongo.model('article',article);