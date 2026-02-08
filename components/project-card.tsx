import Link from "next/link";

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
      className="group block"
    >
      <div className="aspect-[4/3] bg-muted mb-4 overflow-hidden">
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-muted to-border transition-transform duration-500 group-hover:scale-105">
          <span className="font-mono text-4xl text-muted-foreground/30 uppercase">
            {project.title.charAt(0)}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-mono text-sm text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-muted-foreground">
            {project.category}
          </span>
        </div>
        <p className="font-mono text-xs text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
