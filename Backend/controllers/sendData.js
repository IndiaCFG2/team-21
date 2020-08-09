const mongo = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer');
const validator = require('validator')
const ejs = require('ejs')

const FpoDisplay = require('../db/models/fpoDisplayModel')

const { sendVerificationMail } = require('../service/emailService')
