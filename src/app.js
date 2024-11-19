const express = require("express");
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

  // Example: Using the `users` collection
  app.use(logger);
  app.use("/api/lessons", lessonRoutes);
  app.use("/api/orders", orderRoutes);

  const PORT = process.env.PORT || 5004;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
