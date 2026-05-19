import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { n as Phone, X, j as Menu, M as Mail } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const appCss = "/assets/styles-CslgZj-q.css";
const logoImage = "/assets/logo-D9vPa6jY.jpeg";
function LogoMark({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: logoImage,
      alt: "Task-Fix",
      className,
      draggable: false,
      loading: "eager"
    }
  );
}
function Header() {
  const [open, setOpen] = reactExports.useState(false);
  const links = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-1.5 w-full overflow-hidden bg-trade-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-trade-gradient opacity-80 [background-size:200%_100%] animate-[gradient-pan_5s_linear_infinite]" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-primary text-primary-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--secondary)_22%,transparent),transparent_35%,transparent_65%,color-mix(in_oklab,var(--accent)_25%,transparent))]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto flex h-8 max-w-6xl items-center justify-between px-4 text-[11px] font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-wrap items-center gap-x-2 gap-y-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-secondary shadow-[0_0_8px_var(--secondary)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-secondary", children: "24/7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/85", children: "Emergency Callouts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-secondary", children: "Free" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/85", children: "Quotes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-accent", children: "Fully Insured" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:07000000000", className: "hidden items-center gap-1.5 font-semibold text-secondary transition-colors hover:text-accent sm:inline-flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3" }),
          " 07000 000 000"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "group flex items-center gap-3 font-semibold tracking-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm transition-transform group-hover:-translate-y-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogoMark, { className: "h-12 w-12 object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col leading-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-extrabold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-trade-gradient", children: "Task-Fix" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground", children: "Every job, sorted" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-1 md:flex", children: [
        links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: l.to,
            className: "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/40 hover:text-foreground",
            activeProps: { className: "rounded-md px-3 py-2 text-sm font-semibold text-foreground bg-secondary/60" },
            children: l.label
          },
          l.to
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/contact",
            className: "shimmer-cta ml-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90",
            children: "Get a quote"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "rounded-md p-2 md:hidden",
          "aria-label": "Toggle menu",
          onClick: () => setOpen((v) => !v),
          children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/60 bg-background md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3", children: [
      links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: l.to,
          onClick: () => setOpen(false),
          className: "rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary/40",
          children: l.label
        },
        l.to
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/contact",
          onClick: () => setOpen(false),
          className: "mt-1 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
          children: "Get a quote"
        }
      )
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-24 border-t border-border/60 bg-secondary/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "overflow-hidden rounded-lg border border-border/60 bg-background shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogoMark, { className: "h-9 w-9 object-cover" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "Task-Fix" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Every job, sorted. Local trades you can actually rely on — round the clock." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Explore" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground", children: "Home" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "hover:text-foreground", children: "Services" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-foreground", children: "About" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-foreground", children: "Contact" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Get in touch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
            " 07000 000 000"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
            " hello@task-fix.local"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/60 py-4 text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Task-Fix. All rights reserved."
    ] })
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$4 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Task-Fix — 24/7 Home Services" },
      { name: "description", content: "Gardening, painting, cleaning, removals, plumbing, handyman jobs and more. Free quotes, no call-out fee." },
      { name: "author", content: "Task-Fix" },
      { property: "og:title", content: "Task-Fix — 24/7 Home Services" },
      { property: "og:description", content: "Gardening, painting, cleaning, removals, plumbing, handyman jobs and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:image", content: logoImage },
      { name: "twitter:image", content: logoImage }
    ],
    links: [
      {
        rel: "icon",
        href: logoImage,
        type: "image/jpeg"
      },
      {
        rel: "apple-touch-icon",
        href: logoImage
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$4.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": true, className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-trade-mesh opacity-60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-trade-grid opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-trade-dots opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-[0.05] mix-blend-multiply" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-secondary/25 blur-3xl animate-blob" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-3xl animate-blob [animation-delay:-7s]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-1/4 h-[22rem] w-[22rem] rounded-full bg-secondary/20 blur-3xl animate-blob [animation-delay:-13s]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,color-mix(in_oklab,var(--background)_85%,transparent)_100%)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-trade-gradient opacity-60" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] });
}
const $$splitComponentImporter$3 = () => import("./services-DiD3XFCq.mjs");
const Route$3 = createFileRoute("/services")({
  head: () => ({
    meta: [{
      title: "Services — Task-Fix"
    }, {
      name: "description",
      content: "Ten local trades under one team: gardening, painting, cleaning, plumbing, electrical, handyman, carpet removal, carpet fitting, house removals and man with van."
    }, {
      property: "og:title",
      content: "Services — Task-Fix"
    }, {
      property: "og:description",
      content: "Every service we offer for your home, in one place."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./contact-CAb3oR1W.mjs");
const searchSchema = objectType({
  service: stringType().optional()
});
const Route$2 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Get a free quote — Task-Fix"
    }, {
      name: "description",
      content: "Tell us about the job. Free quote, usually same day. 24/7 emergencies covered."
    }, {
      property: "og:title",
      content: "Get a free quote — Task-Fix"
    }, {
      property: "og:description",
      content: "Quick fix, half day or full project — free quotes from your local Task-Fix team."
    }]
  }),
  validateSearch: searchSchema,
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./about-Du0qL8R_.mjs");
const Route$1 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — Task-Fix"
    }, {
      name: "description",
      content: "Task-Fix is your local home services team — 10 trades including gardening, painting, plumbing, electrical, removals, handyman jobs and more. Available 24/7."
    }, {
      property: "og:title",
      content: "About — Task-Fix"
    }, {
      property: "og:description",
      content: "Local trades you can rely on, round the clock. Meet the team behind Task-Fix."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-B_ubi1ak.mjs");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ServicesRoute = Route$3.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => Route$4
});
const ContactRoute = Route$2.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$4
});
const AboutRoute = Route$1.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$4
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ContactRoute,
  ServicesRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$2 as R,
  router as r
};
