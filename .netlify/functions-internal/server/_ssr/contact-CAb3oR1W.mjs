import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as services } from "./services-MQgwu2r8.mjs";
import { createClient } from "../_libs/supabase__supabase-js.mjs";
import { R as Route$2 } from "./router-DNfsIKhJ.mjs";
import { e as CircleCheck, n as Phone, k as MessageCircle, M as Mail, g as Clock, i as MapPin, C as Check, X, c as ChevronLeft, d as ChevronRight, o as ShieldCheck, a as Award, U as Users } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
const supabaseUrl = "https://wbrvznulgpxbpftczupw.supabase.co";
const supabaseAnonKey = "sb_publishable_VFxZMLcCQayxTymQ1juVKA_msn41TUP";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
function ContactPage() {
  const {
    service: preselected
  } = Route$2.useSearch();
  const [step, setStep] = reactExports.useState(1);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [selectedFiles, setSelectedFiles] = reactExports.useState([]);
  const [formData, setFormData] = reactExports.useState({
    service: preselected ?? "",
    service_datetime: "",
    description: "",
    property_size: "",
    name: "",
    phone: "",
    email: "",
    postcode: ""
  });
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  reactExports.useEffect(() => {
    if (submitted || submitting) return;
    const recentBookings = ["Someone in SW1 booked a Plumbing repair!", "New quote requested for Garden Maintenance in Brighton", "Emergency Locksmith dispatched in London", "Someone just requested a Free Quote for Electrical work"];
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const message = recentBookings[Math.floor(Math.random() * recentBookings.length)];
        toast(message, {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-green-500" }),
          duration: 4e3
        });
      }
    }, 15e3);
    return () => clearInterval(interval);
  }, [submitted, submitting]);
  function onFilesChange(event) {
    const newFiles = Array.from(event.target.files ?? []);
    if (selectedFiles.length + newFiles.length > 3) {
      toast.error("You can only attach up to 3 pictures total.");
      return;
    }
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    event.target.value = "";
  }
  function removeFile(index) {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }
  const validateStep = (s) => {
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
      setStep((s) => s + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
  const prevStep = () => {
    setStep((s) => s - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  async function onSubmit(e) {
    e.preventDefault();
    if (step !== 3) return;
    if (!formData.name || !formData.phone || !formData.email || !formData.postcode) {
      toast.error("Please fill in your contact details.");
      return;
    }
    setSubmitting(true);
    try {
      const photos = await Promise.all(selectedFiles.map(async (file) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `contact-uploads/${fileName}`;
        const {
          error: uploadError
        } = await supabase.storage.from("contact_photos").upload(filePath, file);
        if (uploadError) throw uploadError;
        const {
          data: {
            publicUrl
          }
        } = supabase.storage.from("contact_photos").getPublicUrl(filePath);
        return {
          name: file.name,
          type: file.type,
          size: file.size,
          url: publicUrl
        };
      }));
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
        preferred_service_slug: preselected ?? null
      }).select().maybeSingle();
      const {
        data: inserted,
        error
      } = insertResult;
      if (error) throw error;
      if (inserted?.id) {
        await fetch("/api/send-contact-emails", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            id: inserted.id
          })
        });
      }
      toast.success("Thanks! We received your request.");
      setSubmitted(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Request Sent!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "Thanks for choosing ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Task-Fix" }),
        ". We've received your request for ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formData.service }),
        " and our team is already reviewing it."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-6 text-left space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm uppercase tracking-wider", children: "What Happens Next?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold", children: "1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "An expert will review your job details." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold", children: "2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "We'll send your free quote to ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formData.email }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold", children: "3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "If it's urgent, expect a call on ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formData.phone }),
              "."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => window.location.href = "/", className: "inline-flex items-center justify-center rounded-md bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90", children: "Back to Home" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-accent/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-16 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight md:text-5xl", children: "Get a free quote" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-lg text-muted-foreground", children: "Tell us about the job — we usually reply the same day. For emergencies (leaks, lock-outs, urgent removals), call us 24/7." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-3 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 md:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Your Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { active: step === 1, completed: step > 1, number: 1, title: "The Job", description: "Service & Timing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { active: step === 2, completed: step > 2, number: 2, title: "The Details", description: "Description & Photos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { active: step === 3, completed: step === 3 && submitting, number: 3, title: "Contact Info", description: "Final Details" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5" }), label: "Call us · 24/7", value: "07000 000 000" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }), label: "WhatsApp", value: "07000 000 000" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5" }), label: "Email", value: "hello@task-fix.local" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }), label: "Hours", value: "Bookings 8am–8pm · Emergencies 24/7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5" }), label: "Service area", value: "Town centre + 20-mile radius" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:p-8", children: [
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Step 1: The Job" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium", children: "Service needed *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: [
              services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-4 text-center transition-all ${formData.service === s.slug ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.02]" : "border-border/60 bg-accent/10 hover:border-primary/50 hover:bg-accent/20"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "service", value: s.slug, checked: formData.service === s.slug, className: "sr-only", onChange: () => updateField("service", s.slug) }),
                formData.service === s.slug && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1 right-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider", children: s.name })
              ] }, s.slug)),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-4 text-center transition-all ${formData.service === "other" ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.02]" : "border-border/60 bg-accent/10 hover:border-primary/50 hover:bg-accent/20"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "service", value: "other", checked: formData.service === "other", className: "sr-only", onChange: () => updateField("service", "other") }),
                formData.service === "other" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1 right-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider", children: "Other" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Service date & time *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "service_datetime", type: "datetime-local", required: true, value: formData.service_datetime, onChange: (e) => updateField("service_datetime", e.target.value), className: "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" })
          ] })
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Step 2: The Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Description of the job *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "description", required: true, rows: 6, value: formData.description, onChange: (e) => updateField("description", e.target.value), className: "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring", placeholder: "Tell us what needs doing..." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Property size / room count" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "property_size", type: "text", value: formData.property_size, onChange: (e) => updateField("property_size", e.target.value), placeholder: "e.g. 2-bed flat, 3 rooms", className: "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Pictures (max 3)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", multiple: true, onChange: onFilesChange, className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground" }),
            selectedFiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-3 gap-4", children: selectedFiles.map((file, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: URL.createObjectURL(file), className: "h-full w-full rounded-lg object-cover border border-border", alt: "preview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removeFile(index), className: "absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
            ] }, index)) })
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Step 3: Contact Info" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ControlledField, { label: "Your name", name: "name", value: formData.name, onChange: (v) => updateField("name", v), required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ControlledField, { label: "Phone number", name: "phone", type: "tel", value: formData.phone, onChange: (v) => updateField("phone", v), required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ControlledField, { label: "Email", name: "email", type: "email", value: formData.email, onChange: (v) => updateField("email", v), required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ControlledField, { label: "Postcode", name: "postcode", value: formData.postcode, onChange: (v) => updateField("postcode", v), required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center justify-between border-t border-border/60 pt-6", children: [
          step > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: prevStep, className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "mr-2 h-4 w-4" }),
            " Back"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          step < 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: nextStep, className: "inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90", children: [
            "Next step ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-2 h-4 w-4" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "inline-flex items-center justify-center rounded-md bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60", children: submitting ? "Sending..." : "Submit Quote Request" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-1 gap-4 border-t border-border/60 pt-8 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-green-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider", children: "Fully Insured" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-blue-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider", children: "Vetted Pros" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-purple-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider", children: "Local Experts" })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
function StepIndicator({
  active,
  completed,
  number,
  title,
  description
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-start gap-4 transition-opacity ${!active && !completed ? "opacity-40" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${completed ? "bg-green-500 text-white" : active ? "bg-primary text-white" : "bg-secondary text-secondary-foreground"}`, children: completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) : number }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold leading-none", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: description })
    ] })
  ] });
}
function ControlledField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 block text-sm font-medium", children: [
      label,
      required && " *"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name, type, required, value, onChange: (e) => onChange(e.target.value), placeholder, className: "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" })
  ] });
}
function ContactRow({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-sm font-medium", children: value })
    ] })
  ] });
}
export {
  ContactPage as component
};
