"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import ScrambleText from "./scramble-text";
import IpClock from "./ip-clock";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-6 pt-14">
      <div className="relative z-10 max-w-4xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          full-stack developer
        </p>
        <h1 className="mb-4 text-5xl font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          <ScrambleText text="saqlain" delay={300} scrambleOnHover />
        </h1>
        <IpClock />
        <p className="mb-12 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
          building modern web applications with clean code and thoughtful design.
          focused on creating seamless digital experiences.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:text-accent"
          >
            view projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="font-mono text-xs text-muted-foreground">/</span>
          <Link
            href="/contact"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
          >
            contact
          </Link>
          <span className="font-mono text-xs text-muted-foreground">/</span>
          <button
            onClick={() => {
              const a = document.createElement("a");
              a.href = "/saqlain-resume.pdf";
              a.download = "Saqlain-Resume.pdf";
              document.body.appendChild(a);
              a.click();
              a.remove();
            }}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent cursor-pointer"
          >
            resume
            <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
