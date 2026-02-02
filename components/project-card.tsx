import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    description: string;
    techStack: string[];
    category: string;
    featured: boolean;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg",
        project.featured && "ring-1 ring-primary/20"
      )}
    >
      {project.featured && (
        <span className="mb-3 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Featured
        </span>
      )}
      <h3 className="mb-2 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
