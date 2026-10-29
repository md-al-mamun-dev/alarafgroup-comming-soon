"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Loader2, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export function SubscribeForm() {
  const t = useTranslations("Subscribe");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "inactive">("idle");
  const [message, setMessage] = useState("");

  const subscribeSchema = z.object({
    email: z.string().email({ message: t("messages.invalidEmail") }),
    interest: z.union([
      z.literal("garments"),
      z.literal("travel"),
      z.literal("other"),
      z.literal("general")
    ], { message: t("messages.invalidInterest") }),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // As per requirements: if credentials are not configured, clearly communicate it.
    const hasDatabase = false; // Toggle this when DB is configured
    
    if (!hasDatabase) {
      setStatus("inactive");
      setMessage(t("messages.inactive"));
      return;
    }

    setStatus("loading");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      interest: formData.get("interest") || "general",
    };

    try {
      subscribeSchema.parse(data);
      // await submitToServerAction(data)
      // Simulate network request
      await new Promise(r => setTimeout(r, 1000));
      setStatus("success");
      setMessage(t("messages.success"));
    } catch (err) {
      setStatus("error");
      if (err instanceof z.ZodError) {
        setMessage(err.issues[0].message);
      } else {
        setMessage(t("messages.error"));
      }
    }
  };

  return (
    <section id="subscribe" className="relative z-10 py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
      <div className="mb-10">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-brand-white mb-6">
          {t("title")}
        </h2>
        <p className="text-lg text-brand-ivory/80">
          {t("description")}
        </p>
      </div>

      <div className="bg-brand-emerald/80 border border-brand-gold/30 p-8 rounded-sm backdrop-blur-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-brand-ivory">
              {t("emailLabel")} <span className="text-brand-gold">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-ivory/50" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                required
                disabled={status === "loading" || status === "success"}
                className="w-full pl-10 pr-4 py-3 bg-brand-jade/30 border border-brand-gold/20 rounded-sm text-brand-white placeholder:text-brand-ivory/40 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="interest" className="text-sm font-medium text-brand-ivory">
              {t("interestLabel")}
            </label>
            <select
              id="interest"
              name="interest"
              disabled={status === "loading" || status === "success"}
              className="w-full px-4 py-3 bg-brand-jade/30 border border-brand-gold/20 rounded-sm text-brand-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors disabled:opacity-50 appearance-none"
            >
              <option value="general" className="bg-brand-emerald text-brand-ivory">{t("options.general")}</option>
              <option value="garments" className="bg-brand-emerald text-brand-ivory">{t("options.garments")}</option>
              <option value="travel" className="bg-brand-emerald text-brand-ivory">{t("options.travel")}</option>
              <option value="other" className="bg-brand-emerald text-brand-ivory">{t("options.other")}</option>
            </select>
          </div>

          {message && (
            <div className={cn(
              "p-4 rounded-sm text-sm border",
              status === "success" ? "bg-green-900/30 border-green-500/30 text-green-200" :
              status === "error" ? "bg-red-900/30 border-red-500/30 text-red-200" :
              "bg-brand-gold/10 border-brand-gold/30 text-brand-gold"
            )}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full flex items-center justify-center py-4 bg-brand-gold text-brand-emerald font-bold rounded-sm hover:bg-brand-ivory transition-colors disabled:opacity-50 disabled:hover:bg-brand-gold"
          >
            {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : t("button")}
          </button>
          
          <p className="text-xs text-brand-ivory/50 text-center mt-2">
            {t("disclaimer")}
          </p>
        </form>
      </div>
    </section>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
