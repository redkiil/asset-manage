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
exports.createBadge = (req, res) =>{
    var canvas = Canvas.createCanvas(200, 200)
var ctx = canvas.getContext('2d')

ctx.globalAlpha = 0.2

ctx.strokeRect(0, 0, 200, 200)
ctx.lineTo(0, 100)
ctx.lineTo(200, 100)
ctx.stroke()

ctx.beginPath()
ctx.lineTo(100, 0)
ctx.lineTo(100, 200)
ctx.stroke()

ctx.globalAlpha = 1
ctx.font = 'normal 40px Impact, serif'

ctx.rotate(0.5)
ctx.translate(20, -40)

ctx.lineWidth = 1
ctx.strokeStyle = '#ddd'
ctx.strokeText('Wahoo', 50, 100)

ctx.fillStyle = '#000'
ctx.fillText('Wahoo', 49, 99)

var m = ctx.measureText('Wahoo')

ctx.strokeStyle = '#f00'

ctx.strokeRect(
  49 + m.actualBoundingBoxLeft,
  99 - m.actualBoundingBoxAscent,
  m.actualBoundingBoxRight - m.actualBoundingBoxLeft,
  m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
)

canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, '../badges/text.png')))
res.status(200).send("OK");
};