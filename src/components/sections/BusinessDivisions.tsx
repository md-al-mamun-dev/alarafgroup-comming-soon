import React from "react";
import { Shirt, Plane, Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";

export function BusinessDivisions() {
  const t = useTranslations("BusinessDivisions");

  const divisions = [
    {
      key: "garments",
      icon: <Shirt className="w-6 h-6 text-brand-gold" />
    },
    {
      key: "travel",
      icon: <Plane className="w-6 h-6 text-brand-gold" />
    },
    {
      key: "future",
      icon: <Lightbulb className="w-6 h-6 text-brand-gold" />
    }
  ];

  return (
    <section id="divisions" className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-brand-white mb-6">
          {t("title")}
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-brand-ivory/80">
          {t("description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {divisions.map((division, idx) => (
          <div 
            key={idx} 
            className="group relative p-8 border border-brand-gold/20 bg-brand-jade/30 backdrop-blur-sm rounded-sm hover:border-brand-gold/60 transition-colors"
          >
            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-sm bg-brand-emerald border border-brand-gold/30">
              {division.icon}
            </div>
            <h3 className="font-heading text-xl font-bold text-brand-white mb-4">
              {t(`${division.key}.title`)}
            </h3>
            <p className="text-brand-ivory/70 leading-relaxed">
              {t(`${division.key}.description`)}
            </p>
            
            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-gold/0 group-hover:border-brand-gold transition-colors" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-brand-gold/0 group-hover:border-brand-gold transition-colors" />
          </div>
        ))}
      </div>
    </section>
  );
}
