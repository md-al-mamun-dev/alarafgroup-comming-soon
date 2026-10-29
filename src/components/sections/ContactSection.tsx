import React from "react";
import { siteConfig } from "@/src/config/site";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

export function ContactSection() {
  const t = useTranslations("Contact");
  const { email, phone, whatsapp } = siteConfig.contact;
  const { linkedin, facebook, instagram } = siteConfig.social;

  const hasContact = email || phone || whatsapp;
  const hasSocial = linkedin || facebook || instagram;

  if (!hasContact && !hasSocial) return null;

  return (
    <section id="contact" className="relative z-10 py-24 px-6 md:px-12 bg-brand-jade/20 border-t border-brand-gold/10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-white mb-6">
          {t("title")}
        </h2>
        <p className="text-lg text-brand-ivory/80 mb-12">
          {t("description")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {email && (
            <a 
              href={`mailto:${email}`} 
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-gold/30 rounded-sm text-brand-ivory hover:bg-brand-gold hover:text-brand-emerald hover:border-brand-gold transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>{t("emailUs")}</span>
            </a>
          )}
          {phone && (
            <a 
              href={`tel:${phone}`} 
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-gold/30 rounded-sm text-brand-ivory hover:bg-brand-gold hover:text-brand-emerald hover:border-brand-gold transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>{t("callUs")}</span>
            </a>
          )}
          {whatsapp && (
            <a 
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-gold/30 rounded-sm text-brand-ivory hover:bg-brand-gold hover:text-brand-emerald hover:border-brand-gold transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t("whatsapp")}</span>
            </a>
          )}
        </div>

        {hasSocial && (
          <div className="mt-16 pt-12 border-t border-brand-gold/10 flex flex-col items-center">
            <span className="text-sm tracking-widest uppercase text-brand-ivory/50 mb-6">{t("connectHeading")}</span>
            <div className="flex items-center gap-6">
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-ivory/70 hover:text-brand-gold transition-colors">
                  LinkedIn
                </a>
              )}
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-brand-ivory/70 hover:text-brand-gold transition-colors">
                  Facebook
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-brand-ivory/70 hover:text-brand-gold transition-colors">
                  Instagram
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
