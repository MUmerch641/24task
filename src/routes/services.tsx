import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — 247 Task Fix" },
      { name: "description", content: "Gardening, painting, cleaning, removals, handyman jobs, carpet fitting, plumbing, man with van and more." },
      { property: "og:title", content: "Services — 247 Task Fix" },
      { property: "og:description", content: "Every service we offer for your home, in one place." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div>
      <section className="bg-accent/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Our services</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Nine reliable services covering most jobs around the house. Free quotes on everything.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="scroll-mt-24 rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{s.name}</h2>
                    <p className="mt-2 text-muted-foreground">{s.long}</p>
                    <Link
                      to="/contact"
                      search={{ service: s.slug }}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      Request this service <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
