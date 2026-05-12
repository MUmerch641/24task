import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — 247 Task Fix" },
      { name: "description", content: "Ten local trades under one team: gardening, painting, cleaning, plumbing, electrical, handyman, carpet removal, carpet fitting, house removals and man with van." },
      { property: "og:title", content: "Services — 247 Task Fix" },
      { property: "og:description", content: "Every service we offer for your home, in one place." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div>
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Our services</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Ten core trades under one local team — and if your job isn't listed, just ask. Free quotes on everything.
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
                className="card-aura group scroll-mt-24 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={s.image}
                    alt={`${s.name} job by 247 Task Fix`}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h2 className="text-xl font-semibold">{s.name}</h2>
                  <p className="mt-2 text-muted-foreground">{s.long}</p>
                  <Link
                    to="/contact"
                    search={{ service: s.slug }}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                  >
                    Request this service <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
          <article className="rounded-2xl border-2 border-dashed border-border bg-card p-6 shadow-sm md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground font-bold">+</div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">And more</h2>
                <p className="mt-2 text-muted-foreground">
                  Got a job that doesn't fit a tidy category? Drilling, jet-washing, fence repairs, gutter clears, TV mounting, lock changes — if it's around the home, ask us. If we can't do it, we'll point you to someone local who can.
                </p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                >
                  Ask about a custom job <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
