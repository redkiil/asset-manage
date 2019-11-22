'use strict'

const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

router.post('/', authController.validateData, authController.post);
router.get('/logout', authController.get);
router.get('/validateuser', authMiddleware, authController.validateuser)
module.exports = router;
