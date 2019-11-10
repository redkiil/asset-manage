'use strict';

const express = require('express');
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const site = require('./site/routes');

app.set('view engine', 'ejs');

app.use('/', site);


module.exports = app;