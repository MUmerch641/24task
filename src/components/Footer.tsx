import { Link } from "@tanstack/react-router";
import { Phone, Mail } from "lucide-react";
import { LogoMark } from "./Logo";


export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="overflow-hidden rounded-lg border border-border/60 bg-background shadow-sm">
              <LogoMark className="h-9 w-9 object-cover" />
            </span>
            <span className="text-lg">Task-Fix</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Every job, sorted. Local trades you can actually rely on — round the clock.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Get in touch</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 07000 000 000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@task-fix.local</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Task-Fix. All rights reserved.
      </div>
    </footer>
  );
}
