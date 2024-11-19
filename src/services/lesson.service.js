const { getDB } = require("../../config/database");
const { ObjectId } = require("mongodb");

const findLessons = async () => {
  const db = getDB();
  return await db.collection("lessons").find().toArray();
};

const findLessonById = async (id) => {
  const db = getDB();
  const objectId = ObjectId.isValid(id)
    ? ObjectId.createFromHexString(id)
    : null;
  if (!objectId) throw new Error("Invalid ObjectId format");
  return await db.collection("lessons").findOne({ _id: objectId });
};

const insertLesson = async (lesson) => {
  const db = getDB();
  //   const result = await db.collection("lessons").insertOne(lesson);
  //   console.log("result: ", result);
  //   return result;

  // Insert the lesson and retrieve the insertedId
  const result = await db.collection("lessons").insertOne(lesson);

  // Attach the insertedId to the lesson object
  const insertedLesson = { ...lesson, _id: result.insertedId };

  // Return the inserted lesson object
  return insertedLesson;
};

// const modifyLesson = async (id, updates) => {
//   const db = getDB();
//   const objectId = ObjectId.isValid(id)
//     ? ObjectId.createFromHexString(id)
//     : null;
//   if (!objectId) throw new Error("Invalid ObjectId format");
//   const result = await db
//     .collection("lessons")
//     .findOneAndUpdate(
//       { _id: objectId },
//       { $set: updates },
//       { returnDocument: "after" }
//     );
//   return result.value;
// };

// const removeLesson = async (id) => {
//   const db = getDB();
//   const objectId = ObjectId.isValid(id)
//     ? ObjectId.createFromHexString(id)
//     : null;
//   if (!objectId) throw new Error("Invalid ObjectId format");
//   const result = await db.collection("lessons").deleteOne({ _id: objectId });
//   return result.deletedCount > 0;
// };

module.exports = {
  findLessons,
  findLessonById,
  insertLesson,
  //   modifyLesson,
  //   removeLesson,
};