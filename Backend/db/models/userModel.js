const mongo = require('mongoose')

const userSchema = mongo.Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true
    },
    name:{
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
    displayPicture:{
        type:String,
        require:true
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

module.exports = mongo.model('User',userSchema);