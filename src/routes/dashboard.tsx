import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useResumes } from "@/lib/resume-store";
import { emptyResume } from "@/lib/resume-types";
import { Plus, FileText, Trash2, Pencil } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Resumely" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const { items, hydrated, create, remove } = useResumes();
  const navigate = useNavigate();

  const onCreate = async () => {
    try {
      const resume = emptyResume();
      resume.title = "New Resume";

      const created = await create(resume);

      toast.success("Resume created");

      navigate({
        to: "/editor",
        search: {
          id: created.id,
        },
      });

    } catch (err: any) {
      toast.error(err.message || "Unable to create resume");
    }
  };

  const onDelete = async (id: string) => {
    try {
      await remove(id);

      toast.success("Resume deleted");
    } catch (err: any) {
      toast.error(err.message || "Unable to delete resume");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Your Resumes
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Create, edit and manage your resumes.
            </p>
          </div>

          <Button
            onClick={onCreate}
            className="bg-gradient-brand text-brand-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Resume
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {!hydrated ? (

            [...Array(3)].map((_, i) => (
              <Card
                key={i}
                className="h-48 animate-pulse border-border/60 bg-muted/40"
              />
            ))

          ) : items.length === 0 ? (

            <Card className="col-span-full border-dashed border-border/60 p-10 text-center">

              <FileText className="mx-auto h-8 w-8 text-muted-foreground" />

              <p className="mt-3 font-medium">
                No resumes yet
              </p>

              <Button
                onClick={onCreate}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Resume
              </Button>

            </Card>

          ) : (

            items.map((r) => (

              <Card
                key={r.id}
                className="group border-border/60"
              >

                <div className="p-5">

                  <h3 className="font-semibold">
                    {r.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-1">
                    {r.personal.fullName || "Unnamed"}
                  </p>

                  <p className="text-xs text-muted-foreground mt-2">
                    Updated{" "}
                    {formatDistanceToNow(r.updatedAt, {
                      addSuffix: true,
                    })}
                  </p>

                </div>

                <div className="flex justify-between p-4 border-t">

                  <Button
                    asChild
                    variant="ghost"
                  >
                    <Link
                      to="/editor"
                      search={{
                        id: r.id,
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => onDelete(r.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>

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