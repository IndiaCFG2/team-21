const nodeMailer = require('nodemailer');
const path = require('path')
const ejs = require('ejs')

module.exports.sendVerificationMail = async (name_,email_,token_)=>{
let transporter = nodeMailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
  });



    ejs.renderFile(path.join(__dirname,"..","views","welcome_email.ejs") , { name: name_,link:'http://localhost:3000/api/auth/verifyemail/'+token_ }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let mailOptions = {
                from:'vikramvikram741741@gmail.com',
                to:email_,
                subject:'Email conformation',
                html : data
            }
            //console.log("html data ======================>", mainOptions.html);

            transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                res.json({
                msg: 'fail'
                })
            } else {
                console.log('hi')
                res.json({
                msg: 'success'
                })
            }
        });
        }
    });

}