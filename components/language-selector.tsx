"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/contexts/i18n-context";
import {
  LOCALE_LABELS,
  LOCALE_NAMES,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";

export default function LanguageSelector() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Language: ${locale}`}
        aria-expanded={open}
        className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
      >
        {LOCALE_LABELS[locale]}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 z-50 bg-background border border-border py-2 min-w-[168px]">
          {SUPPORTED_LOCALES.map((loc: Locale) => (
            <button
              key={loc}
              onClick={() => {
                setLocale(loc);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2.5 px-4 py-2 font-mono text-xs tracking-wide transition-colors text-left",
                locale === loc
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {LOCALE_NAMES[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
