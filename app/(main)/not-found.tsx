"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrambleText from "@/components/scramble-text";
import content from "@/content.json";

const { notFound: notFoundContent } = content;

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-6 pt-14">
      <div className="relative z-10 max-w-4xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {notFoundContent.label}
        </p>
        <h1 className="mb-4 text-5xl font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          <ScrambleText text={notFoundContent.heading} delay={300} />
        </h1>
        <p className="mb-12 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
          {notFoundContent.description}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:text-accent"
          >
            {notFoundContent.links.home}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="font-mono text-xs text-muted-foreground">/</span>
          <Link
            href="/#projects"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
          >
            {notFoundContent.links.projects}
          </Link>
          <span className="font-mono text-xs text-muted-foreground">/</span>
          <Link
            href="/#contact"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
          >
            {notFoundContent.links.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}
