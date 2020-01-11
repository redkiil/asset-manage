'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const authMiddleware = require('../middlewares/auth')

const userController = require('../controllers/users')

const multer = require('multer');
var storage = multer.memoryStorage();
const upload = multer({ storage: storage});

router.post('/createuser', upload.single('avatarimg'), userController.resizeAvatar, userController.post);
router.get('/', authMiddleware,userController.get);
router.get('/:rid', userController.getByRegistration);
router.put('/:rid', upload.single('avatarimg'),userController.resizeAvatar, userController.put);
router.get('/badge/:id', userController.createBadge);
router.get('/subsector/:ssectorid', userController.geyBySubSector);
router.put('/changepassword/:token', userController.changePassword);
router.get('/validatetoken/:token', userController.validateToken);
router.post('/tokenrecovery', userController.recoveryToken);
module.exports = router;