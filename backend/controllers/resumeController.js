const resumeService = require("../services/resumeService");

// Create Resume
const createResume = async (req, res) => {
  try {
    const resume = await resumeService.createResume(req.body);

    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All User Resumes
const getUserResumes = async (req, res) => {
  try {
    const resumes = await resumeService.getUserResumes(req.params.userId);

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Resume By ID
const getResumeById = async (req, res) => {
  try {
    const resume = await resumeService.getResumeById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Resume
const updateResume = async (req, res) => {
  try {
    const resume = await resumeService.updateResume(
      req.params.id,
      req.body
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Resume
const deleteResume = async (req, res) => {
  try {
    const resume = await resumeService.deleteResume(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};