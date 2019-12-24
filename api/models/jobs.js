const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
        cboid:{
            type: Number,
            required: true
        },jobname:{
            type: String,
            required: true
        }
})
module.exports = mongoose.model('Jobs', schema);