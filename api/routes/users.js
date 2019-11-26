'use strict';

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth')

const userController = require('../controllers/users')

router.post('/', authMiddleware, userController.post);
router.get('/', authMiddleware,userController.get);
router.get('/:rid', userController.getByRegistration);
router.get('/badge/:id', userController.createBadge);
module.exports = router;