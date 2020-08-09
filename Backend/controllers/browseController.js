<<<<<<< HEAD
const ytlink = require('../db/models/youtubeLinkModel')
const article = require('../db/models/articleModel')
const query = require('../db/models/queryModel')
=======
const ylink = require('../db/models/youtubeLinkModel')
const alink = require('../db/models/articleLinkModel')
const qlink = require('../db/models/queriesModel')
const aqlink = require('../db/models/askQueryModel')
>>>>>>> db7605c31372d19963a78b718f6c6c660ec84330


module.exports.getYoutubeLinks = async(req,res)=>{
    ytlink.find({},(err,data)=>{
        if(err)
        {
            res.status(405).send({ success: false, message: 'err occured' })
        }
        else{
            res.status(200).send(data);
        }
    }).sort({ yes: 1 }).limit(10)
}

module.exports.rateYlink = async (req,res)=>{
if(req.body.rate==1){
    ytlink.findOne({ _id:req.body.id },{ $inc: { yes : 1 }},(err,date)=>{
    })
}
else
{
    ytlink.findOne({ _id:req.body.id },{ $inc: { no : 1 }},(err,date)=>{
    })
}
   
}


module.exports.getArticles = async(req,res)=>{

    article.find({},(err,data)=>{
        if(err)
        {
            res.status(405).send({ success: false, message: 'err occured' })
        }
        else{
            res.status(200).send(data);
        }
    }).sort({ _id: -1 }).limit(10)

}

module.exports.rateArticle = async (req,res)=>{
    if(req.body.rate==1){
        article.findOne({ _id:req.body.id },{ $inc: { yes : 1 }},(err,date)=>{
        })
    }
    else
    {
        article.findOne({ _id:req.body.id },{ $inc: { no : 1 }},(err,date)=>{
        })
    }
       
    }

module.exports.getQueries = async(req,res)=>{

    query.find({status:true},(err,data)=>{
        if(err)
        {
            res.status(405).send({ success: false, message: 'err occured' })
        }
        else{
            res.status(200).send(data);
        }
    }).sort({ helpful: 1 }).limit(10)

}

module.exports.ratequery = async (req,res)=>{
    if(req.body.rate==1){
        query.findOne({ _id:req.body.id },{ $inc: { yes : 1 }},(err,date)=>{
        })
    }
    else
    {
        query.findOne({ _id:req.body.id },{ $inc: { no : 1 }},(err,date)=>{
        })
    }
       
    }

module.exports.postQuery = async(req,res)=>{

    var query_ = new query({
        question:req.body.question,
        askedBy:'admin',
        answer:" "
    })

    console.log(query_)

    query_.save().then(
        data=>{
            console.log(data)
            res.status(200).send(data);
        }
    )
    .catch(
        err=>{
            console.log(err)
            res.send(err)
        }
    )
}
