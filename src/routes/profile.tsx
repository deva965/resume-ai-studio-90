import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { getUser, signIn } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Resumely" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const u = getUser();
    if (u) {
      setName(u.name);
      setEmail(u.email);
    }
    setBio(localStorage.getItem("resumely.bio") ?? "");
  }, []);

  const save = () => {
    signIn({ name, email });
    localStorage.setItem("resumely.bio", bio);
    toast.success("Profile saved");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Basic info used across your resumes.
        </p>

        <Card className="mt-6 border-border/60 p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gradient-brand text-brand-foreground text-lg font-semibold">
                {name.slice(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{name || "Your name"}</p>
              <p className="text-sm text-muted-foreground">{email || "you@example.com"}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <Label htmlFor="bio">Short bio</Label>
            <Textarea id="bio" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A sentence or two about you." />
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={save} className="bg-gradient-brand text-brand-foreground hover:opacity-90">Save changes</Button>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
