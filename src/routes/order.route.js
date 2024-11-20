const express = require("express");
const { createOrder } = require("../controllers/order.controller");

const router = express.Router();

router.post("/", createOrder); // Create a new lesson

module.exports = router;
