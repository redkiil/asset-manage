'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const authMiddleware = require('../middlewares/auth');
router.get('/users', (req, res) => {
    res.sendFile(path.normalize(__dirname+"/../site/users.html"));
});
router.get('/script', (req, res) => {
    res.sendFile(path.normalize(__dirname+"/../site/script.js"));
});
router.get('/login', (req, res) => {
    res.sendFile(path.normalize(__dirname+"/../site/auth/login.html"));
});
router.get('/login/css', (req, res) => {
    res.sendFile(path.normalize(__dirname+"/../site/auth/login.css"));
});

router.get('/logarse', (req, res) => {
    res.sendFile(path.normalize(__dirname+"/../site/auth/logarse.html"));
});
router.get('/cadastrar',authMiddleware, (req, res) => {
    res.sendFile(path.normalize(__dirname+"/../site/registeruser.html"));
});
router.get('/manage/frota',authMiddleware, (req, res) => {
    res.sendFile(path.normalize(__dirname+"/../site/manage/manage-fleet.html"));
});
router.get('/home',authMiddleware, (req, res) => {
    res.sendFile(path.normalize(__dirname+"/../site/home/index.html"));
});
module.exports = router;