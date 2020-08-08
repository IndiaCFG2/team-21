const express = require('express')
const router = express.Router();

const {getYoutubeLinks, getArticlesLinks, getQueries, postQuery } = require('../controllers/browseController')

router.get('/youtube',getYoutubeLinks);
router.get('/article',getArticlesLinks);
router.get('/queries',getQueries);

router.post('/askquery',postQuery);

module.exports = router;
