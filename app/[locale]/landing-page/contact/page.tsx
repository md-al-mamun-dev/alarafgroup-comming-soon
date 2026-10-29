import React from "react";
import { LandingHeader } from "@/src/components/landing/LandingHeader";
import { LandingFooter } from "@/src/components/landing/LandingFooter";
import { setRequestLocale } from "next-intl/server";
import { 
  LandingHero, 
  SectionContainer,
  ContactSection,
  LumivestPrimaryButton,
  LumivestSecondaryButton,
  corporateData 
} from "@/src/design-system";
import { Headphones, Send } from "lucide-react";

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);
  const locale = params.locale;

  return (
    <div className="min-h-screen bg-white text-corp-dark flex flex-col font-sans selection:bg-gray-200 selection:text-black">
      {/* Header */}
      <LandingHeader locale={locale} />

      <main className="flex-1 flex flex-col">
        {/* Section 1: Hero Banner (Right-Mounted Corporate Concierge & Reception Background) */}
        <LandingHero
          breadcrumbs={[
            { label: "Home", href: `/${locale}/landing-page` },
            { label: "Contact" },
          ]}
          badgeLabel="Direct Corporate Desk"
          title="Contact Us"
          subtitle="Get in touch with AL Araf Group. Whether you have inquiries regarding our garment manufacturing division, travel services, or agricultural supply networks, our team is ready to assist you."
          imageUrl="/images/landing/contact-hero.jpg"
          imageAlt="AL Araf Group Corporate Reception and Concierge Desk"
          actions={
            <div className="flex flex-wrap items-center gap-4">
              <LumivestPrimaryButton
                href="#contact-form"
                iconCircle={false}
                icon={<Send className="w-5 h-5 stroke-[1.75] text-[#FAFAF7]" />}
              >
                Send a Message
              </LumivestPrimaryButton>
              <LumivestSecondaryButton href="tel:+8801700000000">
                Call Direct Line
              </LumivestSecondaryButton>
            </div>
          }
          floatingCard={{
            icon: Headphones,
            title: "Direct Corporate Desk",
            subtitle: "Dhaka HQ • Fast Response",
            statusText: "24/7 Priority Support",
          }}
        />

        {/* Section 2: Contact Form & Office Details (Reference: y=555-1361) */}
        <SectionContainer id="contact-form" bgColor="white" className="py-16 sm:py-24">
          <ContactSection 
            officeDetails={corporateData.officeDetails} 
            socialLinks={corporateData.socialLinks} 
          />
        </SectionContainer>
      </main>

      {/* Footer */}
      <LandingFooter locale={locale} />
    </div>
  );
}

