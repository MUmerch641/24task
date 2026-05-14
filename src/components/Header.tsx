import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { LogoMark } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      {/* Vibrant gradient top bar */}
      <div className="relative h-1.5 w-full overflow-hidden bg-trade-gradient">
        <div className="absolute inset-0 bg-trade-gradient opacity-80 [background-size:200%_100%] animate-[gradient-pan_5s_linear_infinite]" />
      </div>

      {/* Slim utility strip */}
      <div className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--secondary)_22%,transparent),transparent_35%,transparent_65%,color-mix(in_oklab,var(--accent)_25%,transparent))]" />
        <div className="relative mx-auto flex h-8 max-w-6xl items-center justify-between px-4 text-[11px] font-medium">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-0">
            <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-secondary shadow-[0_0_8px_var(--secondary)]" />
            <span className="font-semibold text-secondary">24/7</span>
            <span className="text-primary-foreground/85">emergency callouts</span>
            <span className="text-accent">·</span>
            <span className="font-semibold text-secondary">Free</span>
            <span className="text-primary-foreground/85">quotes</span>
            <span className="text-accent">·</span>
            <span className="font-semibold text-accent">Fully insured</span>
          </span>
          <a href="tel:07000000000" className="hidden items-center gap-1.5 font-semibold text-secondary transition-colors hover:text-accent sm:inline-flex">
            <Phone className="h-3 w-3" /> 07000 000 000
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="group flex items-center gap-3 font-semibold tracking-tight">
          <span className="relative">
            {/* Glow halo */}
            <span className="absolute -inset-1 rounded-xl bg-trade-gradient opacity-70 blur-md transition-opacity group-hover:opacity-100" />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-secondary glow-yellow">
              <LogoMark className="h-7 w-7" />
              <span className="absolute -bottom-1 -right-1 rounded-md bg-secondary px-1 py-px text-[8px] font-extrabold leading-none text-secondary-foreground shadow">
                24/7
              </span>
            </span>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight">
              <span className="text-trade-gradient">Task-Fix</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Every job, sorted
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/40 hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-foreground bg-secondary/60" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="shimmer-cta ml-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Get a quote
          </Link>
        </nav>
        <button
          className="rounded-md p-2 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary/40"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Get a quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
