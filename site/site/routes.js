'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/home',authMiddleware, (req, res) => {
    res.render('home/index', { page: 'inicial/index' });
});
router.get('/manage/fleet',authMiddleware, (req, res) => {
    res.render('home/index', { page: 'manage/manage-fleet' });
});
router.get('/inicial',authMiddleware, (req, res) => {
    res.render('home/index', { page: 'inicial/index' });
});
router.get('/frente',authMiddleware, (req, res) => {
    res.render('home/index', { page: 'frente/users' });
});
router.get('/login', (req, res) => {
    res.render('auth/login', { page: 'manage/manage-fleet' });
});
module.exports = router;