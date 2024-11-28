// Import lesson service functions
const {
  findLessons,
  findLessonById,
  insertLesson,
  searchedLessons,
  modifyLesson,
} = require("../services/lesson.service");
  }
};

// Controller to search lessons
const searchLessons = async (req, res) => {
  try {
    // Extract search string from query parameters
    const { searchString } = req.query;
    // Search lessons using the service
    const lessons = await searchedLessons(searchString);
    // Send successful response with search results
    res.json({ success: true, data: lessons });
  } catch (error) {
    // Handle errors and send error response
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to get a lesson by ID
const getLessonById = async (req, res) => {
    // Handle errors and send error response
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to create a new lesson
const createLesson = async (req, res) => {
  try {
    // Create new lesson using the service
    const newLesson = await insertLesson(req.body);
    // Send successful response with new lesson data
    res.status(201).json({ success: true, data: newLesson });
  } catch (error) {
    // Handle errors and send error response
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to update a lesson
const updateLesson = async (req, res) => {
  try {
    // Update lesson using the service
  }
};

// Export all controller functions
module.exports = {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  searchLessons,
};
