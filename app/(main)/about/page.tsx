"use client";

import { useEffect, useState } from "react";
import SkillCard from "@/components/skill-card";
import { getAllSkills } from "@/lib/services/skills";
import type { Skill } from "@/lib/types/skill";

export default function AboutPage() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    getAllSkills().then(setSkills);
  }, []);

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="mb-16">
        <h1 className="mb-6 text-3xl font-bold text-foreground">About Me</h1>
        <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I&apos;m a full-stack developer passionate about building modern web
            applications with clean, maintainable code and great user experiences.
          </p>
          <p>
            With experience across the full development stack, I enjoy turning
            complex problems into simple, elegant solutions. I&apos;m always learning
            new technologies and looking for interesting projects to work on.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold text-foreground">Skills</h2>
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-foreground">{category}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills
                .filter((s) => s.category === category)
                .map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
