'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/home', (req, res) => {
    res.render('home/index', { page: 'inicial/index' });
});
router.get('/manage/fleet', (req, res) => {
    res.render('home/index', { page: 'manage/manage-fleet' });
});
router.get('/inicial', (req, res) => {
    res.render('home/index', { page: 'inicial/index' });
});
router.get('/frente', (req, res) => {
    res.render('home/index', { page: 'frente/users' });
});
router.get('/login', (req, res) => {
    res.render('auth/login', { page: 'manage/manage-fleet' });
});
router.get('/calendar', (req, res) => {
    res.render('home/index', { page: 'calendario/index' });
});
module.exports = router;