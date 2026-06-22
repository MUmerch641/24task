import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { Toaster } from "@/components/ui/sonner";
import logoImage from "@/assets/logo.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Task-Fix — 24/7 Home Services" },
      {
        name: "description",
        content:
          "Gardening, painting, cleaning, removals, plumbing, handyman jobs and more. Free quotes, no call-out fee.",
      },
      { name: "author", content: "Task-Fix" },
      { property: "og:title", content: "Task-Fix — 24/7 Home Services" },
      {
        property: "og:description",
        content: "Gardening, painting, cleaning, removals, plumbing, handyman jobs and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:image", content: logoImage },
      { name: "twitter:image", content: logoImage },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.png",
        type: "image/png",
      },
      {
        rel: "apple-touch-icon",
        href: "/favicon.png",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative isolate flex min-h-screen flex-col">
        {/* Global ambient background — sits behind every page */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Warm mesh wash */}
          <div className="absolute inset-0 bg-trade-mesh opacity-60" />
          {/* Charcoal grid */}
          <div className="absolute inset-0 bg-trade-grid opacity-40" />
          {/* Orange dot mesh */}
          <div className="absolute inset-0 bg-trade-dots opacity-50" />
          {/* Paper grain */}
          <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-multiply" />
          {/* Drifting brand blobs */}
          <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-[22rem] w-[22rem] rounded-full bg-secondary/15 blur-3xl" />
          {/* Vignette to keep text crisp */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,color-mix(in_oklab,var(--background)_85%,transparent)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-trade-gradient opacity-60" />
        </div>
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Chatbot />
      <Toaster />
    </QueryClientProvider>
  );
}
