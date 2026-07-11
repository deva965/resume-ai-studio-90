const aiService = require("../services/aiService");

const generateSummary = async (req, res) => {
  try {
    const summary = await aiService.generateSummary(req.body);

    res.json({
      success: true,
      summary,
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
  generateSummary,
};