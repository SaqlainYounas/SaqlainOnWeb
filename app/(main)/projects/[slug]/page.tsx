"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
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
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>

      <h1 className="mb-4 text-3xl font-bold text-foreground">{project.title}</h1>
      <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
        {project.longDescription}
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mb-12 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="mb-3 text-xl font-semibold text-foreground">The Problem</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-semibold text-foreground">The Solution</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
        </div>
      </div>

      <div className="flex gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-light"
          >
            <ExternalLink className="h-4 w-4" /> View Live
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Github className="h-4 w-4" /> View Code
          </a>
        )}
      </div>
    </article>
  );
}
