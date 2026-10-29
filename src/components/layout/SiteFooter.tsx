import React from "react";
import { siteConfig } from "@/src/config/site";
import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("Footer");
  
  return (
    <footer className="relative z-10 py-8 px-6 md:px-12 border-t border-brand-gold/10 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-heading text-brand-ivory/60 text-sm">
            &copy; {new Date().getFullYear()} {siteConfig.name}. {t("rights")}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-brand-ivory/60 hover:text-brand-gold transition-colors">{t("privacy")}</a>
          <a href="#" className="text-sm text-brand-ivory/60 hover:text-brand-gold transition-colors">{t("terms")}</a>
        </div>
      </div>
    </footer>
  );
}
