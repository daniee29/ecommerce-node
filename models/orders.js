const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    productDetails :{
        type: Object,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    quantity : {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    statusUpdateTime: {
        type: Number,
        required: true
    }
    
}, {timestamps: true});

const orders = mongoose.model('orders', orderSchema);
module.exports = orders