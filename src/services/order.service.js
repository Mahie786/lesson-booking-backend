const { getDB } = require("../../config/database");

const insertOrder = async (order) => {
  const db = getDB();
  const result = await db.collection("orders").insertOne(order);

  // Attach the insertedId to the lesson object
  const insertedOrder = { ...order, _id: result.insertedId };

  // Return the inserted lesson object
  return insertedOrder;
};

module.exports = {
  insertOrder,
};
