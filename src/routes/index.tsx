import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MessageSquareQuote, ShieldCheck, Clock, Star } from "lucide-react";
import { services } from "@/lib/services";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/40 via-background to-background" />
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Trusted local team · Free quotes
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Reliable home services. <span className="text-primary">One call, every job done.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              From gardening and painting to plumbing and removals — friendly, fairly-priced help for every job around your home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Get a free quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                See all services
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Fully insured</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Same-week slots</span>
              <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> 4.9/5 rated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What we do</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Nine services covering most jobs around the house — inside and out.
            </p>
          </div>
          <Link to="/services" className="text-sm font-semibold text-primary hover:underline">
            View all services →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                to="/services"
                hash={s.slug}
                className="group rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How it works</h2>
          <p className="mt-2 text-muted-foreground">Free quotes. No call-out fee. Fixed prices on most jobs.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Tell us the job", d: "Send a quick message describing what needs doing — photos help." },
              { n: "02", t: "Get a free quote", d: "We reply fast with a fair, fixed price and the next available slot." },
              { n: "03", t: "We turn up and do it", d: "On time, tidy, and we don't leave until you're happy with the result." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="text-sm font-mono font-semibold text-primary">{s.n}</div>
                <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What customers say</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { q: "Painted the whole upstairs in two days. Spotless finish, lovely guys.", n: "Sarah M.", r: "Painting" },
            { q: "Sorted a leaky tap and put up shelves the same visit. Brilliant.", n: "James T.", r: "Handyman" },
            { q: "Moved our 3-bed across town with zero stress. Highly recommend.", n: "Priya K.", r: "Removals" },
          ].map((t) => (
            <figure key={t.n} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <MessageSquareQuote className="h-6 w-6 text-primary" />
              <blockquote className="mt-3 text-foreground">"{t.q}"</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{t.n}</span> · {t.r}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="overflow-hidden rounded-3xl bg-primary px-8 py-12 text-primary-foreground shadow-lg md:px-14 md:py-16">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Got a job in mind?</h2>
              <p className="mt-2 text-primary-foreground/85">Tell us what you need — we'll reply with a free quote.</p>
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
