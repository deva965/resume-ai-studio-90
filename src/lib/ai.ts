import { config } from "./config";
import type { Resume } from "./resume-types";

export type AISection = "summary" | "skills" | "experience" | "projects";

const MOCK: Record<AISection, (r: Resume, ctx?: string) => string> = {
  summary: (r) =>
    `Results-driven ${r.personal.headline || "professional"} with a track record of delivering high-impact ${
      r.skills[0] ?? "technology"
    } solutions. Skilled at translating complex requirements into elegant, maintainable systems, collaborating cross-functionally, and mentoring teams. Focused on measurable outcomes and continuous improvement.`,
  skills: (r) => {
    const base = new Set(r.skills);
    ["TypeScript", "React", "Node.js", "SQL", "AWS", "Docker", "CI/CD", "Testing"].forEach((s) =>
      base.add(s),
    );
    return Array.from(base).join(", ");
  },
  experience: (_r, ctx) =>
    `• Led ${ctx || "a key initiative"} that improved a core KPI by 30%.\n• Collaborated with cross-functional partners to ship features to 10k+ users.\n• Owned architecture decisions and mentored two engineers.`,
  projects: (_r, ctx) =>
    `${ctx || "A modern web application"} built with React, TypeScript, and a serverless backend. Focused on performance, accessibility, and delightful UX. Achieved sub-100ms interactions and 95+ Lighthouse scores.`,
};

export async function aiGenerate(
  section: AISection,
  resume: Resume,
  context?: string,
): Promise<string> {
  // If a configured AI endpoint exists, call it.
  if (config.aiApiUrl) {
    try {
      const res = await fetch(config.aiApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, resume, context }),
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data?.text === "string") return data.text;
      }
    } catch {
      // fall through to mock
    }
  }
  // Simulate latency
  await new Promise((r) => setTimeout(r, 700));
  return MOCK[section](resume, context);
}
