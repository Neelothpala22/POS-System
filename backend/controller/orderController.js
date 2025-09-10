const mongoose = require("mongoose");
const Order = require("../models/orderModel");

// Place an order
const placeOrder = async (req, res) => {
  try {
    const { tableNo, customerName, contactNumber, email, cartItems, subTotal, tax, grandTotal } = req.body;

    // Validate input
    if (!tableNo || !customerName || !contactNumber || !email || !cartItems || !subTotal || !tax || !grandTotal) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new order
    const newOrder = new Order({
      tableNo,
      customerName,
      contactNumber,
      email,
      cartItems,
      subTotal,
      tax,
      grandTotal,
      status: "Pending",
    });

    // Save the order to the database
    await newOrder.save();

    // Send success response
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Sort by latest orders first
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate order ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Validate order ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate order ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }

    // Find and delete the order
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated order
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
};
