const { MongoClient } = require("mongodb");

let db;

const connectDB = async () => {
  try {
    // Create a new MongoClient
    const client = new MongoClient(process.env.MONGO_URI);

    // Connect to the MongoDB server
    await client.connect();
    console.log("MongoDB Connected...");

    // Return the database instance
    db = client.db(); // Use default database from connection URI
    return db;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

// Getter for the database
const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

module.exports = { connectDB, getDB };
