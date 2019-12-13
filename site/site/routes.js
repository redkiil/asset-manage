'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const veryfy = require('./middlewares/check');
const config = require('../config.json');
const resource = require('./assets/resource');

router.get('/home', veryfy, (req, res) => {
    res.render('home/index', { page: 'inicial/index', registration: req.useregistration });
});
router.get('/manage/fleet', veryfy, (req, res) => {
    res.render('home/index', { page: 'manage/manage-fleet', registration: req.useregistration });
});
router.get('/inicial', veryfy, (req, res) => {
    res.render('home/index', { page: 'inicial/index', registration: req.useregistration });
});
router.get('/frente', veryfy, (req, res) => {
    res.render('home/index', { page: 'frente/users', api_url: config.API_URL, registration: req.useregistration });
});
router.get('/login', (req, res) => {
    res.render('auth/login', { page: 'manage/manage-fleet', registration: req.useregistration });
});
router.get('/calendar', veryfy, (req, res) => {
    res.render('home/index', { page: 'calendario/index', registration: req.useregistration });
});
router.get('/resource/:rsrc', resource);
router.get('/', (req, res) => {
    res.redirect("/home");
});
module.exports = router;