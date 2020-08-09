const mongo = require('mongoose')

const offerSchema = mongo.Schema({
    product:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    avalability:{
        type:Date,
        required:true
    },
    fpo_id:{
        type:String,
        required:true
    },
    bidders : [],
    status:{
        type:Boolean,
        required:true
    }
    
})

module.exports = mongo.model('offer',offerSchema);