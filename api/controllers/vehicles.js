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
    Vehicles.find({}).sort({fleetid: 'ascending'}).then(r=>{
        res.status(200).send(r);
    }).catch(e=>{
        res.status(400).send({message: e});
    })
}
exports.delete = (req, res, next) => {
    Vehicles.deleteMany({ fleetid: { $in: req.params.id }}).then(r=>{
        res.status(200).send(r);
    }).catch(e=>{
        res.status(400).send({message: e});
    })
}
exports.put = (req, res, next) => {
    Vehicles.findOneAndUpdate({ fleetid: req.params.id }, req.body).then(r=>{
        res.status(200).send(r);
    }).catch(e=>{
        res.status(400).send({message: e});
    })
}
exports.geyByFleet = (req, res, next) => {
    Vehicles.findOne({ fleetid: req.params.id }).then(r=>{
        res.status(200).send(r);
    }).catch(e=>{
        res.status(400).send({message: e});
    })
}
exports.geyBySubSector = (req, res, next) => {
    let subsecid = req.params.ssid;
    console.log("PS", subsecid);
    Vehicles.find({ subsector: subsecid }).sort({fleetid: 'ascending'}).then(r=>{
        res.status(200).send(r);
    }).catch(e=>{
        console.log(e);
        res.status(400).send({message: e});
    })
}