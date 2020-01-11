'use strict'

const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicles');


router.get('/', vehicleController.get);
router.get('/:id', vehicleController.geyByFleet);
router.put('/:id', vehicleController.put);
router.delete('/:id', vehicleController.delete);
router.post('/', vehicleController.post);
router.get('/ssector/:ssid', vehicleController.geyBySubSector);
module.exports = router;
