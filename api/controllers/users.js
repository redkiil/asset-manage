'use strict';

const mongoose = require('mongoose');
const Canvas = require('canvas');
const fs = require('fs');
const path = require('path');
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
exports.createBadge = async (req, res) =>{
    var id = req.params.id;
    let name = `AUGUSTO`;
    let lastname = `NETO`;
    let rid = `${id}    *`;
    let setor = `AGRICOLA`;
    await User.findOne({ registration: id },'name sector').populate('sector').then(data=>{
        let fullname = data.name.split(" ");
        name = fullname[0].toUpperCase();
        lastname = fullname[1].toUpperCase();
        setor = data.sector.name.toUpperCase();
        console.log(data)
    }).catch(e=>{
        console.log(e);
    });
    var canvas = Canvas.createCanvas(300, 550)
    var ctx = canvas.getContext('2d')
    const img = new Canvas.Image;
    const img2 = new Canvas.Image;
    img2.onload = () => {
        ctx.drawImage(img2, 0, 0, 300, 550);
    }
    img.onload = () => {
        ctx.font = 'bold 22px Tahoma'
        ctx.textAlign = 'center';
       
       
        ctx.fillText(name, 220, 200);
        ctx.fillText(lastname, 220, 230);
        ctx.fillText(rid, 220, 260);
        ctx.fillText(setor, 150, 545);
        ctx.drawImage(img, 5, 130, 130, 200);

        res.setHeader('Content-Type', 'image/png');
        canvas.pngStream().pipe(res);
    }
    img.onerror = err => {
        console.log(err)
    }
    img2.onerror = err =>{
        console.log(err);
    }
    
    img2.src = './badges/test.png';
    img.src = './badges/avatar2.png';
};