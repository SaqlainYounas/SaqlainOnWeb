"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github, ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectBySlug } from "@/lib/services/projects";
import type { Project } from "@/lib/types/project";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectBySlug(slug).then((p) => {
      setProject(p);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return null;
  if (!project) notFound();

  return (
    <div className="pt-14">
      <article>
        <section className="px-4 md:px-6 py-24">
          <Link
            href="/projects"
            className="group mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> back to projects
          </Link>

          <div className="max-w-3xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {project.category}
            </p>
            <h1 className="mb-8 text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl lowercase">
              {project.title}
            </h1>
            <p className="mb-12 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
              {project.longDescription}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-12">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:text-accent"
                >
                  view live
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
                >
                  view code
                  <Github className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="bg-muted px-4 md:px-6 py-24">
          <div className="grid gap-16 md:grid-cols-2 max-w-4xl">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                the problem
              </p>
              <p className="font-mono text-sm leading-relaxed text-foreground">
                {project.problem}
              </p>
            </div>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                the solution
              </p>
              <p className="font-mono text-sm leading-relaxed text-foreground">
                {project.solution}
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 md:px-6 py-16">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
          >
            view all projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>
      </article>
    </div>
  );
}
