import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold text-foreground">Get In Touch</h1>
      <p className="mb-8 text-muted-foreground">
        Have a question or want to work together? Fill out the form below and
        I&apos;ll get back to you as soon as possible.
      </p>
      <ContactForm />
    </div>
  );
}
