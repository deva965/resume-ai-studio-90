const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

// ======================
// Middleware
// ======================

const allowedOrigins = [
  "http://localhost:8080",
  "https://resume-ai-studio-90-one.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ======================
// API Routes
// ======================

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

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