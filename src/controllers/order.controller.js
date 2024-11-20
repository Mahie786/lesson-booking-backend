const { insertOrder } = require("../services/order.service");

const createOrder = async (req, res) => {
  try {
    const newOrder = await insertOrder(req.body);
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
};
