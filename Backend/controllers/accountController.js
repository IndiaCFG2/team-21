

const cloudinary = require('cloudinary');
cloudinary.config({
cloud_name: process.env.CLOUDINARY_NAME,
api_key: process.env.CLOUDINARY_API,
api_secret: process.env.CLOUDINARY_SECRET
});

const User = require('../db/models/userModel');
const { response } = require('express');

module.exports.updateProfilePic = async ( req , res )=>{
   // console.log(req.file)
   cloudinary.uploader.upload(req.file.path, async (result,err)=>{
       if(err)
       {
           console.log('yo')
          return res.status(400).send(err)
       }
       else{
        console.log('yo2')
        let doc = await User.findOneAndUpdate({_id:req.userId},{ displayPicture:result.secure_url },{new:true})
        console.log(doc)
         res.status(200).send({ url:doc.displayPicture })
       }
    //console.log(err , result)
   })
}