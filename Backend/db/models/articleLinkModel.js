const mongo = require('mongoose')

const aLink = mongo.Schema({
    name :{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    imagelink:{
      type:String,
      required:true
    }
})

module.exports = mongo.model('aLink',aLink);
