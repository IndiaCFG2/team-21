const mongo = require('mongoose')

const query = mongo.Schema({
    question :{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    askedBy:{
        type:String,
        default:'admin'
    },
    status:{
        type:Boolean,
        required:true,
        default:false
    },
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

module.exports = mongo.model('query',query);