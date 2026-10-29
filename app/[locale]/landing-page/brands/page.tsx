import React from "react";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { LandingHeader } from "@/src/components/landing/LandingHeader";
import { LandingFooter } from "@/src/components/landing/LandingFooter";
import { siteConfig } from "@/src/config/site";
import { setRequestLocale } from 'next-intl/server';
import { 
  LandingHero, 
  SectionContainer,
  MediaSlot, 
  HighlightList, 
  CtaBanner,
  Button,
  Badge,
  LumivestPrimaryButton,
  LumivestSecondaryButton,
  brandsData
} from "@/src/design-system";

export default async function BrandsPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);
  const locale = params.locale;

  const brandsList = [brandsData.fashion, brandsData.travel, brandsData.agro];

  return (
    <div className="min-h-screen bg-white text-corp-dark flex flex-col font-sans selection:bg-gray-200 selection:text-black">
      {/* 1. Header */}
      <LandingHeader locale={locale} />

      <main className="flex-1 flex flex-col">
        {/* Section 1: Hero Banner (Right-Mounted Global Trade Background) */}
        <LandingHero
          breadcrumbs={[
            { label: "Home", href: `/${locale}/landing-page` },
            { label: "Our Brands" },
          ]}
          title="Our Brands"
          subtitle={`Explore the diversified corporate portfolio of ${siteConfig.name}. Each of our dedicated business units operates with unwavering commitment to quality, integrity, and sustainable growth.`}
          imageUrl="/images/landing/brands-overview.jpg"
          imageAlt="AL Araf Group Global Trade, Logistics & Operating Divisions"
          actions={
            <div className="flex flex-wrap items-center gap-4">
              <LumivestPrimaryButton href={`/${locale}/landing-page/brands/fashion`}>
                Explore Divisions
              </LumivestPrimaryButton>
              <LumivestSecondaryButton href={`/${locale}/landing-page/contact`}>
                Contact Group
              </LumivestSecondaryButton>
            </div>
          }
          floatingCard={{
            icon: Briefcase,
            title: "Strategic Business Units",
            subtitle: "End-to-End Enterprise Solutions",
            statusText: "Verified Standards",
          }}
        />

        {/* Section 2: Detailed Brand Showcase */}
        <SectionContainer id="brands-showcase" bgColor="white" paddingY="default" hasBorderBottom={false}>
          <div className="space-y-20 lg:space-y-28">
            {brandsList.map((brand) => {
              const Icon = brand.icon;
              return (
                <div 
                  key={brand.id}
                  id={brand.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8 first:pt-0"
                >
                  {/* Left Column: Brand Details (Span 6) */}
                  <div className="lg:col-span-6 flex flex-col space-y-6">
                    <Badge variant="neutral" className="self-start">
                      {brand.badgeLabel}
                    </Badge>

                    <div>
                      <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-corp-dark tracking-tight mb-2">
                        {brand.name}
                      </h2>
                      <p className="text-sm sm:text-base font-semibold text-corp-muted tracking-wide">
                        {brand.category}
                      </p>
                    </div>

                    <div className="space-y-4 text-sm sm:text-base text-corp-gray leading-relaxed">
                      <p className="font-medium text-corp-dark">
                        {brand.summary}
                      </p>
                      <p>
                        {brand.description}
                      </p>
                    </div>

                    <HighlightList
                      title="Core Capabilities & Standards"
                      items={brand.highlights}
                      className="pt-2"
                    />

                    <div className="pt-2">
                      <Button
                        href={`/${locale}/landing-page/brands/${brand.slug}`}
                        variant="secondary"
                        size="md"
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        {brand.ctaText}
                      </Button>
                    </div>
                  </div>

                  {/* Right Column: Visual Media Slot */}
                  <div className="lg:col-span-6 flex justify-center lg:justify-end">
                    <MediaSlot
                      icon={Icon}
                      badgeText="Portfolio Media Slot"
                      title={brand.name}
                      subtitle="584 × 319 Interactive Showcase Frame"
                      footerSpec="SPEC // 05_OUR_BRANDS"
                      footerStatus="Verified Unit"
                      aspectRatio="brand-feature"
                      imageUrl={brand.imageUrl}
                      imageAlt={brand.name}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </SectionContainer>

        {/* Section 3: Collaboration & Growth CTA Banner */}
        <CtaBanner
          title="Partner With Our Brands"
          description="Whether you require dependable apparel manufacturing, dedicated corporate travel coordination, or strategic venture collaboration, our leadership team is ready to connect."
          actions={
            <div className="flex flex-wrap items-center justify-center gap-4">
              <LumivestPrimaryButton href={`/${locale}/landing-page/contact`}>
                Initiate Business Inquiry
              </LumivestPrimaryButton>
              <LumivestSecondaryButton href={`/${locale}/landing-page/about`}>
                Read About Our Group
              </LumivestSecondaryButton>
            </div>
          }
          bgColor="light"
        />
      </main>

      {/* Footer */}
      <LandingFooter locale={locale} />
    </div>
  );
}
