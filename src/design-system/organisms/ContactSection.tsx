"use client";

import React, { useState } from "react";
import { Send, MapPin, Phone, Mail, Clock, Navigation, ExternalLink, X, LucideIcon } from "lucide-react";
import { FormInput, FormSelect, FormTextarea } from "../atoms/FormControls";
import { LumivestPrimaryButton } from "../atoms/BookCallButton";
import {
  LumivestInteractiveSecondaryButton,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
  type LumivestSocialPlatform,
} from "../atoms/LumivestInteractiveSecondaryButton";
import { MediaSlot } from "../molecules/MediaSlot";
import { ScrollReveal } from "../molecules/ScrollReveal";

export { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon };

export type ContactIconKey = "map-pin" | "phone" | "mail" | "clock";

const CONTACT_ICONS: Record<ContactIconKey, LucideIcon> = {
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
};

export interface ContactInfoItem {
  icon?: ContactIconKey | LucideIcon | typeof MapPin;
  label: string;
  value: string;
  href?: string;
}

export interface SocialLinkItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }> | React.ReactNode;
}

export interface ContactSectionProps {
  officeDetails: ContactInfoItem[];
  socialLinks: SocialLinkItem[];
  className?: string;
}

export function ContactSection({ officeDetails, socialLinks, className = "" }: ContactSectionProps) {
  const [isDirectionsModalOpen, setIsDirectionsModalOpen] = useState(false);

  const serviceOptions = [
    { label: "Al-Araf Fashion (Apparel & RMG Sourcing)", value: "fashion" },
    { label: "Artful Travel International (Travel, Umrah & Ticketing)", value: "travel" },
    { label: "Al-Araf Agro (Agronomy, Produce & Food Commodities)", value: "agro" },
    { label: "General Corporate Inquiry", value: "general" },
  ];

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start ${className}`}>
      {/* Left Column: Form Box with ScrollReveal */}
      <div className="lg:col-span-6 flex flex-col">
        <ScrollReveal delay={0} duration={800} className="h-full">
          <div className="rounded-2xl border border-corp-border p-8 sm:p-10 bg-white shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
            <ScrollReveal delay={50} duration={700}>
              <div className="mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-corp-dark tracking-tight mb-2">
                  Send a Message
                </h2>
                <p className="text-sm text-corp-gray leading-relaxed">
                  Fill out the form below and our corporate representatives will get back to you promptly.
                </p>
              </div>
            </ScrollReveal>

            <form className="space-y-6 flex-1 flex flex-col">
              <ScrollReveal delay={110} duration={700}>
                <FormInput label="Name" required placeholder="Your name" type="text" />
              </ScrollReveal>

              <ScrollReveal delay={170} duration={700}>
                <FormInput label="Phone" required placeholder="01700-000000" type="tel" />
              </ScrollReveal>

              <ScrollReveal delay={230} duration={700}>
                <FormInput label="Email" required placeholder="name@example.com" type="email" />
              </ScrollReveal>

              <ScrollReveal delay={290} duration={700}>
                <FormSelect label="Interested in" required options={serviceOptions} placeholder="Select a service" defaultValue="" />
              </ScrollReveal>

              <ScrollReveal delay={350} duration={700}>
                <FormTextarea label="Message" required placeholder="How can we help?" rows={4} />
              </ScrollReveal>

              <ScrollReveal delay={410} duration={700} className="pt-2">
                <LumivestPrimaryButton
                  type="submit"
                  iconCircle={false}
                  icon={<Send className="w-5 h-5 stroke-[1.75] text-[#FAFAF7]" />}
                >
                  Send Message
                </LumivestPrimaryButton>
              </ScrollReveal>
            </form>
          </div>
        </ScrollReveal>
      </div>

      {/* Right Column: Office Info, Social Links, Map Frame */}
      <div className="lg:col-span-6 flex flex-col space-y-10">
        <ScrollReveal delay={100} duration={800}>
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-corp-dark tracking-tight mb-2">
              Our Offices
            </h2>
            <p className="text-sm text-corp-gray">
              Visit our corporate headquarters or get in touch through our official communication channels.
            </p>
          </div>
        </ScrollReveal>

        {/* Office Details Cards */}
        <div className="space-y-6">
          {officeDetails.map((detail, idx) => {
            const Icon = typeof detail.icon === "string" 
              ? (CONTACT_ICONS[detail.icon as ContactIconKey] || MapPin)
              : (detail.icon || MapPin);
            const isFirstItem = idx === 0;
            return (
              <ScrollReveal key={idx} delay={150 + idx * 80} duration={800}>
                <div className="flex flex-col gap-2.5 p-3 rounded-xl hover:bg-stone-50/80 transition-colors duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[7px] bg-corp-light border border-corp-border flex items-center justify-center text-corp-dark shrink-0 mt-0.5 shadow-xs">
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

                  {/* Get Directions Button for Head Office */}
                  {isFirstItem && (
                    <div className="pl-14">
                      <button
                        type="button"
                        onClick={() => setIsDirectionsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#8C7B5E] bg-[#FAFAF7] hover:bg-[#8C7B5E] text-corp-dark hover:text-[#FAFAF7] text-xs font-semibold tracking-normal transition-all duration-300 shadow-xs group cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#8C7B5E] group-hover:text-[#FAFAF7] transition-colors" />
                        <span>Get Directions from Your Location</span>
                      </button>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Social Buttons */}
        <ScrollReveal delay={450} duration={800}>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-corp-muted mb-3">
              Connect With Us
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {socialLinks.map((social) => {
                const platform = social.name.toLowerCase() as LumivestSocialPlatform;
                return (
                  <LumivestInteractiveSecondaryButton
                    key={social.name}
                    href={social.href}
                    isExternal
                    surface="light"
                    borderStyle="prominent"
                    variant="gold-fill"
                    size="md"
                    iconCircle={false}
                    iconAnimation="pop"
                    social={platform}
                    className="w-full !h-12 !py-0 !px-3 sm:!px-4 justify-center shadow-xs"
                    labelClassName="text-xs sm:text-sm font-semibold tracking-normal"
                  >
                    {social.name}
                  </LumivestInteractiveSecondaryButton>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Map Frame with ScrollReveal and Subtle Shadow Bloom */}
        <ScrollReveal delay={550} duration={800}>
          <div className="w-full max-w-xl aspect-[584/319] rounded-2xl border border-corp-border bg-stone-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 relative flex flex-col justify-between">
            <iframe
              title="AL Araf Group Corporate Headquarters - Gulshan 2, Dhaka"
              src="https://www.openstreetmap.org/export/embed.html?bbox=90.4080%2C23.7900%2C90.4180%2C23.7980&layer=mapnik&marker=23.7940%2C90.4130"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
            />

            {/* Top Header Badge Overlay */}
            <div className="relative z-10 p-5 flex items-center justify-between pointer-events-none">
              <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md border border-corp-border text-corp-dark shadow-xs flex items-center justify-center">
                <MapPin className="w-5 h-5 stroke-[1.75]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-corp-dark bg-white/95 backdrop-blur-md px-3 py-1 rounded-md border border-corp-border shadow-xs">
                Gulshan 2, Dhaka
              </span>
            </div>

            {/* Bottom Bar Info Overlay (Strict Single Row) */}
            <div className="relative z-10 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-corp-border/80 flex items-center justify-between gap-3 text-xs">
              <div className="min-w-0 flex flex-col justify-center">
                <span className="font-heading font-bold text-corp-dark text-xs sm:text-sm truncate">
                  AL Araf Group Corporate Headquarters
                </span>
                <span className="text-[11px] text-corp-gray truncate">
                  Gulshan 2 Circle, Dhaka 1212, Bangladesh
                </span>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsDirectionsModalOpen(true)}
                  className="group/dir relative inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-[#1C1C1A] text-[#FAFAF7] text-xs font-semibold tracking-normal overflow-hidden isolate shadow-xs cursor-pointer select-none transition-colors duration-500 ease-[cubic-bezier(0.5,0,0.2,1)] hover:bg-[#8C7B5E]"
                >
                  {/* Expander Gold Circle originating at the right icon slot */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-3 w-3 h-3 rounded-full bg-[#8C7B5E] z-0 scale-0 transition-transform duration-500 ease-[cubic-bezier(0.5,0,0.2,1)] group-hover/dir:scale-[25] origin-center will-change-transform"
                  />

                  <span className="relative z-10 select-none">
                    Directions
                  </span>

                  <span
                    aria-hidden="true"
                    className="relative z-10 flex items-center justify-center shrink-0 w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/dir:scale-115 group-hover/dir:-translate-y-0.5 group-hover/dir:translate-x-0.5"
                  >
                    <Navigation className="w-3.5 h-3.5 fill-current text-[#FAFAF7]" />
                  </span>
                </button>

                <a
                  href="https://www.openstreetmap.org/?mlat=23.7940&mlon=90.4130#map=16/23.7940/90.4130"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/map relative inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-[#FAFAF7] border border-[#8C7B5E] text-[#4A4A45] text-xs font-semibold tracking-normal overflow-hidden isolate shadow-xs cursor-pointer select-none transition-colors duration-700 ease-[cubic-bezier(0.5,0,0.2,1)] hover:border-[#8C7B5E]"
                >
                  {/* Expander Gold Circle originating at the right icon slot */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-3 w-3 h-3 rounded-full bg-[#8C7B5E] z-0 scale-0 transition-transform duration-700 ease-[cubic-bezier(0.5,0,0.2,1)] group-hover/map:scale-[25] origin-center will-change-transform"
                  />

                  <span className="relative z-10 transition-colors duration-700 ease-[cubic-bezier(0.5,0,0.2,1)] group-hover/map:text-[#FAFAF7] select-none">
                    Full Map
                  </span>

                  <span
                    aria-hidden="true"
                    className="relative z-10 flex items-center justify-center shrink-0 w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.5,0,0.2,1)] group-hover/map:translate-x-0.5 group-hover/map:-translate-y-0.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#8C7B5E] transition-colors duration-700 ease-[cubic-bezier(0.5,0,0.2,1)] group-hover/map:text-[#FAFAF7]" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Directions Provider Modal */}
      {isDirectionsModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsDirectionsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl border border-corp-border shadow-2xl max-w-md w-full p-6 relative flex flex-col space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAFAF7] border border-corp-border flex items-center justify-center text-[#8C7B5E]">
                  <Navigation className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-corp-dark">
                    Get Directions
                  </h3>
                  <p className="text-xs text-corp-gray">
                    Select your preferred navigation provider
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDirectionsModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-corp-muted hover:text-corp-dark hover:bg-corp-light transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Info Box */}
            <div className="rounded-xl bg-[#FAFAF7] border border-[#EAE6DD] p-3.5 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#8C7B5E] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-corp-dark block">
                  AL Araf Group Corporate Headquarters
                </span>
                <span className="text-corp-gray block mt-0.5">
                  Gulshan 2 Circle, Dhaka 1212, Bangladesh
                </span>
              </div>
            </div>

            {/* Providers List */}
            <div className="space-y-2.5">
              {/* Google Maps */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=23.7940,90.4130"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsDirectionsModalOpen(false)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-corp-border hover:border-[#8C7B5E] hover:bg-[#FAFAF7] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    G
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-semibold text-corp-dark group-hover:text-[#8C7B5E] transition-colors block">
                      Google Maps
                    </span>
                    <span className="text-[11px] text-corp-gray block">
                      Live traffic, public transit & turn-by-turn routing
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-corp-muted group-hover:text-[#8C7B5E] transition-colors shrink-0" />
              </a>

              {/* Apple Maps */}
              <a
                href="https://maps.apple.com/?daddr=23.7940,90.4130&dirflg=d"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsDirectionsModalOpen(false)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-corp-border hover:border-[#8C7B5E] hover:bg-[#FAFAF7] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 font-bold text-xs">
                    
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-semibold text-corp-dark group-hover:text-[#8C7B5E] transition-colors block">
                      Apple Maps
                    </span>
                    <span className="text-[11px] text-corp-gray block">
                      Native app for iPhone, iPad and Mac
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-corp-muted group-hover:text-[#8C7B5E] transition-colors shrink-0" />
              </a>

              {/* OpenStreetMap */}
              <a
                href="https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=%3B23.7940%2C90.4130"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsDirectionsModalOpen(false)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-corp-border hover:border-[#8C7B5E] hover:bg-[#FAFAF7] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                    OSM
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-semibold text-corp-dark group-hover:text-[#8C7B5E] transition-colors block">
                      OpenStreetMap
                    </span>
                    <span className="text-[11px] text-corp-gray block">
                      Open-source, privacy-first web routing
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-corp-muted group-hover:text-[#8C7B5E] transition-colors shrink-0" />
              </a>
            </div>

            {/* Modal Footer note */}
            <p className="text-[11px] text-corp-muted text-center pt-1">
              Your location is calculated automatically by your navigation app.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

