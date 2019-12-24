'use strict';

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth')

const sectorsController = require('../controllers/sectors')

router.get('/', sectorsController.sector);
router.get('/:id', sectorsController.sectorById);
router.get('/subsectors/', sectorsController.subsector);
router.get('/subsector/:id', sectorsController.subsectorById);
module.exports = router;