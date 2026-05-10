import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";
import { services } from "@/lib/services";
import { z } from "zod";

const searchSchema = z.object({
  service: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — HomeHands" },
      { name: "description", content: "Get a free quote for any home service. We reply fast." },
      { property: "og:title", content: "Contact — HomeHands" },
      { property: "og:description", content: "Tell us about your job and get a free quote." },
    ],
  }),
  validateSearch: searchSchema,
  component: ContactPage,
});

function ContactPage() {
  const { service: preselected } = Route.useSearch();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      setSubmitting(false);
      return;
    }

    // Simulated submit — wire to backend later.
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Thanks! We'll be in touch shortly.");
    (e.target as HTMLFormElement).reset();
    setSubmitting(false);
  }

  return (
    <div>
      <section className="bg-accent/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Get in touch</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Tell us about the job and we'll send a free quote — usually the same day.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-3 md:py-20">
        <div className="space-y-6 md:col-span-1">
          <ContactRow icon={<Phone className="h-5 w-5" />} label="Call us" value="07000 000 000" />
          <ContactRow icon={<Mail className="h-5 w-5" />} label="Email" value="hello@homehands.local" />
          <ContactRow icon={<MapPin className="h-5 w-5" />} label="Service area" value="Across the local area" />
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:col-span-2 md:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium">Service needed</label>
            <select
              name="service"
              defaultValue={preselected ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Not sure / other</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium">Tell us about the job *</label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Roughly what needs doing, where, and any timing preferences."
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send message"}
          </button>
        </form>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}{required && " *"}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">{icon}</div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="mt-0.5 text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
