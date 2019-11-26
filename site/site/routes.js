'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const veryfy = require('./middlewares/check');
const config = require('../config.json');
const resource = require('./assets/resource');

router.get('/home', veryfy, (req, res) => {
    res.render('home/index', { page: 'inicial/index' });
});
router.get('/manage/fleet', (req, res) => {
    res.render('home/index', { page: 'manage/manage-fleet' });
});
router.get('/inicial', (req, res) => {
    res.render('home/index', { page: 'inicial/index' });
});
router.get('/frente', (req, res) => {
    res.render('home/index', { page: 'frente/users', api_url: config.API_URL });
});
router.get('/login', (req, res) => {
    res.render('auth/login', { page: 'manage/manage-fleet' });
});
router.get('/calendar', (req, res) => {
    res.render('home/index', { page: 'calendario/index' });
});
router.get('/resource/:rsrc', resource);
module.exports = router;