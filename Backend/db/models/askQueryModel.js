const mongo = require('mongoose')

const aqLink = mongo.Schema({
    ques :{
        type:String,
        required:true
    }
})

module.exports = mongo.model('aqLink',aqLink);
