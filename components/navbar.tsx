"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/lib/contexts/theme-context";
import { NAV_LINKS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  function cycleTheme() {
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
  }

  const themeIcon =
    theme === "dark" ? <Moon className="h-4 w-4" /> :
    theme === "light" ? <Sun className="h-4 w-4" /> :
    <Monitor className="h-4 w-4" />;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const now = new Date();
  const dateString = `${now.getFullYear()} ${now.toLocaleString('en-US', { month: 'long' }).toLowerCase()}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-1">
          <Link href="/" className="font-mono text-sm lowercase tracking-tight text-foreground hover:text-accent">
            saqlain
          </Link>
          <span className="font-mono text-sm text-muted-foreground">.</span>
          <Link href="/" className="font-mono text-sm lowercase tracking-tight text-foreground hover:text-accent">
            dev
          </Link>
          <span className="ml-4 hidden font-mono text-xs text-muted-foreground sm:block">
            {dateString}
          </span>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-mono text-xs lowercase tracking-wide transition-colors hover:text-accent",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={cycleTheme}
            aria-label={`Theme: ${theme}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {themeIcon}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={cycleTheme}
            aria-label={`Theme: ${theme}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {themeIcon}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 top-14 z-50 overflow-hidden bg-background px-4 pt-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block py-3 font-mono text-sm lowercase transition-colors hover:text-accent",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
