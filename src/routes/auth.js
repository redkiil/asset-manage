'use strict'

const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post('/', authController.validateData, authController.post);
router.get('/logout', authController.get);
module.exports = router;
