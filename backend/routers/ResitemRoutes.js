const express = require('express');
const { 
  editItemController, 
  deleteItemController, 
  getItemController, 
  addItemController 
} = require('../controller/ResitemController.js');

const router = express.Router();

// Add Item Route
router.post('/add-res-item', addItemController);

// Get All Items Route
router.get('/get-res-item', getItemController); // This matches your frontend call

// Edit Item Route
router.put('/edit-res-item', editItemController);

// Delete Item Route
router.delete('/delete-item/:id', deleteItemController);

module.exports = router;