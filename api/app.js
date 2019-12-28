'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const router = express.Router();

mongoose.connect('mongodb+srv://redkiil:redkiil@cluster0-aml3p.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true});

const Users = require('./models/users');
const Sectors = require('./models/sectors');
const SubSectors = require("./models/subsectors");
const Vehicles = require('./models/vehicles');
const Jobs = require('./models/jobs');
const Tokens = require('./models/tokens');
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const mainroute = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const sectors  = require('./routes/sectors');
const vehicles = require('./routes/vehicles');
const jobs = require('./routes/jobs');

app.use('/', mainroute);
app.use('/users', users)
app.use('/auth', auth);
app.use('/sectors', sectors);
app.use('/vehicles', vehicles);
app.use('/jobs', jobs);

module.exports = app;