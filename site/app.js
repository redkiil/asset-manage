'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const site = require('./site/routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/site/pages'));
app.use('/', site);
app.use('/static', express.static(__dirname + '/site/assets'));


module.exports = app;