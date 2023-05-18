const express = require('express');
const controller = require('../controller/user');
const inscriptionUser = require('../schema/user')
const router = express.Router();

router.post('', inscriptionUser, controller.inscriptionUser);
router.post('/connexion', controller.connexionUser)

module.exports = router;