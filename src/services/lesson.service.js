// Import database connection and MongoDB ObjectId
const { getDB } = require("../../config/database");
const { ObjectId } = require("mongodb");

// Function to retrieve all lessons
const findLessons = async () => {
  const db = getDB();
  return await db.collection("lessons").find().toArray();
};

// Function to find a lesson by its ID
const findLessonById = async (id) => {
  const db = getDB();
  // Validate and create ObjectId from the given id
  const objectId = ObjectId.isValid(id)
    ? ObjectId.createFromHexString(id)
    : null;
  if (!objectId) throw new Error("Invalid ObjectId format");
  return await db.collection("lessons").findOne({ _id: objectId });
};

// Function to insert a new lesson
const insertLesson = async (lesson) => {
  const db = getDB();
  // Insert the lesson and retrieve the insertedId
  const result = await db.collection("lessons").insertOne(lesson);

  // Attach the insertedId to the lesson object
  const insertedLesson = { ...lesson, _id: result.insertedId };

  // Return the inserted lesson object
  return insertedLesson;
};

// Function to search lessons based on a search string
const searchedLessons = async (searchString = "") => {
  try {
    const db = getDB();
    const lessons = db.collection("lessons");

    const searchRegex = new RegExp(searchString, "i"); // 'i' for case-insensitive
    // Construct query to search across multiple fields
    const query = {
      $or: [
        { subject: { $regex: searchRegex } },
        { location: { $regex: searchRegex } },
        // For Numbers
        { price: { $eq: Number(searchString) || NaN } },
        { spaces: { $eq: Number(searchString) || NaN } },
      ],
    };

    const results = await lessons.find(query).toArray();
    return results;
  } catch (error) {
    console.error("Error searching lessons:", error);
  }
};

// Function to modify an existing lesson
const modifyLesson = async (id, updates) => {
  const db = getDB();
  // Validate and create ObjectId from the given id
  const objectId = ObjectId.isValid(id)
    ? ObjectId.createFromHexString(id)
    : null;
  if (!objectId) throw new Error("Invalid ObjectId format");
  const result = await db
    .collection("lessons")
    .findOneAndUpdate(
      { _id: objectId },
      { $set: updates },
      { returnDocument: "after" }
    );
  return result;
};

// Export all functions for use in other parts of the application
module.exports = {
  findLessons,
  findLessonById,
  insertLesson,
  searchedLessons,
  modifyLesson,
};
