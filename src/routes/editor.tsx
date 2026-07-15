import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useResumes } from "@/lib/resume-store";
import { emptyResume, type Resume, type Experience, type Project, type Education } from "@/lib/resume-types";
import { ResumePreview } from "@/components/resume-preview";
import { AIGenerateButton } from "@/components/ai-generate-button";
import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Download, ArrowLeft, X } from "lucide-react";
import { toast } from "sonner";

const searchSchema = z.object({ id: z.string().optional() });

export const Route = createFileRoute("/editor")({
  head: () => ({ meta: [{ title: "Editor — Resumely" }] }),
  validateSearch: searchSchema,
  component: EditorPage,
});

function EditorPage() {
  const { id } = Route.useSearch();
  const { get, update, create, hydrated } = useResumes();
  const navigate = useNavigate();
  const [resume, setResume] = useState<Resume>(() => emptyResume());

  useEffect(() => {
  if (!hydrated) return;

  async function loadResume() {
    if (!id) {
      const created = await create(emptyResume());

      navigate({
        to: "/editor",
        search: {
          id: created.id,
        },
        replace: true,
      });

      return;
    }

    const found = get(id);

    if (found) {
      setResume(found);
    }
  }

  loadResume();
}, [hydrated, id]);
  // Persist on change (debounced)
  useEffect(() => {
    if (!hydrated || !id) return;

    const t = setTimeout(() => {
    update(resume);
  }, 300);

  return () => clearTimeout(t);
}, [resume]);

  const patch = (p: Partial<Resume>) => setResume((r) => ({ ...r, ...p }));
  const patchPersonal = (p: Partial<Resume["personal"]>) =>
    setResume((r) => ({ ...r, personal: { ...r.personal, ...p } }));

  const download = () => {
  toast.success("Preparing your resume...", {
    description: "The print dialog will open. Choose 'Save as PDF'.",
  });

  setTimeout(() => {
    window.print();
  }, 500);
};

  return (
    <div className="min-h-screen">
      <div className="no-print">
        <Navbar />
      </div>
      <main className="mx-auto max-w-[1500px] px-4 py-6">
        <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/dashboard"><ArrowLeft className="h-4 w-4" /> Back</Link>
            </Button>
            <Input
              value={resume.title}
              onChange={(e) => patch({ title: e.target.value })}
              className="h-9 max-w-xs font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={resume.template} onValueChange={(v) => patch({ template: v as Resume["template"] })}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={download} className="bg-gradient-brand text-brand-foreground hover:opacity-90">
              <Download className="h-4 w-4" /> Download Resume
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* Editor */}
          <div className="no-print space-y-4">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="w-full flex-wrap justify-start">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="border-border/60 p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Full name" value={resume.personal.fullName} onChange={(v) => patchPersonal({ fullName: v })} />
                    <Field label="Headline" value={resume.personal.headline} onChange={(v) => patchPersonal({ headline: v })} placeholder="e.g. Senior Software Engineer" />
                    <Field label="Email" value={resume.personal.email} onChange={(v) => patchPersonal({ email: v })} />
                    <Field label="Phone" value={resume.personal.phone} onChange={(v) => patchPersonal({ phone: v })} />
                    <Field label="Location" value={resume.personal.location} onChange={(v) => patchPersonal({ location: v })} />
                    <Field label="Website" value={resume.personal.website} onChange={(v) => patchPersonal({ website: v })} />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="summary">
                <Card className="border-border/60 p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <Label>Professional summary</Label>
                    
                  </div>
                  <Textarea
                    rows={6}
                    value={resume.summary}
                    onChange={(e) => patch({ summary: e.target.value })}
                    placeholder="2–4 sentences on who you are, what you do, and the impact you deliver."
                  />
                </Card>
              </TabsContent>

              <TabsContent value="skills">
                <Card className="border-border/60 p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <Label>Skills</Label>
                    <AIGenerateButton
                      section="skills"
                      resume={resume}
                      onResult={(t) => patch({ skills: t.split(",").map((s) => s.trim()).filter(Boolean) })}
                    />
                  </div>
                  <SkillsInput value={resume.skills} onChange={(skills) => patch({ skills })} />
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <ExperienceEditor
                  resume={resume}
                  onChange={(experience) => patch({ experience })}
                />
              </TabsContent>

              <TabsContent value="projects">
                <ProjectsEditor
                  resume={resume}
                  onChange={(projects) => patch({ projects })}
                />
              </TabsContent>

              <TabsContent value="education">
                <EducationEditor
                  value={resume.education}
                  onChange={(education) => patch({ education })}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="no-print mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Live preview
            </div>
            <ResumePreview resume={resume} forPrint />
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function SkillsInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (!v) return;
    if (value.includes(v)) return setInput("");
    onChange([...value, v]);
    setInput("");
  };
  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Add a skill and press Enter"
        />
        <Button type="button" variant="outline" onClick={add}>Add</Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {value.map((s) => (
          <Badge key={s} variant="secondary" className="gap-1">
            {s}
            <button
              type="button"
              onClick={() => onChange(value.filter((x) => x !== s))}
              aria-label={`Remove ${s}`}
              className="ml-1 rounded-full hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {value.length === 0 && (
          <p className="text-sm text-muted-foreground">No skills yet. Try AI Generate.</p>
        )}
      </div>
    </div>
  );
}

function ExperienceEditor({
  resume, onChange,
}: { resume: Resume; onChange: (list: Experience[]) => void }) {
  const list = resume.experience;
  const add = () =>
    onChange([
      ...list,
      { id: crypto.randomUUID(), role: "", company: "", location: "", start: "", end: "", description: "" },
    ]);
  const patchItem = (id: string, p: Partial<Experience>) =>
    onChange(list.map((e) => (e.id === id ? { ...e, ...p } : e)));
  const remove = (id: string) => onChange(list.filter((e) => e.id !== id));

  return (
    <div className="space-y-4">
      {list.map((e) => (
        <Card key={e.id} className="border-border/60 p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Role" value={e.role} onChange={(v) => patchItem(e.id, { role: v })} />
            <Field label="Company" value={e.company} onChange={(v) => patchItem(e.id, { company: v })} />
            <Field label="Location" value={e.location ?? ""} onChange={(v) => patchItem(e.id, { location: v })} />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Start" value={e.start} onChange={(v) => patchItem(e.id, { start: v })} placeholder="2022" />
              <Field label="End" value={e.end} onChange={(v) => patchItem(e.id, { end: v })} placeholder="Present" />
            </div>
          </div>
          <div className="mt-3">
            <div className="mb-2 flex items-center justify-between">
              <Label>Description</Label>
              <AIGenerateButton
                section="experience"
                resume={resume}
                context={`${e.role} at ${e.company}`}
                onResult={(t) => patchItem(e.id, { description: t })}
              />
            </div>
            <Textarea
              rows={4}
              value={e.description}
              onChange={(ev) => patchItem(e.id, { description: ev.target.value })}
              placeholder="• Impact-driven bullet points…"
            />
          </div>
          <div className="mt-3 flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => remove(e.id)}>
              <Trash2 className="h-4 w-4" /> Remove
            </Button>
          </div>
        </Card>
      ))}
      <Button onClick={add} variant="outline" className="w-full">
        <Plus className="h-4 w-4" /> Add experience
      </Button>
    </div>
  );
}

function ProjectsEditor({
  resume, onChange,
}: { resume: Resume; onChange: (list: Project[]) => void }) {
  const list = resume.projects;
  const add = () =>
    onChange([
      ...list,
      { id: crypto.randomUUID(), name: "", link: "", tech: "", description: "" },
    ]);
  const patchItem = (id: string, p: Partial<Project>) =>
    onChange(list.map((e) => (e.id === id ? { ...e, ...p } : e)));
  const remove = (id: string) => onChange(list.filter((e) => e.id !== id));

  return (
    <div className="space-y-4">
      {list.map((p) => (
        <Card key={p.id} className="border-border/60 p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Name" value={p.name} onChange={(v) => patchItem(p.id, { name: v })} />
            <Field label="Link" value={p.link ?? ""} onChange={(v) => patchItem(p.id, { link: v })} />
            <Field label="Tech" value={p.tech ?? ""} onChange={(v) => patchItem(p.id, { tech: v })} placeholder="React, Node.js" />
          </div>
          <div className="mt-3">
            <div className="mb-2 flex items-center justify-between">
              <Label>Description</Label>
              <AIGenerateButton
                section="projects"
                resume={resume}
                context={p.name}
                onResult={(t) => patchItem(p.id, { description: t })}
              />
            </div>
            <Textarea
              rows={3}
              value={p.description}
              onChange={(ev) => patchItem(p.id, { description: ev.target.value })}
            />
          </div>
          <div className="mt-3 flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => remove(p.id)}>
              <Trash2 className="h-4 w-4" /> Remove
            </Button>
          </div>
        </Card>
      ))}
      <Button onClick={add} variant="outline" className="w-full">
        <Plus className="h-4 w-4" /> Add project
      </Button>
    </div>
  );
}

function EducationEditor({
  value, onChange,
}: { value: Education[]; onChange: (list: Education[]) => void }) {
  const add = () =>
    onChange([...value, { id: crypto.randomUUID(), school: "", degree: "", start: "", end: "" }]);
  const patchItem = (id: string, p: Partial<Education>) =>
    onChange(value.map((e) => (e.id === id ? { ...e, ...p } : e)));
  const remove = (id: string) => onChange(value.filter((e) => e.id !== id));

  return (
    <div className="space-y-4">
      {value.map((ed) => (
        <Card key={ed.id} className="border-border/60 p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="School" value={ed.school} onChange={(v) => patchItem(ed.id, { school: v })} />
            <Field label="Degree" value={ed.degree} onChange={(v) => patchItem(ed.id, { degree: v })} />
            <Field label="Start" value={ed.start} onChange={(v) => patchItem(ed.id, { start: v })} />
            <Field label="End" value={ed.end} onChange={(v) => patchItem(ed.id, { end: v })} />
          </div>
          <div className="mt-3 flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => remove(ed.id)}>
              <Trash2 className="h-4 w-4" /> Remove
            </Button>
          </div>
        </Card>
      ))}
      <Button onClick={add} variant="outline" className="w-full">
        <Plus className="h-4 w-4" /> Add education
      </Button>
    </div>
  );
}

// silence unused import warnings
void useMemo;
