const mongo = require('mongoose')

const fpoSchema = mongo.Schema({

    fpo_name:{
        type:String,
        required:true,
        minlength:3
    },
    registration:{
        type:String,
        required:true,
        minlength:10
    },
    phone:
    {
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    leader_name:{
        type:String,
        required:true,
        minlength:3
    },
    total_land:{
        type:String,
        required:true,
        minlength:1 
    },
    annual_turnover:{
        type:String,
        required:true,
        minlength:1 
    },
    farmer_count:{
        type:String,
        required:true,
        minlength:1 
    },
    region:{
        type:String,
        required:true,
        minlength:1 
    },
    pincode:{
        type:String,
        required:true,
        minlength:1 
    },
    password:{
        type:String,
        required:true,
        minlength:8 
    },
    session:[],
    active:{
        type:Boolean,
        required:true,
    }
})


module.exports = mongo.model('FpoUser',fpoSchema);