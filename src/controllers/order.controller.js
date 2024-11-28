// Import the insertOrder function from the order service
const { insertOrder } = require("../services/order.service");

// Controller function to handle order creation
const createOrder = async (req, res) => {
  try {
    // Call the insertOrder service function with the request body
    const newOrder = await insertOrder(req.body);

    // If successful, send a 201 (Created) status with the new order data
    res.status(201).json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    // If an error occurs, send a 500 (Internal Server Error) status with the error message
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Export the createOrder function to be used in routes
module.exports = {
  createOrder,
};
