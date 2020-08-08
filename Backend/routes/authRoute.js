const express = require('express')
const router = express.Router();
const { userSignup,userSignin,fpoSignup,fpoSignin } = require('../controllers/authController')

router.post('/signup',userSignup)
router.post('/fposignup',fpoSignup)
router.post('/signin',userSignin)
router.post('/fposignin',fpoSignin)


module.exports = router;