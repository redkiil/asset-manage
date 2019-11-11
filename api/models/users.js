'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }


});
module.exports = mongoose.model('Users', schema);