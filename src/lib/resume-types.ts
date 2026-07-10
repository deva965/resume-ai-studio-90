export type Experience = {
  id: string;
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  link?: string;
  tech?: string;
  description: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  start: string;
  end: string;
};

export type Resume = {
  id: string;
  title: string;
  updatedAt: number;
  template: "classic" | "modern" | "compact";
  personal: {
    fullName: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  summary: string;
  skills: string[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
};

export const emptyResume = (id = crypto.randomUUID()): Resume => ({
  id,
  title: "Untitled Resume",
  updatedAt: Date.now(),
  template: "classic",
  personal: {
    fullName: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    website: "",
  },
  summary: "",
  skills: [],
  experience: [],
  projects: [],
  education: [],
});

export const sampleResume = (): Resume => ({
  ...emptyResume(),
  title: "Software Engineer Resume",
  personal: {
    fullName: "Alex Morgan",
    headline: "Senior Software Engineer",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexmorgan.dev",
  },
  summary:
    "Full-stack engineer with 6+ years building scalable web applications. Passionate about clean architecture, developer experience, and shipping impactful products.",
  skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS", "GraphQL", "Docker", "Kubernetes"],
  experience: [
    {
      id: crypto.randomUUID(),
      role: "Senior Software Engineer",
      company: "Acme Corp",
      location: "Remote",
      start: "2022",
      end: "Present",
      description:
        "Led migration to a modular monorepo, cutting build times by 60%. Mentored 4 engineers and drove architecture reviews for a 20-person org.",
    },
    {
      id: crypto.randomUUID(),
      role: "Software Engineer",
      company: "Startup Labs",
      location: "New York, NY",
      start: "2019",
      end: "2022",
      description:
        "Shipped core billing and auth features to 100k+ users. Built CI/CD pipeline reducing deployment time from 30 to 4 minutes.",
    },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      name: "OpenResume",
      link: "github.com/alex/openresume",
      tech: "React, TypeScript, Tailwind",
      description:
        "Open-source resume builder with live preview and ATS-friendly export. 3k+ GitHub stars.",
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      school: "UC Berkeley",
      degree: "B.S. Computer Science",
      start: "2015",
      end: "2019",
    },
  ],
});
