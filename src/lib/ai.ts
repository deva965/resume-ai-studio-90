import type { Resume } from "./resume-types";

export type AISection =
  | "summary"
  | "skills"
  | "experience"
  | "projects";

const API = "https://resume-ai-studio-90-1.onrender.com/api";

// ===========================
// AI Generate
// ===========================
export async function aiGenerate(
  section: AISection,
  resume: Resume,
  context?: string
): Promise<string> {

  // Only Summary is implemented for now
  if (section !== "summary") {
    return "Coming Soon...";
  }

  const response = await fetch(
    `${API}/generate-summary`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        full_name: resume.personal.fullName,

        education: resume.education,

        experience: resume.experience,

        projects: resume.projects,

        skills: resume.skills,

        context,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "AI generation failed"
    );
  }

  return data.summary;
}