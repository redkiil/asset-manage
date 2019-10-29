'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    sector:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },name:{
        type: String,
        required: true,
        default: "N/A"
    }
});
module.exports = mongoose.model('SubSectors', schema);