// InventoryOrderRoute.js (CommonJS)
const express = require('express');
const Orders = require('../models/InventoryOrderSchema.js');

const router = express.Router();

// Middleware for validating order data
const validateOrder = (req, res, next) => {
    console.log('Validating Order data:', req.body);
    const { orderName, supplier, date, noOfItems } = req.body;

    if (!orderName || !supplier || !date || !noOfItems) {
        return res.status(400).json({
            message: 'All fields are required: orderName, supplier, date, noOfItems'
        });
    }
    next();
};

// POST Route to save new order
router.post('/send', validateOrder, async (req, res, next) => {
    try {
        console.log('Received data:', req.body);
        
        const orderData = {
            ...req.body,
            status: "Pending"
        };

        const newOrder = await Orders.create(orderData);
        return res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        next(error);
    }
});

// GET Route to retrieve all orders
router.get('/', async (req, res, next) => {
    try {
        const orders = await Orders.find({});
        return res.status(200).json({
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        next(error);
    }
});

// GET Route to retrieve order by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Orders.findById(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        next(error);
    }
});

// PUT Route to update order details by ID
router.put('/update/:id', validateOrder, async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedOrder = await Orders.findByIdAndUpdate(id, req.body, { new: true });
        console.log("Updated Order:", updatedOrder);
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order updated successfully', updatedOrder });
        
    } catch (error) {
        console.error('Error updating order details:', error);
        next(error);
    }
});

// PUT Route to update only the order status by orderId
router.put('/updateStatus/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
  
    const validStatuses = ["Pending", "In Process", "Order Received", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }
  
    try {
      const updatedOrder = await Orders.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found." });
      }
  
      res.json({ message: "Order status updated successfully.", data: updatedOrder });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// DELETE Route to remove order by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Orders.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        next(error);
    }
});

module.exports = router;