import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants/navigation";

const footerLinks = [
  { href: SOCIAL_LINKS.github, label: "github" },
  { href: SOCIAL_LINKS.linkedin, label: "linkedin" },
  { href: SOCIAL_LINKS.twitter, label: "twitter" },
  { href: SOCIAL_LINKS.email, label: "email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="px-4 md:px-6 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            ©{new Date().getFullYear()} saqlain
          </p>
        </div>
      </div>
    </footer>
  );
}
