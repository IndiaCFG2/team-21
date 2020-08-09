const express = require('express')
const router = express.Router();

const { getYoutubeLinks,postQuery,getArticles,getQueries } = require('../controllers/browseController')

router.get('/youtube',getYoutubeLinks);
router.get('/article',getArticles);
router.get('/queries',getQueries);

router.post('/askquery',postQuery);

module.exports = router;