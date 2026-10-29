import React from "react";
import { LandingHeader } from "@/src/components/landing/LandingHeader";
import { LandingFooter } from "@/src/components/landing/LandingFooter";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/src/design-system";
import { DesignSystemSidebar } from "@/src/components/design-system/DesignSystemSidebar";
import { DesignSystemPlayground } from "@/src/components/design-system/DesignSystemPlayground";

export default async function DesignSystemPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  setRequestLocale(params.locale);
  const locale = params.locale;

  return (
    <div className="min-h-screen bg-white text-corp-dark flex flex-col font-sans selection:bg-gray-200 selection:text-black">
      {/* 1. Corporate Header */}
      <LandingHeader locale={locale} />

      {/* 2. Main Two-Column Layout */}
      <div className="flex flex-1 items-start">
        {/* Sticky Sidebar */}
        <DesignSystemSidebar />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-white">
          {/* Header Banner */}
          <div className="border-b border-corp-border bg-corp-light px-6 sm:px-12 py-8">
            <Breadcrumb
              items={[
                { label: "Home", href: `/${locale}/landing-page` },
                { label: "Design System" },
              ]}
            />
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-corp-dark tracking-tight mt-3 mb-1">
              Design System & Token Architecture
            </h1>
            <p className="text-xs sm:text-sm text-corp-gray max-w-2xl leading-relaxed">
              Fully decoupled semantic tokens powering AL Araf Group websites. Edit colors, typography scales,
              and radii live below, test components in real-time, and copy production-ready CSS variables.
            </p>
          </div>

          {/* Interactive Playground & Live Component Documentation */}
          <DesignSystemPlayground />
        </main>
      </div>

      {/* 3. Corporate Footer */}
      <LandingFooter locale={locale} />
    </div>
  );
}
