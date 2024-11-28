// Import required modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const { connectDB } = require("../config/database");
const lessonRoutes = require("./routes/lesson.route");
const orderRoutes = require("./routes/order.route");
const logger = require("./middlewares/logger");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Immediately Invoked Function Expression (IIFE) to use async/await
(async () => {
  // Connect to the database
  const db = await connectDB();

  // Set up the directory for lesson images
  const imagesDirectory = path.join(__dirname, "lesson-images");

  // Serve static files from the images directory
  app.use("/images", express.static(imagesDirectory));

  // Middleware to handle requests for non-existent images
  app.use("/images", (req, res, next) => {
    const requestedFile = path.join(imagesDirectory, req.path);

    // Check if the requested file exists
    fs.access(requestedFile, fs.constants.F_OK, (err) => {
      if (err) {
        // If file doesn't exist, send a 404 response
        return res.status(404).json({
          success: false,
          message: "Image not found",
        });
      }
      next(); // If file exists, pass control to next middleware
    });
  });

  // Use custom logger middleware
  app.use(logger);

  // Set up routes
  app.use("/api/lessons", lessonRoutes);
  app.use("/api/orders", orderRoutes);

  // Start the server
  const PORT = process.env.PORT || 5004;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
