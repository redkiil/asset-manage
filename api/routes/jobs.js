'use strict';

const express = require('express');
const router = express.Router();


const jobsController = require('../controllers/jobs')

router.get('/', jobsController.get);
router.post('/', jobsController.post);
module.exports = router;