import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { login } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Sign in — Resumely" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(email, password);

      toast.success("Login successful!");

      navigate({
        to: "/dashboard",
      });

    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      <main className="mx-auto flex max-w-md flex-col justify-center px-6 py-16">
        <Card className="border-border/60 p-8 shadow-elegant">

          <h1 className="text-2xl font-bold">
            Welcome back
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to continue building your resume.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">

            <div className="space-y-1.5">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-brand text-brand-foreground hover:opacity-90"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-brand hover:underline"
            >
              Create one
            </Link>
          </p>

        </Card>
      </main>

      <Footer />
    </div>
  );
}
