'use strict';

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth')

const sectorsController = require('../controllers/sectors')

router.get('/', sectorsController.sector);
router.get('/subsectors', sectorsController.subsector);
module.exports = router;