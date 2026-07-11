const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateSummary = async (userData) => {
  const model = genAI.getGenerativeModel({
    model:"gemini-3.5-flash",
  });

  const prompt = `
Generate a professional resume summary.

Name: ${userData.full_name}
Education: ${userData.education}
Skills: ${userData.skills}
Projects: ${userData.projects}
Experience: ${userData.experience}

Write a professional ATS-friendly summary in about 80-120 words.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = {
  generateSummary,
};