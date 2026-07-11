const pool = require("../config/database");

// ==========================
// Create Resume
// ==========================
const createResume = async (resumeData) => {
  const {
    user_id,
    full_name,
    email,
    phone,
    address,
    linkedin,
    github,
    portfolio,
    summary,
    education,
    experience,
    projects,
    skills,
    certifications,
  } = resumeData;

  const result = await pool.query(
    `
    INSERT INTO resumes (
      user_id,
      full_name,
      email,
      phone,
      address,
      linkedin,
      github,
      portfolio,
      summary,
      education,
      experience,
      projects,
      skills,
      certifications
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14
    )
    RETURNING *;
    `,
    [
      user_id,
      full_name,
      email,
      phone,
      address,
      linkedin,
      github,
      portfolio,
      summary,
      JSON.stringify(education),
      JSON.stringify(experience),
      JSON.stringify(projects),
      JSON.stringify(skills),
      JSON.stringify(certifications),
    ]
  );

  return result.rows[0];
};

// ==========================
// Get All Resumes
// ==========================
const getUserResumes = async (userId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM resumes
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

// ==========================
// Get Resume By ID
// ==========================
const getResumeById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM resumes
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

// ==========================
// Update Resume
// ==========================
const updateResume = async (id, data) => {
  const {
    full_name,
    email,
    phone,
    address,
    linkedin,
    github,
    portfolio,
    summary,
    education,
    experience,
    projects,
    skills,
    certifications,
  } = data;

  const result = await pool.query(
    `
    UPDATE resumes
    SET
      full_name=$1,
      email=$2,
      phone=$3,
      address=$4,
      linkedin=$5,
      github=$6,
      portfolio=$7,
      summary=$8,
      education=$9,
      experience=$10,
      projects=$11,
      skills=$12,
      certifications=$13,
      updated_at=NOW()
    WHERE id=$14
    RETURNING *;
    `,
    [
      full_name,
      email,
      phone,
      address,
      linkedin,
      github,
      portfolio,
      summary,
      JSON.stringify(education),
      JSON.stringify(experience),
      JSON.stringify(projects),
      JSON.stringify(skills),
      JSON.stringify(certifications),
      id,
    ]
  );

  return result.rows[0];
};

// ==========================
// Delete Resume
// ==========================
const deleteResume = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM resumes
    WHERE id = $1
    RETURNING *;
    `,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};