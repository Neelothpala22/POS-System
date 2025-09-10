// orderRoutes.js (CommonJS)
const express = require('express');
const { 
  placeOrder, 
  getAllOrders, 
  updateOrderStatus, 
  deleteOrder 
} = require('../controller/orderController.js');

const router = express.Router();

router.post('/place', placeOrder);
router.get('/', getAllOrders);
router.patch('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;