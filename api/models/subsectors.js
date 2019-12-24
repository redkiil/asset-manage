'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    sectorid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sectors',
        required: true
    },name:{
        type: String,
        required: true,
        default: "N/A"
    }
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('SubSectors', schema);