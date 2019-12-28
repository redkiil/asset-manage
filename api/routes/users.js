'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const authMiddleware = require('../middlewares/auth')

const userController = require('../controllers/users')

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, "../static/users"));
    },
    filename: function (req, file, cb) {
      cb(null, req.body.registration + '.png');
    }
  })
const upload = multer({ storage: storage});

router.post('/generatetoken', upload.single('avatarimg'), userController.post);
router.get('/', authMiddleware,userController.get);
router.get('/:rid', userController.getByRegistration);
router.put('/:rid', upload.single('avatarimg'), userController.put);
router.get('/badge/:id', userController.createBadge);
router.get('/subsector/:ssectorid', userController.geyBySubSector);
router.put('/changepassword/:token', userController.changePassword);
router.get('/validatetoken/:token', userController.validateToken);

module.exports = router;