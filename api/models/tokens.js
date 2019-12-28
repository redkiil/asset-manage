const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
        jti:{
            type: String,
            required: true
        },exp:{
            type: Number,
            required: true
        },to_user:{
            type: Number,
            required: true
        }
})
module.exports = mongoose.model('Tokens', schema);