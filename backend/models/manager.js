// Manager.js (CommonJS)
const mongoose = require('mongoose');
const { Schema } = mongoose;

const managerSchema = new Schema({
    managerId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    managerName: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    contactNo: {
        type: String,
        required: true,
    }
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;