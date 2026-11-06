import React from "react";
import { Award, Target, Eye } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import { setRequestLocale } from 'next-intl/server';
import { 
  LandingHeader,
  LandingFooter,
  LandingHero, 
  SectionContainer,
  SectionHeader, 
  MediaSlot,
  ValuesGrid,
  ScrollReveal,
  PurposeFocalGrid,
  PurposeCard,
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
              <ScrollReveal delay={0}>
                <SectionHeader
                  eyebrow="Our Heritage"
                  title="Building on a Legacy of Trust"
                  className="mb-0 sm:mb-0"
                />
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <p className="text-base sm:text-lg text-corp-gray leading-relaxed">
                  What began as a focused initiative in Bangladesh&apos;s apparel export sector has evolved into a forward-thinking group of enterprises. Our growth has been organic, guided by disciplined management and unwavering respect for long-term partnerships.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <p className="text-sm sm:text-base text-corp-gray leading-relaxed">
                  Today, AL Araf Group brings together specialized talent, world-class operational capabilities, and deep market insights to consistently deliver value for our clients, employees, and community stakeholders.
                </p>
              </ScrollReveal>
            </div>

            {/* Right Column: Story Image Slot */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <ScrollReveal delay={450} className="w-full max-w-xl">
                <MediaSlot
                  imageUrl="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80"
                  imageAlt="AL Araf Group corporate strategy, executive leadership, and heritage meeting"
                  badgeText="Heritage & Evolution"
                  title="Generational Growth"
                  subtitle="Committed to Sustainable Industrial Expansion"
                  footerSpec="SPEC // STORY_FRAME"
                  footerStatus="Established 2018"
                  aspectRatio="brand-feature"
                  tilt={true}
                />
              </ScrollReveal>
            </div>
          </div>
        </SectionContainer>

        {/* Section 3: Mission & Vision Cards */}
        <SectionContainer bgColor="white" paddingY="default">
          <ScrollReveal delay={0}>
            <SectionHeader
              eyebrow="Purpose & Direction"
              title="Our Guiding Purpose"
              align="center"
              className="mb-14"
            />
          </ScrollReveal>

          <PurposeFocalGrid>
            <ScrollReveal delay={150}>
              <PurposeCard
                icon={Target}
                title="Our Mission"
                description="To deliver premier products and comprehensive services that consistently surpass client expectations, while fostering an ecosystem of trust, sustainable growth, and social responsibility."
              />
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <PurposeCard
                icon={Eye}
                title="Our Vision"
                description="To be recognized internationally as Bangladesh's most reliable, progressive, and ethical diversified group, driving innovation and enduring partnership across all key business sectors."
              />
            </ScrollReveal>
          </PurposeFocalGrid>
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
              <ScrollReveal delay={100} className="w-full max-w-xl">
                <MediaSlot
                  imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                  imageAlt="AL Araf Group executive board, corporate governance, and strategic leadership"
                  badgeText="Strategic Leadership"
                  title="Governance & Stewardship"
                  subtitle="Committed to world-class labor compliance and ethical growth"
                  footerSpec="SPEC // GOVERNANCE"
                  footerStatus="Executive Board"
                  aspectRatio="brand-feature"
                  tilt={true}
                />
              </ScrollReveal>
            </div>

            {/* Right Column: Leadership Narrative */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <ScrollReveal delay={150}>
                <SectionHeader
                  eyebrow="Governance & Stewardship"
                  title="Our Leadership & Commitment"
                  className="mb-0 sm:mb-0"
                />
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <p className="text-base sm:text-lg text-corp-gray leading-relaxed">
                  The leadership of AL Araf Group is anchored by seasoned executives with extensive experience in international trade, textiles manufacturing, travel logistics, and corporate finance.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={450}>
                <p className="text-sm sm:text-base text-corp-gray leading-relaxed">
                  We remain passionately dedicated to empowering our workforce, adhering to world-class labor and environmental compliance, and championing the economic development of Bangladesh on the global stage.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={600} className="pt-2">
                <LumivestPrimaryButton href={`/${locale}/landing-page/contact`}>
                  Connect With Our Team
                </LumivestPrimaryButton>
              </ScrollReveal>
            </div>
          </div>
        </SectionContainer>
      </main>

      {/* Footer */}
      <LandingFooter locale={locale} />
    </div>
  );
}
