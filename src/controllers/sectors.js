const mongoose = require('mongoose');
const Sectors = require('../models/sectors');
const SubSectors = require('../models/subsectors');

exports.sector = (req, res) => {
    Sectors.find().populate('members').then(data =>{
        res.status(200).send(data);
    }).catch(e=>{
        res.status(401).send({ error: e.data });
    })
};
exports.subsector = (req, res) => {
    SubSectors.find().populate("sector").then(data =>{
        res.status(200).send(data);
    }).catch(e=>{
        res.status(401).send({ error: e.data });
    })
};