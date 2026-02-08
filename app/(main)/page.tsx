"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/hero";
import ProjectCard from "@/components/project-card";
import { getFeaturedProjects } from "@/lib/services/projects";
import type { Project } from "@/lib/types/project";

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getFeaturedProjects().then(setProjects);
  }, []);

  return (
    <>
      <Hero />
      <section className="bg-muted">
        <div className="px-4 md:px-6 py-24">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              selected work
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              {projects.length} projects
            </span>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
