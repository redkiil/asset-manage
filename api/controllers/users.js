'use strict';

const mongoose = require('mongoose');

const User = mongoose.model('Users');
const Sectors = mongoose.model("Sectors");
const SubSectors = mongoose.model("SubSectors");

exports.post = async (req, res, next) =>{
    var usr = new User(req.body);
    
    const sec = await Sectors.findOne({ sectorid: req.body.sector }).distinct('_id').lean();
    const ssec = await SubSectors.findOne({ subsectorid: req.body.subsector }).distinct('_id').lean();
    
    usr.sector = mongoose.Types.ObjectId(sec[0]);  
    usr.subsector = mongoose.Types.ObjectId(ssec[0]);

    usr.save().then(x=>{
        res.status(201).send({ message: 'user has been created.'});
    }).catch(e=>{
        res.status(400).send({ message: 'failed in create user', data: e})
    });
};
exports.get = (req, res, next)=>{
    User.find({}).
    populate('sector').
    populate('subsector').then(data=>{
        return res.status(200).send(data);
    }).catch(e=>{
        return res.status(401).send("error fetching users "+ e);
    })
};
exports.getByRegistration = (req, res, next) =>{
    User.findOne({ registration: req.params.rid },'name sector subsector').populate('sector').populate('subsector').select("-_id").then(data=>{
        console.log(data)
        res.status(200).send(data);
    }).catch(e=>{
        res.status(400).send({"message": "fail to fetch user "+ req.params.id });
    });
}