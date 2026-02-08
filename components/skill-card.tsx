interface SkillCardProps {
  skill: {
    name: string;
    category: string;
    proficiency: number;
    icon: string;
  };
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="group flex items-center justify-between border-b border-border py-3 transition-colors hover:border-foreground">
      <span className="font-mono text-xs text-foreground">
        {skill.name}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        {skill.proficiency}%
      </span>
    </div>
  );
}
