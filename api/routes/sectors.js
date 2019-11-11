'use strict';

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth')

const sectorsController = require('../controllers/sectors')

router.get('/', authMiddleware, sectorsController.sector);
router.get('/subsectors', authMiddleware, sectorsController.subsector);
module.exports = router;