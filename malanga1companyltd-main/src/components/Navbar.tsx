import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoAsset from "@/assets/logo_new.png";

const links = [
  { to: "/properties", label: "Properties" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[92%] max-w-6xl -translate-x-1/2 md:top-6">
      <div className="glass-panel flex items-center justify-between rounded-2xl px-4 py-2.5 shadow-sm sm:px-5 sm:py-3 md:px-8 md:py-4">
        <Link
          to="/"
          className="flex min-w-0 items-center"
          onClick={() => setOpen(false)}
        >
          <img
            src={logoAsset}
            alt="Malanga 1 Company Limited logo"
            width={1536}
            height={1024}
            className="h-9 w-auto max-w-[150px] object-contain rounded-md sm:h-10 sm:max-w-[180px] md:h-12 md:max-w-[220px] lg:h-14 lg:max-w-[260px]"
          />
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium opacity-80 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="transition-colors hover:text-clay"
              activeProps={{ className: "text-clay font-semibold" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:grid" />
          <Link
            to="/contact"
            className="hidden rounded-xl bg-earth px-5 py-2 text-sm font-semibold text-earth-foreground transition-all hover:bg-clay md:inline-block"
          >
            Contact Us
          </Link>
          <button
            className="grid size-10 place-items-center rounded-xl border border-glass-border md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass-strong animate-fade-up mt-2 flex flex-col gap-1 rounded-2xl p-4 shadow-lg md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
              activeProps={{ className: "text-clay font-semibold" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-2">
            <Link
              to="/contact"
              className="flex-1 rounded-xl bg-earth px-4 py-3 text-center text-sm font-semibold text-earth-foreground"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Link>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
