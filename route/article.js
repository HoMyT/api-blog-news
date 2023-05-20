const express = require('express');
const controller = require('../controller/article');
const createArticle = require('../schema/article/createArticle');
const token = require('../middelware/auth');
const router = express.Router();

router.post('', token, createArticle, controller.createArticle);
router.get('/all', token, controller.getAllArticle)

module.exports = router;