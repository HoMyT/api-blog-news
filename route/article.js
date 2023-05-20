const express = require('express');
const controller = require('../controller/article');
const createArticle = require('../schema/article/createArticle');
const updateArticle = require('../schema/article/updateArticle');
const token = require('../middelware/auth');
const router = express.Router();

router.post('', token, createArticle, controller.createArticle);
router.get('/all', token, controller.getAllArticle);
router.get('/one-article/:uuid', token , controller.OneArticle);
router.put('/update-article/:uuid', updateArticle, token, controller.updateArticle);
router.delete('/delete-article/:uuid', token, controller.deleteArticle)

module.exports = router;