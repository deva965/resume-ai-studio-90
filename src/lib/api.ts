import type { Resume } from "./resume-types";
import { getToken, getUser } from "./auth";

const API = "https://resume-ai-studio-90-1.onrender.com/api";

function authHeaders() {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

// =========================
// Frontend -> Backend
// =========================
function toBackend(resume: Resume) {
  const user = getUser();

  return {
    user_id: user?.id,

    full_name: resume.personal.fullName,
    email: resume.personal.email,
    phone: resume.personal.phone,
    address: resume.personal.location,

    linkedin: "",
    github: "",
    portfolio: resume.personal.website,

    summary: resume.summary,

    education: JSON.stringify(resume.education),
    experience: JSON.stringify(resume.experience),
    projects: JSON.stringify(resume.projects),
    skills: JSON.stringify(resume.skills),
    certifications: JSON.stringify([]),
  };
}

// =========================
// Backend -> Frontend
// =========================
function parseJson(value: any) {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function toFrontend(item: any): Resume {
  return {
    id: String(item.id),

    title: item.title || "Resume",

    updatedAt: item.updated_at
      ? new Date(item.updated_at).getTime()
      : Date.now(),

    template: "classic",

    personal: {
      fullName: item.full_name || "",
      headline: "",
      email: item.email || "",
      phone: item.phone || "",
      location: item.address || "",
      website: item.portfolio || "",
    },

    summary: item.summary || "",

    skills: parseJson(item.skills),
    education: parseJson(item.education),
    experience: parseJson(item.experience),
    projects: parseJson(item.projects),
  };
}

// =========================
// GET
// =========================
export async function fetchResumes(): Promise<Resume[]> {
  const user = getUser();

  if (!user) return [];

  const res = await fetch(`${API}/resume/user/${user.id}`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch resumes");
  }

  const data = await res.json();

  return (data.resumes || []).map(toFrontend);
}

// =========================
// CREATE
// =========================
export async function createResume(
  resume: Resume
): Promise<Resume> {
  const res = await fetch(`${API}/resume/create`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(toBackend(resume)),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Create failed");
  }

  const data = await res.json();

  return toFrontend(data.resume);
}

// =========================
// UPDATE
// =========================
export async function updateResume(
  resume: Resume
): Promise<Resume> {
  const res = await fetch(`${API}/resume/${resume.id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(toBackend(resume)),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Update failed");
  }

  const data = await res.json();

  return toFrontend(data.resume);
}

// =========================
// DELETE
// =========================
export async function deleteResume(
  id: string
): Promise<void> {
  const res = await fetch(`${API}/resume/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error("Delete failed");
  }
}