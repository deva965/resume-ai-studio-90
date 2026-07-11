const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());

// ======================
// API Routes
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);

// ======================
// Health Check
// ======================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 AI Resume Builder Backend Running Successfully",
  });
});

module.exports = app;