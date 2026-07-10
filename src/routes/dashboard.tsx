import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useResumes } from "@/lib/resume-store";
import { Plus, FileText, Trash2, Pencil } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Resumely" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const { items, hydrated, create, remove } = useResumes();
  const navigate = useNavigate();

  const onCreate = () => {
    const r = create();
    navigate({ to: "/editor", search: { id: r.id } });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your resumes</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create, edit, and export ATS-friendly resumes.
            </p>
          </div>
          <Button onClick={onCreate} className="bg-gradient-brand text-brand-foreground hover:opacity-90">
            <Plus className="h-4 w-4" /> New resume
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {!hydrated ? (
            [...Array(3)].map((_, i) => (
              <Card key={i} className="h-48 animate-pulse border-border/60 bg-muted/40" />
            ))
          ) : items.length === 0 ? (
            <Card className="col-span-full border-dashed border-border/60 p-10 text-center">
              <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 font-medium">No resumes yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Create your first resume to get started.</p>
              <Button onClick={onCreate} className="mt-4 bg-gradient-brand text-brand-foreground hover:opacity-90">
                <Plus className="h-4 w-4" /> Create resume
              </Button>
            </Card>
          ) : (
            items.map((r) => (
              <Card key={r.id} className="group flex flex-col overflow-hidden border-border/60 p-0 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                <Link
                  to="/editor"
                  search={{ id: r.id }}
                  className="relative flex h-40 items-stretch justify-center bg-muted/30 p-4"
                >
                  <div className="w-full max-w-[9rem] rounded-sm bg-white p-3 text-[8px] leading-tight text-slate-900 shadow-sm">
                    <p className="text-[11px] font-bold">{r.personal.fullName || "Untitled"}</p>
                    <p className="text-slate-600">{r.personal.headline || "\u00a0"}</p>
                    <div className="mt-2 h-[1px] bg-slate-200" />
                    <p className="mt-2 uppercase tracking-wider text-slate-500">Summary</p>
                    <p className="line-clamp-2">{r.summary || "\u00a0"}</p>
                    <p className="mt-2 uppercase tracking-wider text-slate-500">Skills</p>
                    <p className="line-clamp-1">{r.skills.join(" · ") || "\u00a0"}</p>
                  </div>
                </Link>
                <div className="flex items-center justify-between border-t border-border/60 p-4">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{r.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Updated {formatDistanceToNow(r.updatedAt, { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button asChild variant="ghost" size="icon" aria-label="Edit">
                      <Link to="/editor" search={{ id: r.id }}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Delete"
                      onClick={() => remove(r.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
