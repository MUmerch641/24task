import { createFileRoute } from "@tanstack/react-router";
import { type ChangeEvent, type FormEvent, type ReactNode, useState } from "react";
import { Mail, MessageCircle, Clock, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { services } from "@/lib/services";
import { supabase } from "@/lib/supabase";

const searchSchema = z.object({
  service: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Get a free quote — Task-Fix" },
      {
        name: "description",
        content: "Tell us about the job. Free quote, usually same day. 24/7 emergencies covered.",
      },
      { property: "og:title", content: "Get a free quote — Task-Fix" },
      {
        property: "og:description",
        content: "Quick fix, half day or full project — free quotes from your local Task-Fix team.",
      },
    ],
  }),
  validateSearch: searchSchema,
  component: ContactPage,
});

function ContactPage() {
  const { service: preselected } = Route.useSearch();
  const [submitting, setSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  function onFilesChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedFiles(Array.from(event.target.files ?? []));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const postcode = String(fd.get("postcode") ?? "").trim();
    const service = String(fd.get("service") ?? "").trim();
    const serviceDatetime = String(fd.get("service_datetime") ?? "").trim();
    const description = String(fd.get("description") ?? "").trim();
    const propertySize = String(fd.get("property_size") ?? "").trim();

    if (!name || !phone || !email || !postcode || !service || !serviceDatetime || !description) {
      toast.error("Please fill in all required fields.");
      setSubmitting(false);
      return;
    }

    if (selectedFiles.length > 3) {
      toast.error("Please attach up to 3 pictures only.");
      setSubmitting(false);
      return;
    }

    const oversizedFile = selectedFiles.find((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFile) {
      toast.error(`${oversizedFile.name} is too large. Keep each image under 5 MB.`);
      setSubmitting(false);
      return;
    }

    const photos = await Promise.all(
      selectedFiles.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `contact-uploads/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('contact_photos')
          .upload(filePath, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('contact_photos')
          .getPublicUrl(filePath);

        return {
          name: file.name,
          type: file.type,
          size: file.size,
          url: publicUrl,
        };
      }),
    );

    const insertResult = await supabase.from("contact_requests").insert({
      name,
      phone,
      email: email || null,
      postcode,
      service,
      service_datetime: new Date(serviceDatetime).toISOString(),
      property_size: propertySize || null,
      description,
      photos,
      status: "new",
      source: "website-contact-form",
      preferred_service_slug: preselected ?? null,
    }).select().maybeSingle();

    const { data: inserted, error } = insertResult as any;

    if (error) {
      toast.error(error.message);
      setSubmitting(false);
      return;
    }

    // fire server-side email job (best-effort)
    try {
      if (inserted?.id) {
        await fetch("/api/send-contact-emails", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: inserted.id }),
        });
      }
    } catch (err) {
      console.error("email webhook failed", err);
    }

    toast.success("Thanks! We received your request and will get back to you soon.");
    form.reset();
    setSelectedFiles([]);
    setSubmitting(false);
  }

  return (
    <div>
      <section className="bg-accent/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Get a free quote</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Tell us about the job — we usually reply the same day. For emergencies (leaks,
            lock-outs, urgent removals), call us 24/7.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-3 md:py-20">
        <div className="space-y-6 md:col-span-1">
          <ContactRow
            icon={<Phone className="h-5 w-5" />}
            label="Call us · 24/7"
            value="07000 000 000"
          />
          <ContactRow
            icon={<MessageCircle className="h-5 w-5" />}
            label="WhatsApp"
            value="07000 000 000"
          />
          <ContactRow
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            value="hello@task-fix.local"
          />
          <ContactRow
            icon={<Clock className="h-5 w-5" />}
            label="Hours"
            value="Bookings 8am–8pm · Emergencies 24/7"
          />
          <ContactRow
            icon={<MapPin className="h-5 w-5" />}
            label="Service area"
            value="Town centre + 20-mile radius"
          />
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:col-span-2 md:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" name="name" required />
            <Field label="Phone number" name="phone" type="tel" required />
            <Field label="Email" name="email" type="email" placeholder="you@domain.com" required />
            <Field
              label="Postcode"
              name="postcode"
              required
            />
            <Field
              label="Property size / room count"
              name="property_size"
              placeholder="e.g. 2-bed flat, 3 rooms, large garden"
            />
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
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
                <option value="other">Something else</option>
              </select>
            </div>
            <Field
              label="Service date & time *"
              name="service_datetime"
              type="datetime-local"
              required
            />
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium">Description of the job *</label>
            <textarea
              name="description"
              required
              rows={6}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Tell us what needs doing, how many rooms or how large the area is, any access notes, and anything else we should know."
            />
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium">Pictures</label>
            <input
              type="file"
              name="pictures"
              accept="image/*"
              multiple
              onChange={onFilesChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              You can attach up to 3 pictures. Each image should be under 5 MB.
            </p>
            {selectedFiles.length > 0 && (
              <p className="mt-2 text-xs font-medium text-foreground">
                {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            By sending this form you agree we can contact you about your quote. We never share your
            details.
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

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">
        {label}
        {required && " *"}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error(`Unable to read ${file.name}`));
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error(`Unable to read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

function ContactRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
        <div className="mt-0.5 text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
