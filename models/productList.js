const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName :{
        type: String,
        required: true
    },
    productDescription:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
}, {timestamps: true});

const products = mongoose.model('products', productSchema);
module.exports = products