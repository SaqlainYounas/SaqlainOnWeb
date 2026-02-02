import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants/navigation";

const socialItems = [
  { href: SOCIAL_LINKS.github, icon: Github, label: "GitHub" },
  { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: SOCIAL_LINKS.twitter, icon: Twitter, label: "Twitter" },
  { href: SOCIAL_LINKS.email, icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Saqlain. All rights reserved.
        </p>
        <div className="flex gap-4">
          {socialItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <item.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
