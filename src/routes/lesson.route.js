const express = require("express");
const {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} = require("../controllers/lesson.controller");

const router = express.Router();

router.get("/", getLessons); // Get all lessons
router.get("/:id", getLessonById); // Get a single lesson by ID
router.post("/", createLesson); // Create a new lesson
router.put("/:id", updateLesson); // Update a lesson by ID
router.delete("/:id", deleteLesson); // Delete a lesson by ID

module.exports = router;
