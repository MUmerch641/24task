import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Clock, MapPin, ThumbsUp, ArrowRight, Hammer } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Task-Fix" },
      { name: "description", content: "Task-Fix is your local home services team — 10 trades including gardening, painting, plumbing, electrical, removals, handyman jobs and more. Available 24/7." },
      { property: "og:title", content: "About — Task-Fix" },
      { property: "og:description", content: "Local trades you can rely on, round the clock. Meet the team behind Task-Fix." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="bg-accent/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Hammer className="h-3.5 w-3.5 text-primary" /> About Task-Fix
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            One local team. Every job around the home.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            We're a small, hands-on crew covering everything from a stuck tap at 2am to a full house repaint or move. No middlemen, no call centres — just real tradespeople who turn up when they say they will.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Who we are</h2>
            <p className="mt-4 text-muted-foreground">
              Task-Fix started because finding a reliable handyman, plumber or gardener locally shouldn't be a lottery. We bring trades together under one roof so you only need to make one call — whatever the job.
            </p>
            <p className="mt-4 text-muted-foreground">
              Whether it's a quick fix, a half-day of odd jobs, or a full project like a house move or carpet fit, the same team you speak to is the team that shows up.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">What we believe</h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li><span className="font-semibold text-foreground">Turn up on time.</span> If we're running late, you'll hear from us before the slot starts.</li>
              <li><span className="font-semibold text-foreground">Fair, fixed prices.</span> Free quotes. No call-out fees. No "while we're here…" surprises.</li>
              <li><span className="font-semibold text-foreground">Leave it tidy.</span> Dust sheets, hoover, waste taken away. Job done means job cleared.</li>
              <li><span className="font-semibold text-foreground">Round the clock.</span> Emergencies don't wait for office hours. Neither do we.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why people pick us</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              { i: Clock, t: "24/7 cover", d: "Routine bookings 8am–8pm. Emergencies any hour." },
              { i: ShieldCheck, t: "Fully insured", d: "Public liability cover on every job." },
              { i: MapPin, t: "Local & nearby", d: "Town centre + a 20-mile radius. Further on request." },
              { i: ThumbsUp, t: "4.9★ rated", d: "Hundreds of happy local customers." },
            ].map((b) => {
              const Icon = b.i;
              return (
                <div key={b.t} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{b.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{b.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16">
        <div className="overflow-hidden rounded-3xl bg-primary px-8 py-12 text-primary-foreground shadow-lg md:px-14 md:py-16">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Got a job in mind?</h2>
              <p className="mt-2 text-primary-foreground/85">Tell us what's needed — we'll quote it free, usually the same day.</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-background/90"
            >
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
