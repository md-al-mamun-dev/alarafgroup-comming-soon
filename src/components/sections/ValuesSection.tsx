import React from "react";
import { useTranslations } from "next-intl";

export function ValuesSection() {
  const t = useTranslations("Values");

  const valuesKeys = ["integrity", "connections", "progress"] as const;

  return (
    <section className="relative z-10 py-24 px-6 md:px-12 bg-brand-jade/40 border-y border-brand-gold/10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/3">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-white mb-6">
            {t("title")}
          </h2>
          <p className="text-lg text-brand-ivory/80 leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {valuesKeys.map((key, idx) => (
            <div key={idx} className="flex flex-col items-start border-l border-brand-gold/30 pl-6">
              <span className="text-4xl font-heading text-brand-gold/20 mb-2 font-bold">
                0{idx + 1}
              </span>
              <h3 className="font-heading text-xl font-bold text-brand-white mb-3">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-brand-ivory/70 text-sm leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
