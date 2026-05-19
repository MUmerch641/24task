import { createFileRoute } from "@tanstack/react-router";
import { type ChangeEvent, type FormEvent, type ReactNode, useState, useRef, useEffect } from "react";
import { Mail, MessageCircle, Clock, MapPin, Phone, X, ChevronRight, ChevronLeft, CheckCircle2, ShieldCheck, Award, Users, Check } from "lucide-react";
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

type FormStep = 1 | 2 | 3;

function ContactPage() {
  const { service: preselected } = Route.useSearch();
  const [step, setStep] = useState<FormStep>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // Controlled form state to persist data across steps
  const [formData, setFormData] = useState({
    service: preselected ?? "",
    service_datetime: "",
    description: "",
    property_size: "",
    name: "",
    phone: "",
    email: "",
    postcode: ""
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (submitted || submitting) return; // Don't show social proof while submitting or after success

    const recentBookings = [
      "Someone in SW1 booked a Plumbing repair!",
      "New quote requested for Garden Maintenance in Brighton",
      "Emergency Locksmith dispatched in London",
      "Someone just requested a Free Quote for Electrical work"
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const message = recentBookings[Math.floor(Math.random() * recentBookings.length)];
        toast(message, {
          icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
          duration: 4000,
        });
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [submitted, submitting]);

  function onFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(event.target.files ?? []);
    if (selectedFiles.length + newFiles.length > 3) {
      toast.error("You can only attach up to 3 pictures total.");
      return;
    }
    setSelectedFiles(prev => [...prev, ...newFiles]);
    event.target.value = "";
  }

  function removeFile(index: number) {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  }

  const validateStep = (s: FormStep) => {
    if (s === 1) {
      if (!formData.service || !formData.service_datetime) {
        toast.error("Please select a service and a preferred time.");
        return false;
      }
    } else if (s === 2) {
      if (!formData.description || formData.description.trim().length < 10) {
        toast.error("Please provide a brief description (min 10 characters).");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => (s + 1) as FormStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep((s) => (s - 1) as FormStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step !== 3) return;

    if (!formData.name || !formData.phone || !formData.email || !formData.postcode) {
      toast.error("Please fill in your contact details.");
      return;
    }

    setSubmitting(true);

    try {
      const photos = await Promise.all(
        selectedFiles.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
          const filePath = `contact-uploads/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('contact_photos')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('contact_photos')
            .getPublicUrl(filePath);

          return { name: file.name, type: file.type, size: file.size, url: publicUrl };
        }),
      );

      const insertResult = await supabase.from("contact_requests").insert({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        postcode: formData.postcode,
        service: formData.service,
        service_datetime: new Date(formData.service_datetime).toISOString(),
        property_size: formData.property_size || null,
        description: formData.description,
        photos,
        status: "new",
        source: "website-contact-form",
        preferred_service_slug: preselected ?? null,
      }).select().maybeSingle();

      const { data: inserted, error } = insertResult as any;
      if (error) throw error;

      if (inserted?.id) {
        await fetch("/api/send-contact-emails", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: inserted.id }),
        });
      }

      toast.success("Thanks! We received your request.");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Submission error:", err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold">Request Sent!</h1>
          <p className="text-muted-foreground">
            Thanks for choosing <strong>Task-Fix</strong>. We've received your request for <strong>{formData.service}</strong> and our team is already reviewing it.
          </p>
          
          <div className="rounded-2xl border border-border/60 bg-card p-6 text-left space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">What Happens Next?</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">1</div>
                <span>An expert will review your job details.</span>
              </li>
              <li className="flex gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">2</div>
                <span>We'll send your free quote to <strong>{formData.email}</strong>.</span>
              </li>
              <li className="flex gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">3</div>
                <span>If it's urgent, expect a call on <strong>{formData.phone}</strong>.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => window.location.href = "/"}
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
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
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your Progress</h3>
            <div className="space-y-6">
              <StepIndicator
                active={step === 1}
                completed={step > 1}
                number={1}
                title="The Job"
                description="Service & Timing"
              />
              <StepIndicator
                active={step === 2}
                completed={step > 2}
                number={2}
                title="The Details"
                description="Description & Photos"
              />
              <StepIndicator
                active={step === 3}
                completed={step === 3 && submitting}
                number={3}
                title="Contact Info"
                description="Final Details"
              />
            </div>
          </div>

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

        <div className="md:col-span-2">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:p-8"
          >
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold">Step 1: The Job</h2>
                <div>
                  <label className="mb-2 block text-sm font-medium">Service needed *</label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {services.map((s) => (
                      <label
                        key={s.slug}
                        className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-4 text-center transition-all ${
                          formData.service === s.slug
                            ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.02]"
                            : "border-border/60 bg-accent/10 hover:border-primary/50 hover:bg-accent/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={s.slug}
                          checked={formData.service === s.slug}
                          className="sr-only"
                          onChange={() => updateField("service", s.slug)}
                        />
                        {formData.service === s.slug && (
                          <div className="absolute top-1 right-1">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                        <span className="text-xs font-bold uppercase tracking-wider">{s.name}</span>
                      </label>
                    ))}
                    <label
                      className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-4 text-center transition-all ${
                        formData.service === "other"
                          ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.02]"
                          : "border-border/60 bg-accent/10 hover:border-primary/50 hover:bg-accent/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value="other"
                        checked={formData.service === "other"}
                        className="sr-only"
                        onChange={() => updateField("service", "other")}
                      />
                      {formData.service === "other" && (
                        <div className="absolute top-1 right-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                      <span className="text-xs font-bold uppercase tracking-wider">Other</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Service date & time *</label>
                  <input
                    name="service_datetime"
                    type="datetime-local"
                    required
                    value={formData.service_datetime}
                    onChange={(e) => updateField("service_datetime", e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold">Step 2: The Details</h2>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Description of the job *</label>
                  <textarea
                    name="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Tell us what needs doing..."
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Property size / room count</label>
                  <input
                    name="property_size"
                    type="text"
                    value={formData.property_size}
                    onChange={(e) => updateField("property_size", e.target.value)}
                    placeholder="e.g. 2-bed flat, 3 rooms"
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Pictures (max 3)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onFilesChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground"
                  />
                  {selectedFiles.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="relative aspect-square group">
                          <img
                            src={URL.createObjectURL(file)}
                            className="h-full w-full rounded-lg object-cover border border-border"
                            alt="preview"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold">Step 3: Contact Info</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <ControlledField label="Your name" name="name" value={formData.name} onChange={(v) => updateField("name", v)} required />
                  <ControlledField label="Phone number" name="phone" type="tel" value={formData.phone} onChange={(v) => updateField("phone", v)} required />
                  <ControlledField label="Email" name="email" type="email" value={formData.email} onChange={(v) => updateField("email", v)} required />
                  <ControlledField label="Postcode" name="postcode" value={formData.postcode} onChange={(v) => updateField("postcode", v)} required />
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  Next step <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Submit Quote Request"}
                </button>
              )}
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-border/60 pt-8 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-5 w-5 text-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Vetted Pros</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5 text-purple-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Local Experts</span>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function StepIndicator({ active, completed, number, title, description }: { 
  active: boolean; completed: boolean; number: number; title: string; description: string 
}) {
  return (
    <div className={`flex items-start gap-4 transition-opacity ${!active && !completed ? "opacity-40" : ""}`}>
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
        completed ? "bg-green-500 text-white" : active ? "bg-primary text-white" : "bg-secondary text-secondary-foreground"
      }`}>
        {completed ? <CheckCircle2 className="h-4 w-4" /> : number}
      </div>
      <div>
        <div className="text-sm font-bold leading-none">{title}</div>
        <div className="mt-1 text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
}

function ControlledField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (val: string) => void;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
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
