import React from "react";
import { Send, MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from "lucide-react";
import { FormInput, FormSelect, FormTextarea } from "../atoms/FormControls";
import { Button } from "../atoms/Button";
import { LumivestPrimaryButton } from "../atoms/BookCallButton";
import { MediaSlot } from "../molecules/MediaSlot";

export interface ContactInfoItem {
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
}

export interface SocialLinkItem {
  name: string;
  href: string;
  icon: typeof ExternalLink;
}

export interface ContactSectionProps {
  officeDetails: ContactInfoItem[];
  socialLinks: SocialLinkItem[];
  className?: string;
}

export function ContactSection({ officeDetails, socialLinks, className = "" }: ContactSectionProps) {
  const serviceOptions = [
    { label: "Al-Araf Fashion (Apparel & RMG Sourcing)", value: "fashion" },
    { label: "Artful Travel International (Travel, Umrah & Ticketing)", value: "travel" },
    { label: "Al-Araf Agro (Agronomy, Produce & Food Commodities)", value: "agro" },
    { label: "General Corporate Inquiry", value: "general" },
  ];

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start ${className}`}>
      {/* Left Column: Form Box */}
      <div className="lg:col-span-6 rounded-2xl border border-corp-border p-8 sm:p-10 bg-white shadow-xs flex flex-col">
        <div className="mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-corp-dark tracking-tight mb-2">
            Send a Message
          </h2>
          <p className="text-sm text-corp-gray leading-relaxed">
            Fill out the form below and our corporate representatives will get back to you promptly.
          </p>
        </div>

        <form className="space-y-6 flex-1 flex flex-col">
          <FormInput label="Name" required placeholder="Your name" type="text" />
          <FormInput label="Phone" required placeholder="01700-000000" type="tel" />
          <FormInput label="Email" required placeholder="name@example.com" type="email" />
          <FormSelect label="Interested in" required options={serviceOptions} placeholder="Select a service" defaultValue="" />
          <FormTextarea label="Message" required placeholder="How can we help?" rows={4} />

          <div className="pt-2">
            <LumivestPrimaryButton
              type="submit"
              iconCircle={false}
              icon={<Send className="w-5 h-5 stroke-[1.75] text-[#FAFAF7]" />}
            >
              Send Message
            </LumivestPrimaryButton>
          </div>
        </form>
      </div>

      {/* Right Column: Office Info, Social Links, Map Frame */}
      <div className="lg:col-span-6 flex flex-col space-y-10">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-corp-dark tracking-tight mb-2">
            Our Offices
          </h2>
          <p className="text-sm text-corp-gray">
            Visit our corporate headquarters or get in touch through our official communication channels.
          </p>
        </div>

        {/* Office Details Cards */}
        <div className="space-y-6">
          {officeDetails.map((detail, idx) => {
            const Icon = detail.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[7px] bg-corp-light border border-corp-border flex items-center justify-center text-corp-dark shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-corp-muted mb-1">
                    {detail.label}
                  </h4>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="text-sm sm:text-base font-semibold text-corp-dark hover:text-gray-600 transition-colors block"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-sm sm:text-base font-semibold text-corp-dark">
                      {detail.value}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Buttons */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-corp-muted mb-3">
            Connect With Us
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 rounded-[7px] border-2 border-corp-dark flex items-center justify-center gap-2 text-xs font-bold text-corp-dark hover:bg-corp-dark hover:text-white transition-all shadow-xs"
                >
                  <span>{social.name}</span>
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Map Frame */}
        <MediaSlot
          icon={MapPin}
          badgeText="Map Location"
          title="AL Araf Group Corporate Headquarters"
          subtitle="534 × 259 Interactive Geospatial Viewport"
          footerSpec="SPEC // 09_CONTACT_US"
          footerStatus="Dhaka, Bangladesh"
          aspectRatio="brand-feature"
        />
      </div>
    </div>
  );
}

