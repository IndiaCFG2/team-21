const mongo = require('mongoose')

const bidSchema = mongo.Schema({
    bidder_id : {
        type:String,
        required:true
    },
    amount_id :{
        type:Number,
        required:true
    },
    offer_id:{
        type:String,
        required:true
    }
})

module.exports = mongo.model('bid',bidSchema);