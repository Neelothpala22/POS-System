// userRoutes.js (CommonJS)
const express = require('express');
const { loginController, registerController } = require('../controller/userController.js');

const router = express.Router();

// Define the routes
router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;