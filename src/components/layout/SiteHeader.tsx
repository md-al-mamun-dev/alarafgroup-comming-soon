import React from "react";
import { siteConfig } from "@/src/config/site";
import { Link } from "@/src/i18n/routing";
import { LanguageSwitcher } from "@/src/components/ui/LanguageSwitcher";
import { useTranslations } from "next-intl";

export function SiteHeader() {
  const t = useTranslations("Header");
  
  return (
    <header className="relative z-10 w-full py-6 px-6 md:px-12 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="relative flex items-center justify-center w-10 h-10 border border-brand-gold/30 rounded-sm group-hover:border-brand-gold/80 transition-colors">
          {/* Minimal Monogram A */}
          <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 3L4 21H6.5L8.5 15H15.5L17.5 21H20L12 3Z" />
            <path d="M10 11H14" />
          </svg>
        </div>
        <span className="font-heading text-lg font-semibold tracking-wide text-brand-white">
          {siteConfig.name}
        </span>
      </Link>
      
      <div className="flex items-center gap-8">
        {/* Language switcher temporarily hidden for English-only mode */}
      </div>
    </header>
  );
}
