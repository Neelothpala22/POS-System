// menuRoutes.js (CommonJS)
const express = require('express');
const MenuItem = require('../models/menuItemModel.js');

const router = express.Router();

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;