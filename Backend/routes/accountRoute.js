const express = require('express')
const router = express.Router();
const multer = require('multer')
var upload = multer({ dest: 'uploads/' })

const { updateProfilePic } = require('../controllers/accountController')

router.post('/profilepic',upload.single('avatar'),updateProfilePic)

module.exports = router;