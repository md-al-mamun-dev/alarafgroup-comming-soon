import React from "react";
import { IslamicBackground } from "@/src/components/patterns/IslamicBackground";
import { SiteHeader } from "@/src/components/layout/SiteHeader";
import { HeroSection } from "@/src/components/sections/HeroSection";
import { setRequestLocale } from 'next-intl/server';

export default async function ComingSoonPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <main className="relative flex flex-col min-h-screen selection:bg-brand-gold/30 selection:text-brand-white">
      <IslamicBackground />
      <SiteHeader />
      
      <div className="flex-1 flex flex-col justify-center">
        <HeroSection />
      </div>
    </main>
  );
}

