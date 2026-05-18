import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as services } from "./services-MQgwu2r8.mjs";
import { R as Root2, I as Item, H as Header, T as Trigger2, C as Content2 } from "../_libs/radix-ui__react-accordion.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { o as Sparkles, A as ArrowRight, m as Phone, W as Wrench, f as Clock, q as Star, n as ShieldCheck, D as Droplet, l as PaintRoller, Z as Zap, p as Sprout, r as Truck, E as Ellipsis, k as MessageSquareQuote, g as Hourglass, e as ClipboardList, d as CircleCheck, a as ChevronDown } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const heroHouse = "/assets/hero-house-BBFBiZS2.png";
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-aurora animate-aurora opacity-90" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background/40 to-background" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-20 md:grid-cols-2 md:items-center md:pt-20 md:pb-28", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-accent" }),
            " Trusted local team · Free quotes · 24/7"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl", children: [
            "Every job,",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-trade-gradient", children: "sorted." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-0 h-1 w-full rounded-full bg-trade-gradient opacity-70" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-muted-foreground", children: "From a leaky tap at midnight to a full house repaint — one local team of plumbers, painters, electricians, gardeners and more. Fair prices, and we actually turn up." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "shimmer-cta glow-yellow inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-primary/90", children: [
              "Get a free quote ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:07000000000", className: "inline-flex items-center gap-2 rounded-md border-2 border-primary bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-accent" }),
              " Call 24/7"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex flex-wrap gap-3", children: [{
            i: Wrench,
            l: "10 services",
            sub: "under one team"
          }, {
            i: Clock,
            l: "24/7",
            sub: "real humans"
          }, {
            i: Star,
            l: "4.9★",
            sub: "local reviews"
          }, {
            i: ShieldCheck,
            l: "Insured",
            sub: "every job"
          }].map((s, idx) => {
            const Icon = s.i;
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-float-y rounded-2xl border border-border/60 bg-card/90 px-4 py-3 shadow-md backdrop-blur", style: {
              animationDelay: `${idx * 0.4}s`
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", children: s.l }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: s.sub })
              ] })
            ] }) }, s.l);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 -z-10 mx-auto h-full w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full conic-glow opacity-25 blur-3xl animate-spin-slow" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroHouse, alt: "Cutaway illustration of a UK home with Task-Fix tradespeople: plumber, painter, cleaner, handyman, electrician, gardener and a yellow service van outside.", width: 1024, height: 1024, className: "relative mx-auto w-full max-w-[560px] drop-shadow-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingTag, { className: "left-2 top-6", icon: Droplet, label: "Plumbing", delay: "0s" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingTag, { className: "right-0 top-16", icon: PaintRoller, label: "Painting", delay: "0.6s" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingTag, { className: "-left-2 top-1/2", icon: Sparkles, label: "Cleaning", delay: "1.2s" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingTag, { className: "right-2 top-[58%]", icon: Zap, label: "Electrical", delay: "1.8s" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingTag, { className: "left-6 bottom-8", icon: Sprout, label: "Gardening", delay: "2.4s" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingTag, { className: "right-4 bottom-2", icon: Truck, label: "Removals", delay: "3s" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative border-y border-border/60 bg-primary py-3 text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-hidden whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 animate-marquee items-center gap-8 pr-8 text-sm font-semibold uppercase tracking-wider", children: [0, 1].map((dup) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-8", children: services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary", children: "★" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.name })
      ] }, `${dup}-${s.slug}`)) }, dup)) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-4 py-16 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start justify-between gap-4 md:flex-row md:items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight md:text-4xl", children: "What we do" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: "Ten core services covering most jobs around the house — and if it's not listed, just ask." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "text-sm font-semibold text-primary hover:underline", children: "View all services →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: [
        services.map((s) => {
          const Icon = s.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", hash: s.slug, className: "card-aura group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.image, alt: `${s.name} — Task-Fix`, width: 800, height: 600, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: s.short }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5", children: [
                "Learn more ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
              ] })
            ] })
          ] }, s.slug);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "card-aura group relative flex flex-col items-start justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-transform group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-lg font-bold", children: "And more" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: "If it's a job around the home, chances are we can do it. Just ask." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100", children: [
            "Ask us ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/40 py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight md:text-4xl", children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Free quotes. No call-out fee. Fixed prices on most jobs." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-3", children: [{
        n: "01",
        t: "Tell us the job",
        d: "Send a quick message describing what needs doing — photos help."
      }, {
        n: "02",
        t: "Get a free quote",
        d: "We reply fast with a fair, fixed price and the next available slot."
      }, {
        n: "03",
        t: "We turn up and do it",
        d: "On time, tidy, and we don't leave until you're happy with the result."
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-mono font-semibold text-primary", children: s.n }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-lg font-semibold", children: s.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: s.d })
      ] }, s.n)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-4 py-16 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight md:text-4xl", children: "What customers say" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-5 md:grid-cols-3", children: [{
        q: "Painted the whole upstairs in two days. Spotless finish, lovely guys.",
        n: "Sarah M.",
        r: "Painting"
      }, {
        q: "Sorted a leaky tap and put up shelves the same visit. Brilliant.",
        n: "James T.",
        r: "Handyman"
      }, {
        q: "Moved our 3-bed across town with zero stress. Highly recommend.",
        n: "Priya K.",
        r: "Removals"
      }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "rounded-2xl border border-border/60 bg-card p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquareQuote, { className: "h-6 w-6 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "mt-3 text-foreground", children: [
          '"',
          t.q,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: t.n }),
          " · ",
          t.r
        ] })
      ] }, t.n)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/40 py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight md:text-4xl", children: "Simple, fair pricing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "No call-out fees. No surprises. Pay for the job, not the jargon." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-5 md:grid-cols-3", children: [{
        icon: Wrench,
        name: "Quick fix",
        price: "£39",
        unit: "/hr",
        desc: "Small repairs, leaks, flat-pack, odd jobs around the home.",
        features: ["1-hour minimum", "Tools & basic materials", "Fully insured"]
      }, {
        icon: Hourglass,
        name: "Half day",
        price: "£149",
        unit: "/4 hrs",
        desc: "Multiple small jobs, a room repaint touch-up, garden tidy.",
        features: ["Up to 4 hours on-site", "Materials at cost", "Waste removed", "Fully insured"],
        featured: true
      }, {
        icon: ClipboardList,
        name: "Full project",
        price: "Custom",
        unit: "quote",
        desc: "Removals, full repaints, carpet fits, larger plumbing work.",
        features: ["Free on-site survey", "Fixed-price quote", "Materials & waste included", "Fully insured"]
      }].map((p) => {
        const Icon = p.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm md:p-8 " + (p.featured ? "border-primary shadow-md ring-1 ring-primary/20" : "border-border/60"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: p.name }),
            p.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground", children: "Popular" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-baseline gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold tracking-tight", children: p.price }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: p.unit })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: p.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-2 text-sm", children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary" }),
            " ",
            f
          ] }, f)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "mt-6 inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold transition-colors " + (p.featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input bg-background text-foreground hover:bg-accent"), children: "Get a quote" })
        ] }, p.name);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/40 py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight md:text-4xl", children: "Frequently asked questions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Quick answers about Task-Fix and how we work." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Accordion, { type: "single", collapsible: true, className: "mt-8 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "services", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "What jobs do you actually cover?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "Ten core services: gardening, painting, cleaning, plumbing, electrical, handyman jobs, carpet removal, carpet fitting, house removals and man with van. If your job isn't on the list, ask anyway — most home tasks fall under one of our trades." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "hours", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "Are you really available 24/7?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "Yes. Routine bookings run 8am–8pm every day, and we take emergency callouts (leaks, blockages, lock-outs, urgent removals) round the clock. Nights and Sundays carry a small out-of-hours rate." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "turnaround", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "How quickly can you get the job done?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "Most quotes go back the same day. Small jobs (handyman, plumbing fixes, man with van) usually fit in the same week — often within 48 hours. Larger work like full house removals, repaints or carpet fits is typically booked 1–2 weeks ahead." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "area", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "What area do you cover?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "The local town and surrounding villages within roughly a 20-mile radius. Removals and man-with-van jobs go further afield — just send pickup and drop-off postcodes and we'll quote for travel." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "pricing", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "How does pricing work?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "Free quotes, no call-out fees. Quick fix jobs are £39/hour (1-hour minimum). Half day is £149 for up to four hours of stacked jobs. Larger work is quoted as a fixed-price project after a free survey. Materials at cost; waste removal included on half-day and project work." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "insured", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "Are you insured and vetted?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "Yes — fully insured with public liability cover on every job. Our tradespeople are local, vetted, and the same person you book is the one who turns up." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "payment", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "How do I pay?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "Bank transfer or card, on completion. We send a clear invoice with a breakdown of labour, materials and any extras agreed on the day. No deposit needed for most jobs — projects over £500 take a small booking deposit." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "quote-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "What should I include in a quote request?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionContent, { children: [
            "The more detail, the more accurate the quote. Useful things to share:",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 list-disc space-y-1.5 pl-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Which service you need (or a short description of the job)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your postcode or rough location" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: 'Rough size or scope (e.g. "two bedrooms", "small front lawn", "3-bed end-of-tenancy")' }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "How soon you need it — emergency, this week, flexible" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A couple of photos if it helps show the work" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Access notes — parking, stairs, pets, key safe, etc." })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-6xl px-4 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-primary-foreground shadow-2xl md:px-14 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-16 -top-16 h-72 w-72 animate-blob bg-secondary opacity-40 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-20 top-10 h-80 w-80 animate-blob bg-accent opacity-40 blur-2xl [animation-delay:-6s]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 animate-blob bg-secondary opacity-30 blur-2xl [animation-delay:-12s]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-secondary" }),
            " One call. Every trade."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 text-3xl font-extrabold tracking-tight md:text-5xl", children: [
            "One number. ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-trade-gradient", children: "Every job." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-primary-foreground/85", children: "Tell us what's broken, blocked, overgrown or half-finished — we'll quote it free, 24/7." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "shimmer-cta glow-yellow inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-4 text-sm font-bold text-secondary-foreground shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-secondary/90", children: [
          "Request a quote ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] }) })
  ] });
}
function FloatingTag({
  className = "",
  icon: Icon,
  label,
  delay = "0s"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `absolute z-10 hidden animate-float-y items-center gap-2 rounded-full border border-border/60 bg-card/95 px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur md:inline-flex ${className}`, style: {
    animationDelay: delay
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-secondary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }) }),
    label
  ] });
}
export {
  Index as component
};
