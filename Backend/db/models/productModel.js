const mongo = require('mongoose')

const product = mongo.Schema({
    seller_id:{
        type:String,
        required:true,
    },
    item:{
        type:String,
        required:true,
    },
    region:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    qunatity:{
        type:Number,
        required:true,
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