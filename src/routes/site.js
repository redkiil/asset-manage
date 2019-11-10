'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const authMiddleware = require('../middlewares/auth');
router.get('/home',authMiddleware, (req, res) => {
    res.render('home/index', { page: 'inicial/index' });
});
router.get('/manage/fleet',authMiddleware, (req, res) => {
    res.render('home/index', { page: 'manage/manage-fleet' });
});
router.get('/inicial',authMiddleware, (req, res) => {
    res.render('home/index', { page: 'inicial/index' });
});
router.get('/login', (req, res) => {
    res.render('auth/login', { page: 'manage/manage-fleet' });
});
module.exports = router;