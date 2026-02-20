"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/lib/contexts/theme-context";
import { useContent } from "@/lib/contexts/i18n-context";
import { cn } from "@/lib/utils/cn";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import LanguageSelector from "@/components/language-selector";

// Section IDs are stable DOM identifiers — never translated
const SECTION_IDS = ["hero", "projects", "about", "contact"] as const;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { navbar, navigation } = useContent();
  const activeSection = useActiveSection([...SECTION_IDS]);

  const SECTIONS = navigation.sections;

  function cycleTheme() {
    const next =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
  }

  const themeIcon =
    theme === "dark" ? (
      <Moon className="h-4 w-4" />
    ) : theme === "light" ? (
      <Sun className="h-4 w-4" />
    ) : (
      <Monitor className="h-4 w-4" />
    );

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const now = new Date();
  const dateString = `${now.getFullYear()} ${now.toLocaleString("en-US", { month: "long" }).toLowerCase()}`;

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* Brand */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => scrollTo("hero")}
            className="font-mono text-sm lowercase tracking-tight text-foreground hover:text-accent cursor-pointer"
          >
            {navbar.brand.name}
          </button>
          <span className="font-mono text-sm text-muted-foreground">.</span>
          <button
            onClick={() => scrollTo("hero")}
            className="font-mono text-sm lowercase tracking-tight text-foreground hover:text-accent cursor-pointer"
          >
            {navbar.brand.tld}
          </button>
          <span className="ml-4 hidden font-mono text-xs text-muted-foreground sm:block">
            {dateString}
          </span>
        </div>

        {/* Desktop: language selector + theme toggle */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector />
          <button
            onClick={cycleTheme}
            aria-label={navbar.aria.themeToggle.replace("{theme}", theme)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {themeIcon}
          </button>
        </div>

        {/* Mobile: language selector + theme toggle + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSelector />
          <button
            onClick={cycleTheme}
            aria-label={navbar.aria.themeToggle.replace("{theme}", theme)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {themeIcon}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={navbar.aria.menuToggle}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-14 z-50 overflow-hidden bg-background px-4 pt-4 md:hidden">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={cn(
                "block w-full text-left py-3 font-mono text-sm lowercase transition-colors hover:text-accent cursor-pointer",
                activeSection === section.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {section.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
