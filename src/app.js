const express = require("express");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const { connectDB } = require("../config/database");
const lessonRoutes = require("./routes/lesson.route");
const orderRoutes = require("./routes/order.route");
const logger = require("./middlewares/logger");
dotenv.config();

const app = express();
app.use(express.json());

(async () => {
  const db = await connectDB();

  // The directory where lesson images are stored
  const imagesDirectory = path.join(__dirname, "lesson-images");

  // Static middleware to serve images
  app.use("/images", express.static(imagesDirectory));

  // Middleware to handle non-existent files
  app.use("/images", (req, res, next) => {
    const requestedFile = path.join(imagesDirectory, req.path);

    // Check if the file exists
    fs.access(requestedFile, fs.constants.F_OK, (err) => {
      if (err) {
        // File does not exist
        return res.status(404).json({
          success: false,
          message: "Image not found",
        });
      }
      next(); // Pass control to the next middleware if the file exists
    });
  });

  app.use(logger);
  app.use("/api/lessons", lessonRoutes);
  app.use("/api/orders", orderRoutes);

  const PORT = process.env.PORT || 5004;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
