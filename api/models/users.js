'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const schema = new Schema({
    name:{
        type: String,
        required: true,
    },birth:{
        type: Date,
        required: true
    },registration:{
        type: Number,
        required: true,
        index: true,
        unique: true
    },sector:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sectors",
        required: true
    },subsector:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSectors",
        required: true
    },dayoff:{
        type: Date,
    },password:{
        type: String,
        required: true
    },job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
        required: true
    },fleetid:{
        type: Number,
        ref: "Vehicles"
    }
});
schema.pre('save', function(next) {
    var user = this;
    
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err)return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err)return next(err);
            user.password = hash;
            next();
        });
    });
});
schema.pre('findOneAndReplace', function(next) {
    var user = this._update;
    if(user.avatarimg == 'undefined'){
        let dir = path.resolve(__dirname, `../static/users/${user.oldregistration}.png`);
        let newdir = path.resolve(__dirname, `../static/users/${user.registration}.png`);
        if (fs.existsSync(dir)) {
            fs.renameSync(dir, newdir);
        }
    }
    next();
    /*
    console.log("THISUSER", user);
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err)return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err)return next(err);
            user.password = hash;
            next();
        });
    });*/
});
schema.pre('findOneAndUpdate', function(next) {
    var user = this._update;
    console.log(this);
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err)return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err)return next(err);
            user.password = hash;
            next();
        });
    });
});
schema.methods.checkPassword = async function( candidatePass){
    console.log(this.password);
    console.log(candidatePass);
    const match = bcrypt.compare(candidatePass, this.password);
    return match;
};
schema.virtual('vehicle',{
    ref: 'Vehicles',
    localField: 'fleetid',
    foreignField: 'fleetid',
    justOne: true,
})
schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Users', schema);