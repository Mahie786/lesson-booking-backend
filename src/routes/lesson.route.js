const express = require("express");
const {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  searchLessons,
} = require("../controllers/lesson.controller");

const router = express.Router();

router.post("/", createLesson); // Create a new lesson
router.get("/", getLessons); // Get all lessons
router.get("/search", searchLessons); //Get searched lessons
router.get("/:id", getLessonById); // Get a single lesson by ID
router.put("/:id", updateLesson); // Update a lesson by ID

module.exports = router;
