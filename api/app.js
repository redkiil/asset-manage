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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const mainroute = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const sectors  = require('./routes/sectors');


app.use('/', mainroute);
app.use('/users', users)
app.use('/auth', auth);
app.use('/sectors', sectors);

module.exports = app;