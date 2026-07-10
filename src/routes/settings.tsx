import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/use-theme";
import { useEffect, useState } from "react";
import { config } from "@/lib/config";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Resumely" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();
  const [autosave, setAutosave] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [aiUrl, setAiUrl] = useState("");

  useEffect(() => {
    setAutosave(localStorage.getItem("resumely.autosave") !== "false");
    setNotifications(localStorage.getItem("resumely.notifications") !== "false");
    setAiUrl(localStorage.getItem("resumely.aiUrlOverride") ?? "");
  }, []);

  const clearData = () => {
    if (!confirm("Delete all local resumes? This cannot be undone.")) return;
    localStorage.removeItem("resumely.resumes.v1");
    toast.success("All resumes cleared");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage preferences and integrations.</p>

        <Card className="mt-6 divide-y divide-border/60 border-border/60 p-0">
          <Row
            label="Dark mode"
            hint="Switch between light and dark themes."
            control={<Switch checked={theme === "dark"} onCheckedChange={toggle} />}
          />
          <Row
            label="Autosave"
            hint="Automatically save changes as you type."
            control={
              <Switch
                checked={autosave}
                onCheckedChange={(v) => {
                  setAutosave(v);
                  localStorage.setItem("resumely.autosave", String(v));
                }}
              />
            }
          />
          <Row
            label="Email notifications"
            hint="Occasional tips and product updates."
            control={
              <Switch
                checked={notifications}
                onCheckedChange={(v) => {
                  setNotifications(v);
                  localStorage.setItem("resumely.notifications", String(v));
                }}
              />
            }
          />
        </Card>

        <Card className="mt-6 border-border/60 p-6">
          <div>
            <Label htmlFor="ai-url">AI endpoint URL</Label>
            <p className="mt-1 text-xs text-muted-foreground">
              Configured via <code className="rounded bg-muted px-1">VITE_AI_API_URL</code>. You can override for this browser below.
            </p>
            <div className="mt-3 flex gap-2">
              <Input
                id="ai-url"
                value={aiUrl}
                onChange={(e) => setAiUrl(e.target.value)}
                placeholder={config.aiApiUrl || "https://your-ai-endpoint.example.com/generate"}
              />
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.setItem("resumely.aiUrlOverride", aiUrl);
                  toast.success("Saved");
                }}
              >
                Save
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-xs text-muted-foreground">
            <p>API base: <code>{config.apiUrl || "not configured"}</code></p>
            <p>AI URL: <code>{config.aiApiUrl || "not configured (using mock)"}</code></p>
          </div>
        </Card>

        <Card className="mt-6 border-destructive/30 p-6">
          <p className="font-medium text-destructive">Danger zone</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Permanently delete all resumes stored in this browser.
          </p>
          <Button variant="destructive" className="mt-4" onClick={clearData}>
            Delete all resumes
          </Button>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

function Row({ label, hint, control }: { label: string; hint: string; control: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-6">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </div>
      {control}
    </div>
  );
}
