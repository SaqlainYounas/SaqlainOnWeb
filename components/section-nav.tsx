"use client";

import { cn } from "@/lib/utils/cn";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import content from "@/content.json";

const { sections } = content.navigation;
const { aria } = content.navbar;

const SECTION_IDS = sections.map((s) => s.id);

export default function SectionNav() {
  const activeSection = useActiveSection(SECTION_IDS);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-5">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          aria-label={aria.sectionNav.replace("{label}", label)}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <span
            className={cn(
              "font-mono text-xs lowercase tracking-widest select-none transition-colors duration-200",
              activeSection === id ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {label}
          </span>
          <div
            className={cn(
              "rounded-full transition-all duration-300",
              activeSection === id
                ? "w-2 h-2 bg-foreground"
                : "w-1.5 h-1.5 bg-muted-foreground/40"
            )}
          />
        </button>
      ))}
    </div>
  );
}
