import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, MessageCircle, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { services } from "@/lib/services";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const searchSchema = z.object({
  service: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Get a free quote — Task-Fix" },
      { name: "description", content: "Tell us about the job. Free quote, usually same day. 24/7 emergencies covered." },
      { property: "og:title", content: "Get a free quote — Task-Fix" },
      { property: "og:description", content: "Quick fix, half day or full project — free quotes from your local Task-Fix team." },
    ],
  }),
  validateSearch: searchSchema,
  component: ContactPage,
});

function ContactPage() {
  const { service: preselected } = Route.useSearch();
  const [submitting, setSubmitting] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const required = ["name", "phone", "postcode", "service", "message"];
    for (const k of required) {
      if (!String(fd.get(k) || "").trim()) {
        toast.error("Please fill in all required fields.");
        setSubmitting(false);
        return;
      }
    }
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Thanks! We'll be in touch shortly with your free quote.");
    (e.target as HTMLFormElement).reset();
    setSubmitting(false);
  }

  return (
    <div>
      <section className="bg-accent/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Get a free quote</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Tell us about the job — we usually reply the same day. For emergencies (leaks, lock-outs, urgent removals), call us 24/7.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-3 md:py-20">
        <div className="space-y-6 md:col-span-1">
          <ContactRow icon={<Phone className="h-5 w-5" />} label="Call us · 24/7" value="07000 000 000" />
          <ContactRow icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value="07000 000 000" />
          <ContactRow icon={<Mail className="h-5 w-5" />} label="Email" value="hello@247taskfix.local" />
          <ContactRow icon={<Clock className="h-5 w-5" />} label="Hours" value="Bookings 8am–8pm · Emergencies 24/7" />
          <ContactRow icon={<MapPin className="h-5 w-5" />} label="Service area" value="Town centre + 20-mile radius" />
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:col-span-2 md:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" name="name" required />
            <Field label="Phone" name="phone" type="tel" required />
            <Field label="Email" name="email" type="email" />
            <Field label="Postcode" name="postcode" required />
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Service needed *</label>
              <select
                name="service"
                required
                defaultValue={preselected ?? ""}
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Choose a service…</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
                <option value="other">Something else</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">When do you need it?</label>
              <select
                name="urgency"
                defaultValue=""
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Pick a timeframe…</option>
                <option value="emergency">Emergency — today</option>
                <option value="this-week">This week</option>
                <option value="next-week">Next week or two</option>
                <option value="flexible">Flexible / get a quote first</option>
              </select>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Preferred date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <input type="hidden" name="preferred_date" value={date ? date.toISOString() : ""} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Job size</label>
              <div className="flex flex-wrap gap-2 text-sm">
                {[
                  { v: "quick", l: "Quick fix" },
                  { v: "half-day", l: "Half day" },
                  { v: "project", l: "Full project" },
                ].map((o, i) => (
                  <label key={o.v} className="cursor-pointer rounded-md border border-input bg-background px-3 py-2 has-[:checked]:border-primary has-[:checked]:bg-secondary has-[:checked]:text-secondary-foreground">
                    <input
                      type="radio"
                      name="size"
                      value={o.v}
                      defaultChecked={i === 0}
                      className="mr-2 accent-primary"
                    />
                    {o.l}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium">Tell us about the job *</label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="What needs doing, rough scope, any access notes (parking, stairs, pets). Photos help — feel free to email them after."
            />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            By sending this form you agree we can contact you about your quote. We never share your details.
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send my quote request"}
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
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">{icon}</div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="mt-0.5 text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
