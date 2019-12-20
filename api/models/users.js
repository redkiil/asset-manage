'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
        type: Number,
    },password:{
        type: String,
        require: true
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
schema.methods.checkPassword = async function( candidatePass){
    console.log(this.password);
    console.log(candidatePass);
    const match = bcrypt.compare(candidatePass, this.password);
    return match;
};

module.exports = mongoose.model('Users', schema);