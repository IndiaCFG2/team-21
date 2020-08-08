const express = require('express')
const router = express.Router();
const { userSignup,userSignin, verifyUser,verifyMailid } = require('../controllers/authController')

router.post('/signup',userSignup)
router.post('/signin',userSignin)
router.post('/verify',verifyUser)
router.get('/verifyemail/:token',verifyMailid)

module.exports = router;