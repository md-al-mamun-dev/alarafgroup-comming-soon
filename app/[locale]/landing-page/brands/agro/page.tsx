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
  GalleryGrid,
  CtaBanner,
  LumivestPrimaryButton,
  LumivestSecondaryButton,
  brandsData
} from "@/src/design-system";

export default async function AgroDetailPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);
  const locale = params.locale;

  const data = brandsData.agro;

  return (
    <div className="min-h-screen bg-white text-corp-dark flex flex-col font-sans selection:bg-gray-200 selection:text-black">
      {/* 1. Header */}
      <LandingHeader locale={locale} />

      <main className="flex-1 flex flex-col">
        {/* Section 1: Hero Section (Right-Mounted Agro Background) */}
        <LandingHero
          breadcrumbs={[
            { label: "Home", href: `/${locale}/landing-page` },
            { label: "Our Brands", href: `/${locale}/landing-page/brands` },
            { label: data.name },
          ]}
          title={data.name}
          subtitle={data.heroSubtitle}
          imageUrl={data.imageUrl}
          imageAlt={`${data.name} Sustainable Agriculture & Food Commodities`}
          actions={
            <div className="flex flex-wrap items-center gap-4">
              <LumivestPrimaryButton href={`/${locale}/landing-page/contact`}>
                Contact Us
              </LumivestPrimaryButton>
              <LumivestSecondaryButton href="#what-we-offer">
                Book A Consultation
              </LumivestSecondaryButton>
            </div>
          }
          floatingCard={{
            icon: data.icon,
            title: data.mediaTitle,
            subtitle: "Global GAP Certified • Sustainable Agronomy",
            statusText: data.mediaStatus,
          }}
        />

        {/* Section 2: About Al-Araf Agro */}
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

        {/* Section 3: What We Offer */}
        <SectionContainer id="what-we-offer" bgColor="white" paddingY="default">
          <CardGrid
            header={{
              title: "What We Offer",
              align: "center",
            }}
            items={data.offerings}
            columns={3}
            cardVariant="white"
            cardAlign="center-justify"
          />
        </SectionContainer>

        {/* Section 4: Why Choose Us */}
        <SectionContainer bgColor="light" paddingY="default">
          <CardGrid
            header={{
              title: "Why Choose Us",
              align: "center",
            }}
            items={data.whyChooseUs}
            columns={4}
            cardVariant="white"
            cardAlign="center-justify"
          />
        </SectionContainer>

        {/* Section 5: Gallery */}
        <SectionContainer bgColor="white" paddingY="default">
          <GalleryGrid
            brandName={data.name}
            headerTitle="Gallery"
            countLabel="6 Curated Agricultural Centers"
            items={data.gallery}
            columns={3}
            aspectRatio="agro"
          />
        </SectionContainer>

        {/* Section 6: Work With Us Banner */}
        <CtaBanner
          title="Work With Us"
          description="Connect with our agricultural marketing specialists and farm procurement executives for wholesale bulk supply, contract farming, or commercial partnership inquiries."
          primaryCta={{
            label: "Contact Us",
            href: `/${locale}/landing-page/contact`,
          }}
          secondaryCta={{
            label: "Book A Consultation",
            href: "#what-we-offer",
          }}
          bgColor="light"
        />
      </main>

      {/* Footer */}
      <LandingFooter locale={locale} />
    </div>
  );
}
