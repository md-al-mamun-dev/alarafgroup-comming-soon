import React from "react";
import { Shield } from "lucide-react";
import { LandingHeader } from "@/src/components/landing/LandingHeader";
import { LandingFooter } from "@/src/components/landing/LandingFooter";
import { siteConfig } from "@/src/config/site";
import { setRequestLocale } from 'next-intl/server';
import { 
  LandingHero, 
  SectionContainer,
  SectionHeader, 
  LumivestCourseCard, 
  ValuesGrid,
  StatsBar, 
  CtaBanner,
  LumivestPrimaryButton,
  LumivestSecondaryButton,
  corporateData 
} from "@/src/design-system";

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);
  const locale = params.locale;

  return (
    <div className="min-h-screen bg-white text-corp-dark flex flex-col font-sans selection:bg-gray-200 selection:text-black">
      {/* 1. Header (Reference: 01_header.svg) */}
      <LandingHeader locale={locale} />

      <main className="flex-1 flex flex-col">
        {/* 2. Hero Section: Right-Focused Background Canvas Hero */}
        <LandingHero
          badgeLabel={`Welcome to ${siteConfig.name}`}
          title="Three Brands. One Promise of Trust."
          subtitle={siteConfig.description}
          imageUrl="/images/landing/hero-corporate.jpg"
          imageAlt="AL Araf Group Corporate Headquarters"
          actions={
            <div className="flex flex-wrap items-center gap-4">
              <LumivestPrimaryButton href={`/${locale}/landing-page/brands`}>
                Explore Our Brands
              </LumivestPrimaryButton>
              <LumivestSecondaryButton href={`/${locale}/landing-page/contact`}>
                Contact Us
              </LumivestSecondaryButton>
            </div>
          }
        />

        {/* 3. Who We Are Section (Reference: 03_landing_main.svg - y=560-897, bg #F3F4F6) */}
        <SectionContainer id="about" bgColor="light">
          <div className="max-w-3xl">
            <SectionHeader
              eyebrow="Overview"
              title="Who We Are"
              className="mb-6"
            />
            <p className="text-base sm:text-lg text-corp-gray leading-relaxed mb-6">
              AL Araf Group is a progressive Bangladeshi conglomerate built on foundational values of integrity, quality, and mutual partnership. Through our dedicated operating divisions, we connect local excellence with international markets.
            </p>
            <p className="text-base sm:text-lg text-corp-gray leading-relaxed">
              Our collaborative framework empowers each individual business vertical to maintain agile leadership while drawing on the financial strength, compliance rigor, and vision of the entire group.
            </p>
          </div>
        </SectionContainer>

        {/* 4. Our Brands Section (Reference: 03_landing_main.svg - y=897-1617, 3 Cards) */}
        <SectionContainer id="brands" bgColor="white">
          <SectionHeader
            eyebrow="Business Units"
            title="Our Brands"
            description="Diversified operations delivering reliable service and long-term value creation."
            align="center"
            className="mb-16"
          />

          {/* 3 Brand Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LumivestCourseCard
              category="Fashion Division"
              title="Al-Araf Fashion"
              imageUrl="/images/landing/brand-fashion.jpg"
              imageAlt="Al-Araf Fashion Division apparel sourcing and textile workshop"
              details={["Apparel Sourcing", "RMG Export", "Quality Assurance"]}
              buttonText="View Brand Details"
              href={`/${locale}/landing-page/brands/fashion`}
            />

            <LumivestCourseCard
              category="Travel Division"
              title="Artful Travel International"
              imageUrl="/images/landing/brand-travel.jpg"
              imageAlt="Artful Travel International flight and corporate travel management"
              details={["Corporate Travel", "Bespoke Tours", "Visa & Ticketing"]}
              buttonText="View Brand Details"
              href={`/${locale}/landing-page/brands/artful-travel`}
            />

            <LumivestCourseCard
              category="Agro Division"
              title="Al-Araf Agro"
              imageUrl="/images/landing/brand-agro.jpg"
              imageAlt="Al-Araf Agro sustainable agriculture, crop harvest, and food commodities"
              details={["Sustainable Agronomy", "Cold Chain Logistics", "Bulk Commodities"]}
              buttonText="View Brand Details"
              href={`/${locale}/landing-page/brands/agro`}
            />
          </div>
        </SectionContainer>

        {/* 5. Why Choose Us / Value Pillars (Reference: 03_landing_main.svg - y=1617-2019, bg #F3F4F6) */}
        <SectionContainer bgColor="light">
          <ValuesGrid 
            header={{
              eyebrow: "Core Strengths",
              title: "Why Choose Us"
            }}
            pillars={corporateData.landingPillars} 
            columns={4}
            itemAlign="center" 
          />
        </SectionContainer>

        {/* 6. At a Glance / Stats (Reference: 03_landing_main.svg - y=2019-2353, bg white) */}
        <StatsBar
          stats={corporateData.stats}
          bgColor="white"
        />

        {/* 7. Call To Action / Contact Banner (Reference: 03_landing_main.svg - y=2353-2695, bg #F3F4F6) */}
        <CtaBanner
          title="Let's Build the Future Together"
          description="Whether you are seeking a reliable apparel sourcing partner, travel management, or business collaboration, our team is ready to connect."
          actions={
            <div className="flex flex-wrap items-center justify-center gap-4">
              <LumivestPrimaryButton href={`/${locale}/landing-page/contact`}>
                Contact Us Today
              </LumivestPrimaryButton>
              <LumivestSecondaryButton href={`/${locale}`}>
                View Coming Soon Portal
              </LumivestSecondaryButton>
            </div>
          }
          bgColor="light"
        />
      </main>

      {/* 8. Footer (Reference: 02_footer.svg) */}
      <LandingFooter locale={locale} />
    </div>
  );
}
