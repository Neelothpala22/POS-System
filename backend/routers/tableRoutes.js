// tableRoutes.js (CommonJS)
const express = require('express');
const { 
  addTableController,
  getTablesController,
  bookTableController,
  deleteTableController
} = require('../controller/tableController.js');

const router = express.Router();

// Add Table
router.post('/add-table', addTableController);

// Get All Tables
router.get('/get-tables', getTablesController);

// Book or Update Table
router.put('/book-table/:id', bookTableController);

// Delete Table
router.delete('/delete-table/:id', deleteTableController);

module.exports = router;