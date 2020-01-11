'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const veryfy = require('./middlewares/check');
const config = require('../config.json');
const resource = require('./assets/resource');

//SITE ROUTES
router.get('/home', veryfy, (req, res) => {
    res.render('home/index', { page: 'inicial/index', api_url: config.API_URL, registration: req.useregistration });
});
router.get('/inicial', veryfy, (req, res) => {
    res.render('home/index', { page: 'inicial/index', api_url: config.API_URL,registration: req.useregistration });
});
router.get('/', (req, res) => {
    res.redirect("/home");
});
router.get('/calendar', veryfy, (req, res) => {
    res.render('home/index', { page: 'calendario/index', api_url: config.API_URL,registration: req.useregistration });
});
router.get('/resource/:rsrc', resource);
//FRENTE ROUTES
router.get('/frente', veryfy, (req, res) => {
    res.render('home/index', { page: 'frente/home', api_url: config.API_URL, registration: req.useregistration });
});
router.get('/frente/:id/users', veryfy, (req, res) => {
    res.render('home/index', { page: 'frente/users', api_url: config.API_URL,  registration: req.useregistration, sectorid: req.params.id });
});
router.get('/frente/:id/vehicles', veryfy, (req, res) => {
    res.render('home/index', { page: 'frente/vehicles', api_url: config.API_URL,  registration: req.useregistration, sectorid: req.params.id });
});

//USERS ROUTES
router.get('/login', (req, res) => {
    res.render('auth/login', { page: 'manage/manage-fleet', api_url: config.API_URL,registration: req.useregistration });
});
router.get('/user/recover/:id', (req, res) => {
    res.render('auth/recoverpass', { page: '', api_url: config.API_URL, registration: req.useregistration, user_edit: req.params.id });
});
router.get('/user/register', veryfy, (req, res) => {
    res.render('home/index', { page: 'manageuser/register', api_url: config.API_URL, registration: req.useregistration });
});
router.get('/user/changepass/:token', (req, res) => {
    res.render('auth/changepass', { page: 'manageuser/register', api_url: config.API_URL, the_token: req.params.token });
});
router.get('/user/edit/:id', veryfy, (req, res) => {
    res.render('home/index', { page: 'manageuser/register', api_url: config.API_URL, registration: req.useregistration, user_edit: req.params.id });
});
//VEHICLES ROUTES
router.get('/manage/fleet', veryfy, (req, res) => {
    res.render('home/index', { page: 'manage/manage-fleet', api_url: config.API_URL,registration: req.useregistration });
});
router.get('/vehicle/register', veryfy, (req, res) => {
    res.render('home/index', { page: 'registervehicle/index', api_url: config.API_URL, registration: req.useregistration });
});
router.get('/vehicle/edit/:id', veryfy, (req, res) => {
    res.render('home/index', { page: 'registervehicle/index', api_url: config.API_URL, registration: req.useregistration, veh_edit: req.params.id });
});
module.exports = router;