const express = require("express");
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

const router = express.Router();

router.get("/", getOrders); // Get all lessons
router.get("/:id", getOrderById); // Get a single lesson by ID
router.post("/", createOrder); // Create a new lesson
router.put("/:id", updateOrder); // Update a lesson by ID
router.delete("/:id", deleteOrder); // Delete a lesson by ID

module.exports = router;
