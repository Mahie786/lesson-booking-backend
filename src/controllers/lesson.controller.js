const {
  findLessons,
  findLessonById,
  insertLesson,
  modifyLesson,
  removeLesson,
} = require("../services/lesson.service");

const getLessons = async (req, res) => {
  try {
    const lessons = await findLessons();
    res.json({ success: true, data: lessons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lesson = await findLessonById(req.params.id);
    if (!lesson) {
      return res
        .status(404)
        .json({ success: false, message: "Lesson not found" });
    }
    res.json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createLesson = async (req, res) => {
  try {
    const newLesson = await insertLesson(req.body);
    res.status(201).json({ success: true, data: newLesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateLesson = async (req, res) => {
  try {
    const updatedLesson = await modifyLesson(req.params.id, req.body);
    if (!updatedLesson) {
      return res
        .status(404)
        .json({ success: false, message: "Lesson not found" });
    }
    res.json({ success: true, data: updatedLesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const deleted = await removeLesson(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Lesson not found" });
    }
    res.json({ success: true, message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
};
