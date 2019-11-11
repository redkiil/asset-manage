'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    res.status(200).send({
        "title":"OK"
    })
});
module.exports = router;