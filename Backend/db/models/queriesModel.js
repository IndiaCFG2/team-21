const mongo = require('mongoose')

const qLink = mongo.Schema({
    ques:{
        type:String,
        required:true
    },
    ans:{
        type:String,
        required:true
    }
})

module.exports = mongo.model('qLink',qLink);
