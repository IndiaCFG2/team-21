const mongo = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer');
const validator = require('validator')
const ejs = require('ejs')

const User = require('../db/models/userModel')
const FpoUser = require('../db/models/fpoModel')

const { sendVerificationMail } = require('../service/emailService')

module.exports.userSignup = async (req, res) => {
    console.log(req.body)
    const { name, password, phone } = req.body
    if ((!name) || (!password) || (!phone)) {
        return res.status(400).send({ success: false, message: 'Fill required details' })
    }
    console.log("1")
    if (name.length < 3) {
        return res.status(400).send({ success: false, message: 'minimum length of name is 3' })
    }
    console.log("2")
    if (!validator.isMobilePhone(phone)) {
        return res.status(400).send({ success: false, message: 'Invalid phone number' })
    }

    await User.find({ phone: phone }, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        else if (result.length != 0) {
            return res.status(400).send({ success: false, message: 'Phone number already in use' })
        }
        else {
            var hashedPassword = bcrypt.hashSync(password, 8);
            console.log("3")
            var name_ = name
            if (name.charCodeAt(0) >= 97) {
                name_ = String.fromCharCode(name.charCodeAt(0) - 32) + name.substring(1, name.length);
            }

            var user_ = new User({
                password: hashedPassword,
                name: name_,
                phone: phone,
                session: [],
                active: false
            })

            user_.save()
                .then(
                    data => {
                        //need id to send token.
                        console.log("4")
                        var payload = { subject: data._id }
                        var token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' })

                        User.findOne({ _id: data._id }, (err, user) => {
                            user.session.push(token)
                            user.save();
                            //sendVerificationMail(user.name,user.email,token)
                            return res.status(200).send({ success: true, token, name: user.name,active:user.active  })    
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

module.exports.fpoSignup = async (req, res) => {
    console.log(req.body)
    const { fpo_name,registration,phone,leader_name,total_land,annual_turnover,farmer_count,region,pincode, password} = req.body
    if ( (!fpo_name) || (!registration) || (!leader_name) || (!total_land) || (!annual_turnover) || (!farmer_count) || (!region) || (!pincode) || (!password) || (!phone)) {
        return res.status(400).send({ success: false, message: 'Fill required details' })
    }

    if (fpo_name.length < 3) {
        return res.status(400).send({ success: false, message: 'minimum length of fpo name must be 3' })
    }

    if (registration.length !=10) {
        return res.status(400).send({ success: false, message: 'length of registration number must be 10' })
    }

    if (!validator.isMobilePhone(phone)) {
        return res.status(400).send({ success: false, message: 'Invalid phone number' })
    }

    if (leader_name.length < 3) {
        return res.status(400).send({ success: false, message: 'minimum length of leader name must be 3' })
    }
    
    if (region.length < 3) {
        return res.status(400).send({ success: false, message: 'minimum length of region must be 3' })
    }

    if (!(/^(\d{4}|\d{6})$/.test(pincode))){
        return res.status(400).send({ success: false, message: 'invalid pin code' })
    }

    await FpoUser.find({ phone: phone }, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        else if (result.length != 0) {
            return res.status(400).send({ success: false, message: 'Phone number already in use' })
        }
        else {
            var hashedPassword = bcrypt.hashSync(password, 8);

            var leader_name_ = leader_name
            if (leader_name.charCodeAt(0) >= 97) {
                leader_name_ = String.fromCharCode(leader_name.charCodeAt(0) - 32) + leader_name.substring(1, leader_name.length);
            }
            
            var fpo_name_ = fpo_name
            if (fpo_name.charCodeAt(0) >= 97) {
                fpo_name_ = String.fromCharCode(fpo_name.charCodeAt(0) - 32) + fpo_name.substring(1, fpo_name.length);
            }

            var user_ = new FpoUser({
                fpo_name: fpo_name_,
                registration:registration,
                phone: phone,
                leader_name: leader_name_,
                total_land: total_land,
                annual_turnover: annual_turnover,
                farmer_count: farmer_count,
                region: region,
                pincode: pincode,
                password: hashedPassword,
                session: [],
                active: false
            })

            user_.save()
                .then(
                    data => {
                        //need id to send token.
                        var payload = { subject: data._id }
                        var token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' })

                        FpoUser.findOne({ _id: data._id }, (err, user) => {
                            user.session.push(token)
                            user.save();
                            //sendVerificationMail(user.name,user.email,token)
                            return res.status(200).send({ success: true, token, leader_name: user.leader_name,active:user.active  })    
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


module.exports.userSignin = async (req, res) => {
    console.log(req.body)
    const {  phone, password } = req.body
    if ( (!password)) {
        return res.status(400).send({ success: false, message: 'fill required credentails' })
    }
    await User.findOne({ phone: phone }, (err, user) => {
        if (err) {
            console.log(err); process.exit();
        }
        if (!user) {
            return res.status(400).send({ success: false, message: 'invalid phone number' })
        }
        else {
            console.log("entered pass")
            console.log(password)
            console.log("pass")
            console.log(user.password)
            if (bcrypt.compareSync(password, user.password)) {
                var payload = { subject: user._id }
                var token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' })

                if (user.session.length == 2) {
                    user.session.pop()
                }
                user.session.unshift(token)
                user.save();
return res.status(200).send({ success: true, token, name: user.name,active:user.active})
            }
            else {
                return res.status(400).send({ success: false, message: 'wrong password' })
            }
        }
    })

}



module.exports.fpoSignin = async (req, res) => {
    console.log(req.body)
    const {  registration, password } = req.body
    if ( (!password)) {
        return res.status(400).send({ success: false, message: 'fill required credentails' })
    }
    await FpoUser.findOne({ registration: registration }, (err, user) => {
        if (err) {
            console.log(err); process.exit();
        }
        if (!user) {
            return res.status(400).send({ success: false, message: 'invalid registration number' })
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
return res.status(200).send({ success: true, token, active:user.active,fpo_name:user.fpo_name,registration : user.registration,leader_name:user.leader_name,farmer_count:user.farmer_count,region:user.region,pincode:user.pincode})
            }
            else {
                return res.status(400).send({ success: false, message: 'wrong password' })
            }
        }
    })

}