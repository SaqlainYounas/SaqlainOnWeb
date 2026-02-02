import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center sm:py-32">
      <p className="mb-4 text-sm font-medium tracking-wider text-primary uppercase">
        Full-Stack Developer
      </p>
      <h1 className="mb-6 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Hi, I&apos;m{" "}
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Saqlain
        </span>
      </h1>
      <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
        I build modern web applications with clean code and thoughtful design.
        Let&apos;s create something great together.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-light"
        >
          View Projects <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
}
