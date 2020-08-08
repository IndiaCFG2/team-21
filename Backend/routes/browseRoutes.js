const express = require('express')
const router = express.Router();

const { } = require('../controllers/browseController')

router.get('/youtube',getYoutubeLinks);
router.get('/article',getArticles);
router.get('/queries',getQueries);

router.post('/askquery',postQuery);