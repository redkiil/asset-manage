'use strict';

const mongoose = require('mongoose');
const Canvas = require('canvas');
const fs = require('fs');
const path = require('path');
const User = mongoose.model('Users');
const Sectors = mongoose.model("Sectors");
const SubSectors = mongoose.model("SubSectors");

exports.post = async (req, res, next) =>{
    var data = req.body;
    


    var usr = new User(data);
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
    let name = `NOME`;
    let lastname = `PADRAO`;
    let rid = `${id}    *`;
    let setor = `AGRICOLA`;

    await User.findOne({ registration: id },'name sector').populate('sector').then(data=>{
        let fullname = data.name.split(" ");
        name = fullname[0].toUpperCase();
        lastname = fullname[fullname.length-1].toUpperCase();
        setor = data.sector.name.toUpperCase();
    }).catch(e=>{
        console.log(e);
    });
    var canvas = Canvas.createCanvas(300, 450)
    var ctx = canvas.getContext('2d')
    const userImage = new Canvas.Image;
    const baseImage = new Canvas.Image;
    baseImage.onload = () => {
        ctx.drawImage(baseImage, 0, 0, 300, 450);
    }
    userImage.onload = () => {
        ctx.font = 'bold 22px Tahoma'
        ctx.textAlign = 'center';
        ctx.fillText(name, 220, 180);
        ctx.fillText(lastname, 220, 210);
        ctx.fillText(rid, 220, 240);
        ctx.font = 'bold 16px Tahoma'
        ctx.fillText(setor, 150, 445);
        ctx.drawImage(userImage, 5, 110, 130, 150);
        res.setHeader('Content-Type', 'image/png');
        canvas.pngStream().pipe(res);
    }
    userImage.onerror = err => {
        console.log(err)
    }
    baseImage.onerror = err =>{
        console.log(err);
    }
    baseImage.src = './badges/test.png';
    userImage.src = './badges/avatar2.png';
};