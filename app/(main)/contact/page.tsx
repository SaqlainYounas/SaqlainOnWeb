import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { Mail } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me.",
};

export default function ContactPage() {
  return (
    <div className="pt-14">
      <section className="min-h-[70vh] flex flex-col justify-center px-4 md:px-6 py-24">
        <div className="max-w-3xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            contact
          </p>
          <h1 className="mb-8 text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
            get in touch
          </h1>
          <p className="mb-12 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
            have a question or want to work together? fill out the form below
            and i&apos;ll get back to you as soon as possible.
          </p>
          <div className="flex items-center gap-4 font-mono text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <a
              href={SOCIAL_LINKS.email}
              className="hover:text-accent transition-colors"
            >
              hello@saqlain.dev
            </a>
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 md:px-6 py-24">
        <div className="max-w-xl">
          <p className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            send a message
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
