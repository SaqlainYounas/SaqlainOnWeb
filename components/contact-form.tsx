"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, ArrowRight } from "lucide-react";
import content from "@/content.json";

const { fields, validation, submit, success, error } = content.contactForm;

const contactSchema = z.object({
  name: z.string().min(2, validation.nameMin),
  email: z.string().email(validation.emailInvalid),
  message: z.string().min(10, validation.messageMin),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    try {
      await addDoc(collection(db, "contacts"), {
        ...data,
        timestamp: serverTimestamp(),
        read: false,
      });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-12 text-center">
        <p className="font-mono text-sm text-foreground mb-2">{success.heading}</p>
        <p className="font-mono text-xs text-muted-foreground">{success.subtext}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
        >
          {success.reset}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
          {fields.name.label}
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full border-b border-border bg-transparent py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
          placeholder={fields.name.placeholder}
        />
        {errors.name && (
          <p className="mt-2 font-mono text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
          {fields.email.label}
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full border-b border-border bg-transparent py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
          placeholder={fields.email.placeholder}
        />
        {errors.email && (
          <p className="mt-2 font-mono text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
          {fields.message.label}
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="w-full resize-none border-b border-border bg-transparent py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
          placeholder={fields.message.placeholder}
        />
        {errors.message && (
          <p className="mt-2 font-mono text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:text-accent disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> {submit.loading}
            </>
          ) : (
            <>
              {submit.idle}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>

      {status === "error" && (
        <p className="font-mono text-xs text-destructive">
          {error}
        </p>
      )}
    </form>
  );
}
