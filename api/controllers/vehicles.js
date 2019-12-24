'use strict'

const mongoose = require('mongoose');
const Vehicles = mongoose.model('Vehicles');
const Sectors = mongoose.model("Sectors");
const SubSectors = mongoose.model("SubSectors");

exports.post = (req, res, next) => {
    if(!req.body.sector)req.body.sector = '000000000000000000000000';
    if(!req.body.subsector)req.body.subsector = '000000000000000000000000';

    var veh = new Vehicles(req.body);

    veh.save().then(r =>{
        res.status(200).send({ message: 'vehicle created in data base' });
    }).catch(e => {
        res.status(400).send({ message: 'failed to create vehicle created in data base', data: e });
    });
}
exports.get = (req, res, next) => {
    Vehicles.find({}).then(r=>{
        res.status(200).send(r);
    }).catch(e=>{
        res.status(400).send({message: e});
    })
}