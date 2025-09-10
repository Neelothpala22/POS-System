// Supply.js (CommonJS)
const mongoose = require('mongoose');

const supplySchema = new mongoose.Schema({
    supplyId: { type: String, required: true },
    itemName: { type: String, required: true },
    initialQuantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    status: { type: String, default: 'Available' }
});

const Supply = mongoose.model('Supply', supplySchema);

module.exports = Supply;