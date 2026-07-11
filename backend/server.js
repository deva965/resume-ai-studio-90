require("dotenv").config();

const app = require("./app");
const pool = require("./config/database");
const initDB = require("./config/initDB");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL Connected");

    await initDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Database Connection Failed");
    console.error(err.message);
  }
}

startServer();