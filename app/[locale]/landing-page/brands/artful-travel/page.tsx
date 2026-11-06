import React from "react";
import { LandingHeader } from "@/src/components/landing/LandingHeader";
import { LandingFooter } from "@/src/components/landing/LandingFooter";
import { setRequestLocale } from "next-intl/server";
import { 
  LandingHero, 
  SectionContainer,
  SectionHeader, 
  MediaSlot, 
  CardGrid,
  WorkflowGrid,
  CtaBanner,
  LumivestPrimaryButton,
  LumivestSecondaryButton,
  brandsData
} from "@/src/design-system";

export default async function ArtfulTravelDetailPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);
  const locale = params.locale;

  const data = brandsData.travel;

  return (
    <div className="min-h-screen bg-white text-corp-dark flex flex-col font-sans selection:bg-gray-200 selection:text-black">
      {/* 1. Header */}
      <LandingHeader locale={locale} />

      <main className="flex-1 flex flex-col">
        {/* Section 1: Hero Section (Right-Mounted Travel Background) */}
        <LandingHero
          breadcrumbs={[
            { label: "Home", href: `/${locale}/landing-page` },
            { label: "Our Brands", href: `/${locale}/landing-page/brands` },
            { label: data.name },
          ]}
          title={data.name}
          subtitle={data.heroSubtitle}
          imageUrl={data.imageUrl}
          imageAlt={`${data.name} Global Mobility & Corporate Travel`}
          actions={
            <div className="flex flex-wrap items-center gap-4">
              <LumivestPrimaryButton href={`/${locale}/landing-page/contact`}>
                Book A Call
              </LumivestPrimaryButton>
              <LumivestSecondaryButton href="https://wa.me/" isExternal>
                WhatsApp
              </LumivestSecondaryButton>
            </div>
          }
          floatingCard={{
            icon: data.icon,
            title: data.mediaTitle,
            subtitle: "Global Mobility & Ticketing Concierge",
            statusText: data.mediaStatus,
          }}
        />

        {/* Section 2: About Artful Travel International */}
        <SectionContainer bgColor="light" paddingY="default">
          <div className="max-w-3xl">
            <SectionHeader
              title={`About ${data.name}`}
              className="mb-6"
            />
            <p className="text-base sm:text-lg text-corp-gray leading-relaxed mb-4">
              {data.summary}
            </p>
            <p className="text-sm sm:text-base text-corp-gray leading-relaxed">
              {data.description}
            </p>
          </div>
        </SectionContainer>

        {/* Section 3: Our Services */}
        <SectionContainer id="our-services" bgColor="white" paddingY="default">
          <CardGrid
            header={{
              title: "Our Services",
            }}
            items={data.offerings}
            columns={4}
            cardVariant="white"
          />
        </SectionContainer>

        {/* Section 4: How It Works */}
        <SectionContainer bgColor="white" paddingY="default">
          <WorkflowGrid
            header={{
              title: "How It Works",
            }}
            steps={data.steps || []}
          />
        </SectionContainer>

        {/* Section 5: Why Choose Us */}
        <SectionContainer bgColor="light" paddingY="default">
          <CardGrid
            header={{
              title: "Why Choose Us",
            }}
            items={data.whyChooseUs}
            columns={4}
            cardVariant="white"
          />
        </SectionContainer>

        {/* Section 6: Start Your Journey Banner */}
        <CtaBanner
          title="Start Your Journey"
          description="Ready to book your flights, plan your holy pilgrimage, or explore customized international travel packages? Connect with our ticketing and concierge specialists today."
          primaryCta={{
            label: "Book A Call",
            href: `/${locale}/landing-page/contact`,
          }}
          secondaryCta={{
            label: "WhatsApp Chat",
            href: "https://wa.me/",
          }}
          bgColor="light"
        />
      </main>

      {/* Footer */}
      <LandingFooter locale={locale} />
    </div>
  );
}
