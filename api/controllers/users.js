'use strict';

const mongoose = require('mongoose');
const Canvas = require('canvas');
const fs = require('fs');
const path = require('path');
const User = mongoose.model('Users');
const Sectors = mongoose.model("Sectors");
const SubSectors = mongoose.model("SubSectors");
const Tokens = mongoose.model('Tokens');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth.json');
const crypto = require('crypto');

exports.post = (req, res, next) =>{
    var data = req.body;
    data.password = "blank_to";
    var usr = new User(data);
    console.log("OASKD", authConfig.register_secret);
    const asd = crypto.randomBytes(16).toString("hex");
    const token = jwt.sign({ to_user: data.registration}, authConfig.register_secret, {
        expiresIn: 86400
    , jwtid: asd});
    usr.save().then(x=>{
        res.status(201).send({ message: 'user has been created.', token: token});
    }).catch(e=>{
        res.status(400).send({ message: 'failed in create user', data: e})
    });
};
exports.get = (req, res, next)=>{
    User.find({}).
    populate('sector').
    populate('subsector').populate('vehicle').then(data=>{
        return res.status(200).send(data);
    }).catch(e=>{
        return res.status(401).send("error fetching users "+ e);
    })
};
exports.getByRegistration = (req, res, next) =>{
    User.findOne({ registration: req.params.rid }).populate('sector').populate('subsector').populate('job').populate('vehicle').select("-_id -password").then(data=>{
        res.status(200).send(data);
    }).catch(e=>{
        res.status(400).send({"message": "fail to fetch user "+ req.params.id });
    });
}
exports.put = (req, res, next)=>{
    req.body.oldregistration = req.params.rid;
    User.replaceOne({ registration: req.params.rid }, req.body, { new: true }).then(r=>{
        res.status(200).send(r);
    }).catch(e=>{
        res.status(400).send(e);
    });
};
exports.geyBySubSector = (req, res, next) =>{
    User.find({ subsector: req.params.ssectorid },'name registration fleetid job').populate('vehicle').populate('job').select("-_id").then(data=>{
        res.status(200).send(data);
    }).catch(e=>{
        res.status(400).send({"message": "fail to fetch users by "+ req.params.ssectorid });
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
    let dirimg = path.resolve(__dirname, `../static/users/${id}.png`);
    fs.existsSync(dirimg) ? userImage.src = dirimg : userImage.src = './badges/default-avatar.png';
};

exports.changePassword = async (req, res, next) => {
    let rcv_token = req.params.token;
    let new_password = req.body.new_pass;
    try{
        let token = await jwt.verify(rcv_token, authConfig.register_secret, (e,d) => { return {e,d}; });
        if(token.e)return res.status(400).send({ message: token.e.message });
        let token_exist = await Tokens.findOne({ jti: token.d.jti });
        if(token_exist)return res.status(400).send({ message: 'this token has already been used' });
        let dojob = await User.findOneAndUpdate({ registration: token.to_user }, { password: new_password }).exec();
        let rresult = new Tokens(token.d).save();
        res.status(200).send({ message: 'senha alterada com sucesso'});
    }catch(e){
        res.status(400).send({ message: e});
    }
}
exports.validateToken = (req, res, next) => {
    let rcv_token = req.params.token;
    jwt.verify(rcv_token, authConfig.register_secret, (err, decoded) =>{
        if(err) return res.status(401).send({ message: 'token invalid'});
        res.status(200).send(decoded);
    });
}