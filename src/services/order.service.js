const { getDB } = require("../../config/database");
const { ObjectId } = require("mongodb");

const findOrders = async () => {
  const db = getDB();
  return await db.collection("orders").find().toArray();
};

const findOrderById = async (id) => {
  const db = getDB();
  const objectId = ObjectId.isValid(id)
    ? ObjectId.createFromHexString(id)
    : null;
  if (!objectId) throw new Error("Invalid ObjectId format");
  return await db.collection("orders").findOne({ _id: objectId });
};

const insertOrder = async (order) => {
  const db = getDB();
  const result = await db.collection("orders").insertOne(order);

  // Attach the insertedId to the lesson object
  const insertedOrder = { ...order, _id: result.insertedId };

  // Return the inserted lesson object
  return insertedOrder;
};

// const modifyOrder = async (id, updates) => {
//   const db = getDB();
//   const objectId = ObjectId.isValid(id)
//     ? ObjectId.createFromHexString(id)
//     : null;
//   if (!objectId) throw new Error("Invalid ObjectId format");
//   const result = await db
//     .collection("orders")
//     .findOneAndUpdate(
//       { _id: objectId },
//       { $set: updates },
//       { returnDocument: "after" }
//     );
//   return result.value;
// };

// const removeOrder = async (id) => {
//   const db = getDB();
//   const objectId = ObjectId.isValid(id)
//     ? ObjectId.createFromHexString(id)
//     : null;
//   if (!objectId) throw new Error("Invalid ObjectId format");
//   const result = await db.collection("orders").deleteOne({ _id: objectId });
//   return result.deletedCount > 0;
// };

module.exports = {
  findOrders,
  findOrderById,
  insertOrder,
  //   modifyOrder,
  //   removeOrder,
};
