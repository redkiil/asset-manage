const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
        model:{
            type: String,
            required: true
        },fleetid:{
            type: Number,
            required: true
        },sector:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sectors',
            required: true
        },subsector:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubSectors',
            required: true
        }
})
module.exports = mongoose.model('Vehicles', schema);