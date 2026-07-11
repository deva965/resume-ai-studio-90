const pool = require("./database");

async function initDB() {
  try {
    // Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Resumes Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS resumes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

        full_name VARCHAR(150),
        email VARCHAR(150),
        phone VARCHAR(20),
        address TEXT,
        linkedin TEXT,
        github TEXT,
        portfolio TEXT,

        summary TEXT,

        education JSONB,
        experience JSONB,
        projects JSONB,
        skills JSONB,
        certifications JSONB,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Database tables created");
  } catch (err) {
    console.error("❌ Error creating tables");
    console.error(err.message);
  }
}

module.exports = initDB;