import type { Resume } from "@/lib/resume-types";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

type Props = { resume: Resume; forPrint?: boolean };

export function ResumePreview({ resume, forPrint = false }: Props) {
  const t = resume.template;
  return (
    <div
      id={forPrint ? "resume-print" : undefined}
      className={
        "mx-auto w-full max-w-[8.5in] rounded-lg bg-white p-10 text-[13px] leading-relaxed text-slate-900 shadow-elegant " +
        (forPrint ? "" : "")
      }
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Header */}
      <header className={t === "modern" ? "border-b-4 border-slate-900 pb-4" : "pb-4"}>
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "inherit" }}>
          {resume.personal.fullName || "Your Name"}
        </h1>
        {resume.personal.headline && (
          <p className="mt-1 text-sm font-medium text-slate-600">{resume.personal.headline}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          {resume.personal.email && (
            <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{resume.personal.email}</span>
          )}
          {resume.personal.phone && (
            <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{resume.personal.phone}</span>
          )}
          {resume.personal.location && (
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{resume.personal.location}</span>
          )}
          {resume.personal.website && (
            <span className="inline-flex items-center gap-1"><Globe className="h-3 w-3" />{resume.personal.website}</span>
          )}
        </div>
      </header>

      {resume.summary && (
        <Section title="Summary" template={t}>
          <p className="whitespace-pre-wrap">{resume.summary}</p>
        </Section>
      )}

      {resume.skills.length > 0 && (
        <Section title="Skills" template={t}>
          <p>{resume.skills.join(" • ")}</p>
        </Section>
      )}

      {resume.experience.length > 0 && (
        <Section title="Experience" template={t}>
          <div className="space-y-4">
            {resume.experience.map((e) => (
              <div key={e.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold">
                    {e.role}
                    {e.company && <span className="font-normal text-slate-600"> — {e.company}</span>}
                  </p>
                  <p className="text-xs text-slate-600">
                    {e.start}{e.end && ` – ${e.end}`}{e.location && ` · ${e.location}`}
                  </p>
                </div>
                {e.description && (
                  <p className="mt-1 whitespace-pre-wrap text-slate-700">{e.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {resume.projects.length > 0 && (
        <Section title="Projects" template={t}>
          <div className="space-y-3">
            {resume.projects.map((p) => (
              <div key={p.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold">
                    {p.name}
                    {p.tech && <span className="font-normal text-slate-600"> — {p.tech}</span>}
                  </p>
                  {p.link && <p className="text-xs text-slate-600">{p.link}</p>}
                </div>
                {p.description && (
                  <p className="mt-1 whitespace-pre-wrap text-slate-700">{p.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {resume.education.length > 0 && (
        <Section title="Education" template={t}>
          <div className="space-y-2">
            {resume.education.map((ed) => (
              <div key={ed.id} className="flex flex-wrap items-baseline justify-between gap-2">
                <p><span className="font-semibold">{ed.degree}</span>{ed.school && ` — ${ed.school}`}</p>
                <p className="text-xs text-slate-600">{ed.start}{ed.end && ` – ${ed.end}`}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  children,
  template,
}: {
  title: string;
  children: React.ReactNode;
  template: Resume["template"];
}) {
  return (
    <section className="mt-5">
      <h2
        className={
          "mb-2 text-xs font-bold uppercase tracking-[0.18em] " +
          (template === "modern"
            ? "text-slate-900"
            : template === "compact"
              ? "border-b border-slate-300 pb-1 text-slate-800"
              : "text-slate-700")
        }
        style={{ fontFamily: "inherit" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
