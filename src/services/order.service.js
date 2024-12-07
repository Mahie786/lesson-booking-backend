const { getDB } = require("../../config/database");
const { ObjectId } = require("mongodb");

const insertOrder = async (order) => {
  console.log("orders:", order)
  const db = getDB();
  const result = await db.collection("orders").insertOne(order);

    // Update spaces for each lesson in the order
  for (const lesson of order.lessons) {
    await db.collection("lessons").updateOne(
      { _id: new ObjectId(lesson.lessonId) },
      { $inc: { spaces: -lesson.spaces } }
    );
  }

  // Attach the insertedId to the lesson object
  const insertedOrder = { ...order, _id: result.insertedId };

  // Return the inserted lesson object
  return insertedOrder;
};

module.exports = {
  insertOrder,
};
