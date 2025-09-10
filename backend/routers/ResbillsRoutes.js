// ResbillsRoutes.js (CommonJS)
const express = require('express');
const { 
  addBillsController, 
  getBillsController, 
  deleteBillController 
} = require('../controller/ResbillsController.js');

const router = express.Router();

// Restaurant billing endpoints
router.post("/add-res-bills", addBillsController);
router.get("/get-res-bills", getBillsController);
router.delete("/delete-res-bills/:id", deleteBillController);

module.exports = router;