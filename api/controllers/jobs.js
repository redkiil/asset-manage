'use strict'

const mongoose = require('mongoose');
const Jobs = mongoose.model('Jobs');

exports.post = (req, res, next) => {
    if(!req.body.sector)req.body.sector = '000000000000000000000000';
    if(!req.body.subsector)req.body.subsector = '000000000000000000000000';

    var job = new Jobs(req.body);

    job.save().then(r =>{
        res.status(200).send({ message: 'job created' });
    }).catch(e => {
        res.status(400).send({ message: 'failed in create this job', data: e });
    });
}
exports.get = (req, res, next) => {
    Jobs.find({}).then(r=>{
        res.status(200).send(r);
    }).catch(e=>{
        res.status(400).send({message: e});
    })
}