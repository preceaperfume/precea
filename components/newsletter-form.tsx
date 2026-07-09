"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email address")
});

type NewsletterFields = z.infer<typeof schema>;

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const receiverEmail = "lisharsh2002@gmail.com";
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewsletterFields>({
    resolver: zodResolver(schema)
  });

  function onSubmit(values: NewsletterFields) {
    const subject = encodeURIComponent("New newsletter signup");
    const body = encodeURIComponent(`Please add this email to the private list:\n\n${values.email}`);

    setSubmitted(true);
    window.location.href = `mailto:${receiverEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-white/10 bg-white/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-champagne">Private list</p>
      <p className="mt-3 text-sm leading-6 text-silk/70">
        Receive early access to extrait releases, private edits, and seasonal rituals.
      </p>
      <div className="mt-5 flex gap-2">
        <input
          {...register("email")}
          type="email"
          placeholder="Email address"
          className="h-12 min-w-0 flex-1 rounded-full border border-white/10 bg-black/20 px-4 text-sm outline-none placeholder:text-silk/40 focus:border-champagne"
        />
        <button type="submit" aria-label="Join newsletter" className="grid size-12 shrink-0 place-items-center rounded-full bg-champagne text-ink">
          <Send className="size-4" />
        </button>
      </div>
      <p className="mt-2 min-h-5 text-xs text-champagne">{submitted ? "You are on the private list." : errors.email?.message}</p>
    </form>
  );
}   