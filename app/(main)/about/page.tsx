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
    <div className="pt-14">
      <section className="min-h-[70vh] flex flex-col justify-center px-4 md:px-6 py-24">
        <div className="max-w-3xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            about
          </p>
          <h1 className="mb-8 text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
            saqlain younas
          </h1>
          <div className="max-w-xl space-y-6 font-mono text-sm leading-relaxed text-muted-foreground">
            <p>
              full-stack developer passionate about building modern web
              applications with clean, maintainable code and great user experiences.
            </p>
            <p>
              with experience across the full development stack, i enjoy turning
              complex problems into simple, elegant solutions. always learning
              new technologies and looking for interesting projects to work on.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 md:px-6 py-24">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            skills & technologies
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="mb-6 font-mono text-sm text-foreground lowercase">
                {category}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
