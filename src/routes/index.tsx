import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MessageSquareQuote, ShieldCheck, Clock, Star, MoreHorizontal, Wrench, Hourglass, ClipboardList } from "lucide-react";
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
              Every job, <span className="bg-accent px-2 py-0.5 text-accent-foreground">sorted.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              From a leaky tap at midnight to a full house repaint — one local team, fair prices, and we actually turn up.
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
              <span className="inline-flex items-center gap-2"><Wrench className="h-4 w-4 text-primary" /> 9 services</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> 24/7</span>
              <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> 4.9★</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Fully insured</span>
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
              Nine core services covering most jobs around the house — and if it's not listed, just ask.
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
          <Link
            to="/contact"
            className="group rounded-2xl border border-dashed border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
              <MoreHorizontal className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">And more</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">If it's a job around the home, chances are we can do it. Just ask.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Ask us <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
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

      {/* Pricing */}
      <section className="bg-secondary/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Simple, fair pricing</h2>
            <p className="mt-2 text-muted-foreground">No call-out fees. No surprises. Pay for the job, not the jargon.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Wrench,
                name: "Quick fix",
                price: "£39",
                unit: "/hr",
                desc: "Small repairs, leaks, flat-pack, odd jobs around the home.",
                features: ["1-hour minimum", "Tools & basic materials", "Fully insured"],
              },
              {
                icon: Hourglass,
                name: "Half day",
                price: "£149",
                unit: "/4 hrs",
                desc: "Multiple small jobs, a room repaint touch-up, garden tidy.",
                features: ["Up to 4 hours on-site", "Materials at cost", "Waste removed", "Fully insured"],
                featured: true,
              },
              {
                icon: ClipboardList,
                name: "Full project",
                price: "Custom",
                unit: "quote",
                desc: "Removals, full repaints, carpet fits, larger plumbing work.",
                features: ["Free on-site survey", "Fixed-price quote", "Materials & waste included", "Fully insured"],
              },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className={
                    "rounded-2xl border bg-card p-6 shadow-sm md:p-8 " +
                    (p.featured ? "border-primary shadow-md ring-1 ring-primary/20" : "border-border/60")
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    {p.featured && (
                      <span className="ml-auto rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                    <span className="text-sm text-muted-foreground">{p.unit}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={
                      "mt-6 inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold transition-colors " +
                      (p.featured
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-input bg-background text-foreground hover:bg-accent")
                    }
                  >
                    Get a quote
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/40 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Frequently asked questions</h2>
          <p className="mt-2 text-muted-foreground">
            Quick answers about 247 Task Fix and how we work.
          </p>
          <Accordion type="single" collapsible className="mt-8 w-full">
            <AccordionItem value="services">
              <AccordionTrigger>What jobs do you actually cover?</AccordionTrigger>
              <AccordionContent>
                Nine core services: gardening, painting, cleaning, house removals,
                handyman jobs, carpet removal, carpet fitting, plumbing and man with
                van. If your job isn't on the list, ask anyway — most home tasks fall
                under one of our trades.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="hours">
              <AccordionTrigger>Are you really available 24/7?</AccordionTrigger>
              <AccordionContent>
                Yes. Routine bookings run 8am–8pm every day, and we take emergency
                callouts (leaks, blockages, lock-outs, urgent removals) round the
                clock. Nights and Sundays carry a small out-of-hours rate.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="turnaround">
              <AccordionTrigger>How quickly can you get the job done?</AccordionTrigger>
              <AccordionContent>
                Most quotes go back the same day. Small jobs (handyman, plumbing
                fixes, man with van) usually fit in the same week — often within 48
                hours. Larger work like full house removals, repaints or carpet fits
                is typically booked 1–2 weeks ahead.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="area">
              <AccordionTrigger>What area do you cover?</AccordionTrigger>
              <AccordionContent>
                The local town and surrounding villages within roughly a 20-mile
                radius. Removals and man-with-van jobs go further afield — just send
                pickup and drop-off postcodes and we'll quote for travel.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pricing">
              <AccordionTrigger>How does pricing work?</AccordionTrigger>
              <AccordionContent>
                Free quotes, no call-out fees. Quick fix jobs are £39/hour
                (1-hour minimum). Half day is £149 for up to four hours of stacked
                jobs. Larger work is quoted as a fixed-price project after a free
                survey. Materials at cost; waste removal included on half-day and
                project work.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="insured">
              <AccordionTrigger>Are you insured and vetted?</AccordionTrigger>
              <AccordionContent>
                Yes — fully insured with public liability cover on every job. Our
                tradespeople are local, vetted, and the same person you book is the
                one who turns up.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="payment">
              <AccordionTrigger>How do I pay?</AccordionTrigger>
              <AccordionContent>
                Bank transfer or card, on completion. We send a clear invoice with
                a breakdown of labour, materials and any extras agreed on the day.
                No deposit needed for most jobs — projects over £500 take a small
                booking deposit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="quote-info">
              <AccordionTrigger>What should I include in a quote request?</AccordionTrigger>
              <AccordionContent>
                The more detail, the more accurate the quote. Useful things to share:
                <ul className="mt-3 list-disc space-y-1.5 pl-5">
                  <li>Which service you need (or a short description of the job)</li>
                  <li>Your postcode or rough location</li>
                  <li>Rough size or scope (e.g. "two bedrooms", "small front lawn", "3-bed end-of-tenancy")</li>
                  <li>How soon you need it — emergency, this week, flexible</li>
                  <li>A couple of photos if it helps show the work</li>
                  <li>Access notes — parking, stairs, pets, key safe, etc.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="overflow-hidden rounded-3xl bg-primary px-8 py-12 text-primary-foreground shadow-lg md:px-14 md:py-16">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">One number. Every job.</h2>
              <p className="mt-2 text-primary-foreground/85">Tell us what's broken, blocked, overgrown or half-finished — we'll quote it free, 24/7.</p>
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
