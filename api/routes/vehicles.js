'use strict'

const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicles');


router.get('/', vehicleController.get);
router.post('/', vehicleController.post);
module.exports = router;
