import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  FileCheck2,
  Eye,
  Wand2,
  Download,
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-hero">
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:pt-28">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-medium text-brand">
                <Sparkles className="h-3 w-3" /> AI-powered resume builder
              </span>
              <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                Build a resume that <span className="bg-gradient-brand bg-clip-text text-transparent">actually gets read</span>.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Craft ATS-friendly resumes in minutes with a live preview, beautiful templates, and
                AI that writes summaries, skills, and experience for you.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-gradient-brand text-brand-foreground shadow-glow hover:opacity-90">
                  <Link to="/signup">
                    Start building free <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/dashboard">See dashboard</Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                No credit card required. Export as PDF anytime.
              </p>
            </div>

            {/* Preview mock */}
            <div className="relative mx-auto mt-16 max-w-5xl">
              <div className="absolute inset-x-8 -bottom-6 h-24 rounded-full bg-brand/30 blur-3xl" />
              <Card className="relative overflow-hidden border-border/60 shadow-elegant">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="border-b border-border/60 p-6 md:border-b-0 md:border-r">
                    <div className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Editor
                    </div>
                    <div className="space-y-3 text-sm">
                      <MockField label="Full name" value="Alex Morgan" />
                      <MockField label="Headline" value="Senior Software Engineer" />
                      <div className="rounded-md border border-border/60 bg-muted/40 p-3">
                        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                          <span>Summary</span>
                          <span className="inline-flex items-center gap-1 text-brand">
                            <Sparkles className="h-3 w-3" /> AI Generate
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed text-foreground/80">
                          Full-stack engineer with 6+ years shipping scalable products. Passionate
                          about clean architecture and mentoring teams.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-6">
                    <div className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Live Preview
                    </div>
                    <div className="rounded-md bg-white p-5 text-[11px] leading-relaxed text-slate-900 shadow-sm">
                      <p className="text-lg font-bold">Alex Morgan</p>
                      <p className="text-slate-600">Senior Software Engineer</p>
                      <div className="mt-3 border-t pt-2 text-[10px] uppercase tracking-widest text-slate-500">
                        Summary
                      </div>
                      <p className="mt-1">
                        Full-stack engineer with 6+ years shipping scalable products…
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Everything you need to stand out</h2>
            <p className="mt-4 text-muted-foreground">
              A calm editor. A gorgeous preview. Smart AI where it counts.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Wand2, title: "AI writing helpers", desc: "One-click generation for summary, skills, experience bullets, and projects." },
              { icon: Eye, title: "Real-time preview", desc: "See changes instantly. Switch templates without losing your data." },
              { icon: FileCheck2, title: "ATS-friendly", desc: "Clean, machine-readable layouts that pass applicant tracking systems." },
              { icon: Download, title: "PDF export", desc: "Download a print-perfect PDF that looks great in any inbox." },
              { icon: ShieldCheck, title: "Yours forever", desc: "Your data stays in your browser. Bring your own AI endpoint anytime." },
              { icon: Sparkles, title: "Dark mode", desc: "Late-night polish sessions? We got you." },
            ].map((f) => (
              <Card key={f.title} className="border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-brand-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Templates */}
        <section id="templates" className="border-y border-border/60 bg-muted/30 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold md:text-4xl">ATS-friendly templates</h2>
                <p className="mt-2 text-muted-foreground">Three clean layouts. Switch anytime.</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/dashboard">Try them in the editor <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {["Classic", "Modern", "Compact"].map((name) => (
                <Card key={name} className="overflow-hidden border-border/60 p-4">
                  <div className="aspect-[8.5/11] rounded-md bg-white p-5 text-[10px] leading-relaxed text-slate-900 shadow-inner">
                    <div className={name === "Modern" ? "border-b-2 border-slate-900 pb-2" : "pb-2"}>
                      <p className="text-base font-bold">Alex Morgan</p>
                      <p className="text-slate-600">Senior Software Engineer</p>
                    </div>
                    <div className="mt-3 text-[9px] uppercase tracking-widest text-slate-500">Summary</div>
                    <p className="mt-1">Full-stack engineer with 6+ years shipping scalable products.</p>
                    <div className="mt-3 text-[9px] uppercase tracking-widest text-slate-500">Experience</div>
                    <p className="mt-1 font-semibold">Senior Software Engineer — Acme</p>
                    <p>Led migration to modular monorepo, cutting build times 60%.</p>
                  </div>
                  <p className="mt-3 text-center text-sm font-medium">{name}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-5xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Simple pricing</h2>
            <p className="mt-4 text-muted-foreground">Start free. Upgrade when you're ready.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Card className="border-border/60 p-8">
              <p className="text-sm font-medium text-muted-foreground">Free</p>
              <p className="mt-2 text-4xl font-bold">$0</p>
              <ul className="mt-6 space-y-2 text-sm">
                {["Unlimited resumes", "All templates", "PDF export", "Dark mode"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-brand" />{f}</li>
                ))}
              </ul>
              <Button asChild className="mt-6 w-full" variant="outline">
                <Link to="/signup">Get started</Link>
              </Button>
            </Card>
            <Card className="relative border-brand/40 p-8 shadow-glow">
              <span className="absolute right-4 top-4 rounded-full bg-gradient-brand px-2 py-0.5 text-xs font-medium text-brand-foreground">Popular</span>
              <p className="text-sm font-medium text-brand">Pro</p>
              <p className="mt-2 text-4xl font-bold">$9<span className="text-base font-normal text-muted-foreground">/mo</span></p>
              <ul className="mt-6 space-y-2 text-sm">
                {["Everything in Free", "Unlimited AI generations", "Advanced templates", "Priority support"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-brand" />{f}</li>
                ))}
              </ul>
              <Button asChild className="mt-6 w-full bg-gradient-brand text-brand-foreground hover:opacity-90">
                <Link to="/signup">Start free trial</Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function MockField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/60 bg-background/60 px-3 py-2">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
