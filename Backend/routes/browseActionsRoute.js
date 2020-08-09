const express = require('express')
const router = express.Router();

const { rateYlink, rateArticle,ratequery} = require('../controllers/browseController')

router.post('/rateylink',rateYlink);
router.post('/ratearticle',rateArticle)
router.post('/ratequery',ratequery);

module.exports = router;