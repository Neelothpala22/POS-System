// bills.js (CommonJS)
const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    customerNumber: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    subTotal: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    paymentMode: {
        type: String,
        required: true,
    },
    cartItems: {
        type: Array,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("bills", billSchema);