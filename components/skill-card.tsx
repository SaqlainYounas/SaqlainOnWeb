import * as icons from "lucide-react";

interface SkillCardProps {
  skill: {
    name: string;
    category: string;
    proficiency: number;
    icon: string;
  };
}

export default function SkillCard({ skill }: SkillCardProps) {
  const Icon = (icons as unknown as Record<string, icons.LucideIcon>)[skill.icon] ?? icons.Code2;

  return (
    <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-card-foreground">{skill.name}</h3>
          <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
        </div>
        <p className="mb-2 text-xs text-muted-foreground">{skill.category}</p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${skill.proficiency}%` }}
          />
        </div>
      </div>
    </div>
  );
}
