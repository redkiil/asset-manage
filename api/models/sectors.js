'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name:{
        type: String,
        required: true,
        default: "N/A"
    }
});
schema.virtual('members',{
    ref: 'SubSectors',
    localField: '_id',
    foreignField: 'sectorid',
    justOne: false,
});
schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Sectors', schema);