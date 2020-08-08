const mongo = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer');
const validator = require('validator')
const ejs = require('ejs')

const User = require('../db/models/userModel')

const { sendVerificationMail } = require('../service/emailService')

module.exports.userSignup = async (req, res) => {
    console.log(req.body)
    const { email, name, password, phone } = req.body
    if ((!email) || (!name) || (!password) || (!phone)) {
        return res.status(400).send({ success: false, message: 'Fill required details' })
    }

    if (name.length < 3) {
        return res.status(400).send({ success: false, message: 'minimum length of name is 3' })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).send({ success: false, message: 'Invalid mail id' })
    }
    if (!validator.isMobilePhone(phone)) {
        return res.status(400).send({ success: false, message: 'Invalid phone number' })
    }

    await User.find({ email: email }, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        else if (result.length != 0) {
            return res.status(400).send({ success: false, message: 'Email already in use' })
        }
        else {
            User.find({ phone: phone }, (err, result) => {
                if (err) {
                    return err;
                }
                else if (result.length != 0) {
                    return res.status(400).send({ success: false, message: 'phone number already in use' })
                }
                else {
                    var hashedPassword = bcrypt.hashSync(password, 8);

                    var name_ = name
                    if (name.charCodeAt(0) >= 97) {
                        name_ = String.fromCharCode(name.charCodeAt(0) - 32) + name.substring(1, name.length);
                    }

                    var user_ = new User({
                        email: email,
                        password: hashedPassword,
                        name: name_,
                        phone: phone,
                        session: [],
                        displayPicture: "https://res.cloudinary.com/dbzbydch5/image/upload/v1596549332/samples/dp_default_qsib7p.jpg",
                        active: false
                    })

                    user_.save()
                        .then(
                            data => {
                                //need id to send token.
                                var payload = { subject: data._id }
                                var token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' })

                                User.findOne({ _id: data._id }, (err, user) => {
                                    user.session.push(token)
                                    user.save();
                                    sendVerificationMail(user.name,user.email,token)
                                    return res.status(200).send({ success: true, token, name: user.name,active:user.active,displayPicture:user.displayPicture  })    
                                })

                            }
                        )
                        .catch(
                            err => {
                                console.log(err)
                                return res.status(500).send({
                                    success: false,
                                    message: err.message || 'error while creating new user'
                                })
                            }
                        )
                }
            })
        }
    })

}

module.exports.verifyMailid = async (req, res) => {
    const token = req.params.token;
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
        if (err) {
            console.log(err)
            return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            // if everything is good, save to request for use in other routes
            const filter ={_id: payload.subject};
            const update = { active:true }
           let doc = await  User.findOneAndUpdate(filter,update,{new:true})
            console.log(doc)
            res.send({success:true})
        }
    });
}

module.exports.userSignin = async (req, res) => {
    console.log(req.body)
    const { email, phone, password } = req.body
    if (!((email)) || (!password)) {
        return res.status(400).send({ success: false, message: 'fill required credentails' })
    }
    await User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(err); process.exit();
        }
        if (!user) {
            return res.status(400).send({ success: false, message: 'invalid email' })
        }
        else {
            if (bcrypt.compareSync(password, user.password)) {
                var payload = { subject: user._id }
                var token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' })

                if (user.session.length == 2) {
                    user.session.pop()
                }
                user.session.unshift(token)
                user.save();
return res.status(200).send({ success: true, token, name: user.name,active:user.active,displayPicture:user.displayPicture })
            }
            else {
                return res.status(400).send({ success: false, message: 'wrong password' })
            }
        }
    })

}

module.exports.verifyUser = async (req, res) => {
    //console.log(req.headers)
    if (!req.headers.authorization)
        return res.status(401).json({ success: false, message: 'unauthorized access' });
    let token = req.headers.authorization.split(' ')[1];
    if (token == null)
        return res.status(401).json({ success: false, message: 'unauthorized access' });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
        if (err) {
            console.log(err)
            return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            // if everything is good, save to request for use in other routes
            req.userId = payload.subject;
            User.findById(payload.subject, (err, user) => {
                if (err) { console.log(err) }
                if( !user )
                {
                    return res.status(401).json({ success: false, message: 'unauthorized access' });
                }
                else if (user.session[0] == token || user.session[1] == token) {
                    return res.status(200).json({ success: true, message: 'authorized',active:user.active, name: user.name,active:user.active,displayPicture:user.displayPicture  });
                }
                else {
                    return res.status(401).json({ success: false, message: 'unauthorized access' });
                }
            })
        }
    });
}
