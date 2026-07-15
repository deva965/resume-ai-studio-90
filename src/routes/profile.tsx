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
import { getUser } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [{ title: "Profile — Resumely" }],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const user = getUser();

    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    setBio(localStorage.getItem("resumely.bio") || "");
  }, []);

  const save = () => {
    // Only saving bio locally for now.
    // Later we'll connect this to a backend profile API.
    localStorage.setItem("resumely.bio", bio);

    toast.success("Profile saved");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile information.
        </p>

        <Card className="mt-6 border-border/60 p-6">

          <div className="flex items-center gap-4">

            <Avatar className="h-16 w-16">

              <AvatarFallback className="bg-gradient-brand text-brand-foreground text-lg font-semibold">

                {(name || "U").slice(0, 2).toUpperCase()}

              </AvatarFallback>

            </Avatar>

            <div>
              <p className="font-medium">
                {name || "Your Name"}
              </p>

              <p className="text-sm text-muted-foreground">
                {email || "you@example.com"}
              </p>
            </div>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            <div className="space-y-1.5">

              <Label htmlFor="name">
                Full Name
              </Label>

              <Input
                id="name"
                value={name}
                readOnly
              />

            </div>

            <div className="space-y-1.5">

              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                value={email}
                readOnly
              />

            </div>

          </div>

          <div className="mt-4 space-y-1.5">

            <Label htmlFor="bio">
              Short Bio
            </Label>

            <Textarea
              id="bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us something about yourself..."
            />

          </div>

          <div className="mt-6 flex justify-end">

            <Button
              onClick={save}
              className="bg-gradient-brand text-brand-foreground"
            >
              Save Bio
            </Button>

          </div>

        </Card>

      </main>

      <Footer />
    </div>
  );
}