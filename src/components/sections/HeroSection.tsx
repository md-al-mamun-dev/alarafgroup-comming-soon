import React from "react";
import { ArrowDown, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-6 text-center z-10 overflow-hidden">
      
      {/* Decorative vertical line leading down to content */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-brand-gold/0 via-brand-gold/50 to-brand-gold/0 animate-fade-in" />
      
      <div className="max-w-5xl mx-auto flex flex-col items-center w-full animate-fade-in-up mt-12 md:mt-0">
        
        {/* Eyebrow / "Coming Soon" */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-brand-gold/20 bg-brand-emerald/50 backdrop-blur-md mb-10 md:mb-12 shadow-[0_0_20px_rgba(197,164,109,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
          </span>
          <span className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-brand-gold">
            {t("comingSoon")}
          </span>
        </div>

        {/* Brand identity placed elegantly above the main heading */}
        <p className="text-sm md:text-base font-medium tracking-[0.25em] uppercase text-brand-gold/80 mb-5 md:mb-6">
          {t("brand")}
        </p>

        {/* Main H1 - Using HTML language targeting in global CSS for proper font and line-height */}
        <h1 className="font-heading text-[2.5rem] leading-[1.3] md:text-6xl lg:text-[5rem] lg:leading-[1.2] font-bold mb-8 text-brand-white drop-shadow-lg max-w-[95%] md:max-w-4xl mx-auto">
          {t.rich("title", {
            gold: (chunks) => <span className="text-brand-gold font-normal inline-block">{chunks}</span>,
            br: () => <br className="hidden md:block" />
          })}
        </h1>

        {/* Description */}
        <p className="max-w-lg md:max-w-2xl text-base md:text-lg lg:text-xl text-brand-ivory/80 leading-relaxed md:leading-loose mb-12">
          {t("description")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <a 
            href="mailto:info@alarafgroup.com" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 border border-brand-gold/40 text-brand-ivory font-medium rounded-sm hover:bg-brand-gold/10 hover:border-brand-gold/80 transition-all duration-300 group"
          >
            {t("secondaryCta")}
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
