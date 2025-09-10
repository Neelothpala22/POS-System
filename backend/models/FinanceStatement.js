// Income.js (CommonJS)
const mongoose = require("mongoose");
const { Schema } = mongoose;

const incomeSchema = new Schema({
  sales: {
    type: Number,
    required: true,
  },
  costofsales: {
    type: Number,
    required: true,
  },
  grossprofit: {
    type: Number,
  },
  otherincomes: {
    type: Number,
    required: true,
  },
  deliverycost: {
    type: Number,
    required: true,
  },
  administrativecost: {
    type: Number,
    required: true,
  },
  otherexpences: {
    type: Number,
    required: true,
  },
  financeexpences: {
    type: Number,
    required: true,
  },
  netprofit: {
    type: Number,
  },
});

const Income = mongoose.model("fincome", incomeSchema);

module.exports = Income;