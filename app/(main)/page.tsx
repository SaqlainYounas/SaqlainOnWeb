"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Download, Mail, ChevronDown } from "lucide-react";
import ScrambleText from "@/components/scramble-text";
import IpClock from "@/components/ip-clock";
import ProjectCard from "@/components/project-card";
import SkillCard from "@/components/skill-card";
import ContactForm from "@/components/contact-form";
import { getAllProjects } from "@/lib/services/projects";
import { getAllSkills } from "@/lib/services/skills";
import { SOCIAL_LINKS } from "@/lib/constants/navigation";
import type { Project } from "@/lib/types/project";
import type { Skill } from "@/lib/types/skill";
import content from "@/content.json";

const { hero, about, projects, contact } = content;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function HomePage() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    getAllProjects().then(setProjectList);
    getAllSkills().then(setSkills);
  }, []);

  const projectCategories = [...new Set(projectList.map((p) => p.category))];
  const skillCategories = [...new Set(skills.map((s) => s.category))];

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center px-4 md:px-6 pt-14 pb-24"
      >
        <div className="relative z-10 max-w-4xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {hero.label}
          </p>
          <h1 className="mb-4 text-5xl font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            <ScrambleText text={hero.name} delay={300} scrambleOnHover />
          </h1>
          <IpClock />
          <p className="mb-12 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:text-accent cursor-pointer"
            >
              {hero.cta.projects}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <span className="hidden sm:inline font-mono text-xs text-muted-foreground">/</span>
            <button
              onClick={() => scrollToSection("contact")}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent cursor-pointer"
            >
              {hero.cta.contact}
            </button>
            <span className="hidden sm:inline font-mono text-xs text-muted-foreground">/</span>
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
              {hero.cta.resume}
              <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection("projects")}
          aria-label={hero.scrollAriaLabel}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
        >
          <span className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
            {hero.scrollIndicator}
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </section>

      {/* ─── Projects ─────────────────────────────────────────────── */}
      <section id="projects" className="px-4 md:px-6 py-24">
        <div className="mb-16">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {projects.label}
          </p>
          <h2 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {projects.heading}
          </h2>
        </div>

        <div className="space-y-20">
          {projectCategories.map((category) => (
            <div key={category}>
              <div className="flex items-baseline justify-between mb-8 border-b border-border pb-4">
                <h3 className="font-mono text-sm text-foreground lowercase">
                  {category}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {projectList.filter((p) => p.category === category).length}{" "}
                  {projects.countSuffix}
                </span>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {projectList
                  .filter((p) => p.category === category)
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── About ────────────────────────────────────────────────── */}
      <section id="about" className="bg-muted">

        {/* Bio + stats block */}
        <div className="px-4 md:px-6 md:pr-36 py-24 border-b border-border">
          <p className="mb-16 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {about.label}
          </p>

          <div className="grid lg:grid-cols-[1fr_260px] gap-12 xl:gap-20">

            {/* Left: name, bio, badge */}
            <div>
              <h2 className="mb-10 text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {about.name}
              </h2>
              <div className="space-y-5 font-mono text-sm leading-relaxed text-muted-foreground mb-10 max-w-lg">
                {about.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Live focus badge */}
              <div className="inline-flex items-center gap-3 border border-border bg-background/60 px-4 py-2.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-xs lowercase tracking-widest text-muted-foreground">
                  {about.currentFocus}
                </span>
              </div>
            </div>

            {/* Right: stat cards + availability */}
            <div className="self-start border border-border overflow-hidden">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-px bg-border">
                {about.stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`px-6 py-5 bg-background${i === about.stats.length - 1 && about.stats.length % 2 !== 0 ? " col-span-2 lg:col-span-1" : ""}`}
                  >
                    <div className="text-3xl font-medium tracking-tight text-foreground mb-0.5">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
                <div className="col-span-2 lg:col-span-1 px-6 py-5 bg-background flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  <span className="font-mono text-xs lowercase tracking-widest text-foreground">
                    {about.availability}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills block */}
        <div className="px-4 md:px-6 md:pr-36 py-20">
          <p className="mb-12 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {about.skillsSectionLabel}
          </p>
          <div className="divide-y divide-border">
            {skillCategories.map((category) => (
              <div
                key={category}
                className="grid md:grid-cols-[160px_1fr] gap-4 md:gap-6 py-8 first:pt-0 last:pb-0"
              >
                <h3 className="font-mono text-xs uppercase tracking-widest text-foreground md:text-muted-foreground self-start md:pt-1 pb-2 md:pb-0 border-b border-border md:border-0">
                  {category}
                </h3>
                <div className="grid gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill) => (
                      <SkillCard key={skill.id} skill={skill} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact ──────────────────────────────────────────────── */}
      <section id="contact" className="px-4 md:px-6 md:pr-36 py-24">
        <p className="mb-16 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {contact.label}
        </p>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 lg:divide-x lg:divide-border">

          {/* Left: info */}
          <div className="flex flex-col justify-between gap-12">
            <div>
              <h2 className="mb-8 text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {contact.heading}
              </h2>
              <p className="max-w-sm font-mono text-sm leading-relaxed text-muted-foreground">
                {contact.description}
              </p>
            </div>
            <div className="flex items-center gap-3 font-mono text-sm text-muted-foreground group">
              <Mail className="h-4 w-4 shrink-0" />
              <a
                href={SOCIAL_LINKS.email}
                className="hover:text-accent transition-colors"
              >
                {contact.email}
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:pl-16 xl:pl-24">
            <p className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {contact.formSectionLabel}
            </p>
            <ContactForm />
          </div>

        </div>
      </section>
    </>
  );
}
