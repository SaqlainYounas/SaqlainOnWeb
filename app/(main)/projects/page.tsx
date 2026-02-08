"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/project-card";
import { getAllProjects } from "@/lib/services/projects";
import type { Project } from "@/lib/types/project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getAllProjects().then(setProjects);
  }, []);

  const categories = [...new Set(projects.map((p) => p.category))];

  return (
    <div className="pt-14">
      <section className="px-4 md:px-6 py-24">
        <div className="mb-16">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            work
          </p>
          <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
            projects
          </h1>
        </div>

        <div className="space-y-20">
          {categories.map((category) => (
            <div key={category}>
              <div className="flex items-baseline justify-between mb-8 border-b border-border pb-4">
                <h2 className="font-mono text-sm text-foreground lowercase">
                  {category}
                </h2>
                <span className="font-mono text-xs text-muted-foreground">
                  {projects.filter((p) => p.category === category).length} projects
                </span>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {projects
                  .filter((p) => p.category === category)
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
