// Employee.js (CommonJS)
const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },  
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    nic: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true
    },
    basicsal: {
        type: Number,
        required: true
    },
    empid: {
        type: String,
        required: true,
        unique: true
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;