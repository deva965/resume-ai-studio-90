const express = require("express");

const router = express.Router();

const {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

// Create Resume
router.post("/create", createResume);

// Get All Resumes
router.get("/user/:userId", getUserResumes);

// Get Single Resume
router.get("/:id", getResumeById);

// Update Resume
router.put("/:id", updateResume);

// Delete Resume
router.delete("/:id", deleteResume);

module.exports = router;