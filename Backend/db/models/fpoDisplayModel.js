const mongo = require('mongoose')

const fpoDisplaySchema = mongo.Schema({

    fpo_name:{
        type:String,
        required:true,
        minlength:3
    },
    phone:
    {
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    emaile:
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
    crop:{
        type:String,
        required:true,
        minlength:1 
    },
    description:{
        type:String,
        required:true,
        minlength:1 
    },
    pincode:{
        type:String,
        required:true,
        minlength:1 
    }
})


module.exports = mongo.model('FpoDisplay',fpoDisplaySchema);