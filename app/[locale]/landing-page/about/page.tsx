import React from "react";
import { Award, Target, Eye } from "lucide-react";
import { LandingHeader } from "@/src/components/landing/LandingHeader";
import { LandingFooter } from "@/src/components/landing/LandingFooter";
import { siteConfig } from "@/src/config/site";
import { setRequestLocale } from 'next-intl/server';
import { 
  LandingHero, 
  SectionContainer,
  SectionHeader, 
  MediaSlot,
  ValuesGrid,
  LumivestPrimaryButton,
  corporateData
} from "@/src/design-system";

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);
  const locale = params.locale;

  return (
    <div className="min-h-screen bg-white text-corp-dark flex flex-col font-sans selection:bg-gray-200 selection:text-black">
      {/* 1. Header */}
      <LandingHeader locale={locale} />

      <main className="flex-1 flex flex-col">
        {/* Section 1: Hero with Right-Mounted Executive Background */}
        <LandingHero
          breadcrumbs={[
            { label: "Home", href: `/${locale}/landing-page` },
            { label: "About Us" },
          ]}
          title="About AL Araf Group"
          subtitle="A diversified Bangladeshi conglomerate established to set international benchmarks across garments sourcing, travel and tourism solutions, and strategic future ventures."
          description="Founded with a clear vision to bridge Bangladeshi manufacturing and service excellence with global standards, AL Araf Group stands as a symbol of trust, dependability, and commercial ambition."
          imageUrl="/images/landing/about-corporate.jpg"
          imageAlt="AL Araf Group Executive Boardroom & Headquarters"
          floatingCard={{
            icon: Award,
            title: "Our Corporate Legacy",
            subtitle: "Ethical Leadership & Global Standards",
            statusText: "ISO 9001 • Verified Governance",
          }}
        />

        {/* Section 2: Our Story & Heritage */}
        <SectionContainer bgColor="light" paddingY="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Story Text */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <SectionHeader
                eyebrow="Our Heritage"
                title="Building on a Legacy of Trust"
                className="mb-0 sm:mb-0"
              />

              <p className="text-base sm:text-lg text-corp-gray leading-relaxed">
                What began as a focused initiative in Bangladesh&apos;s apparel export sector has evolved into a forward-thinking group of enterprises. Our growth has been organic, guided by disciplined management and unwavering respect for long-term partnerships.
              </p>

              <p className="text-sm sm:text-base text-corp-gray leading-relaxed">
                Today, AL Araf Group brings together specialized talent, world-class operational capabilities, and deep market insights to consistently deliver value for our clients, employees, and community stakeholders.
              </p>
            </div>

            {/* Right Column: Story Image Slot */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <MediaSlot
                badgeText="Heritage & Evolution"
                title="Generational Growth"
                subtitle="Committed to Sustainable Industrial Expansion"
                footerSpec="SPEC // STORY_FRAME"
                footerStatus="Established 2018"
                aspectRatio="brand-feature"
              />
            </div>
          </div>
        </SectionContainer>

        {/* Section 3: Mission & Vision Cards */}
        <SectionContainer bgColor="white" paddingY="default">
          <SectionHeader
            eyebrow="Purpose & Direction"
            title="Our Guiding Purpose"
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-corp-border p-8 shadow-xs flex items-start gap-5 hover:border-corp-dark transition-colors">
              <div className="w-12 h-12 rounded-lg bg-corp-light border border-corp-border flex items-center justify-center text-corp-dark shrink-0">
                <Target className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-corp-dark mb-2">
                  Our Mission
                </h3>
                <p className="text-sm text-corp-gray leading-relaxed">
                  To deliver premier products and comprehensive services that consistently surpass client expectations, while fostering an ecosystem of trust, sustainable growth, and social responsibility.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-corp-border p-8 shadow-xs flex items-start gap-5 hover:border-corp-dark transition-colors">
              <div className="w-12 h-12 rounded-lg bg-corp-light border border-corp-border flex items-center justify-center text-corp-dark shrink-0">
                <Eye className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-corp-dark mb-2">
                  Our Vision
                </h3>
                <p className="text-sm text-corp-gray leading-relaxed">
                  To be recognized internationally as Bangladesh&apos;s most reliable, progressive, and ethical diversified group, driving innovation and enduring partnership across all key business sectors.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Section 4: Core Values - 5 Pillars */}
        <SectionContainer bgColor="light" paddingY="spacious">
          <ValuesGrid
            header={{
              eyebrow: "Foundations",
              title: "Our Core Values",
            }}
            pillars={corporateData.aboutPillars}
            columns={5}
            itemAlign="center"
          />
        </SectionContainer>

        {/* Section 5: Leadership & Commitment */}
        <SectionContainer bgColor="white" paddingY="spacious">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Image Slot */}
            <div className="lg:col-span-6 flex justify-center lg:justify-start">
              <MediaSlot
                badgeText="Strategic Leadership"
                title="Governance & Stewardship"
                subtitle="Committed to world-class labor compliance and ethical growth"
                footerSpec="SPEC // GOVERNANCE"
                footerStatus="Executive Board"
                aspectRatio="brand-feature"
              />
            </div>

            {/* Right Column: Leadership Narrative */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <SectionHeader
                eyebrow="Governance & Stewardship"
                title="Our Leadership & Commitment"
                className="mb-0 sm:mb-0"
              />

              <p className="text-base sm:text-lg text-corp-gray leading-relaxed">
                The leadership of AL Araf Group is anchored by seasoned executives with extensive experience in international trade, textiles manufacturing, travel logistics, and corporate finance.
              </p>

              <p className="text-sm sm:text-base text-corp-gray leading-relaxed">
                We remain passionately dedicated to empowering our workforce, adhering to world-class labor and environmental compliance, and championing the economic development of Bangladesh on the global stage.
              </p>

              <div className="pt-2">
                <LumivestPrimaryButton href={`/${locale}/landing-page/contact`}>
                  Connect With Our Team
                </LumivestPrimaryButton>
              </div>
            </div>
          </div>
        </SectionContainer>
      </main>

      {/* Footer */}
      <LandingFooter locale={locale} />
    </div>
  );
}
