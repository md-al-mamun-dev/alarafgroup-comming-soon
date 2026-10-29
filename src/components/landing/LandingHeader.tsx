"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import { LumivestPrimaryButton } from "@/src/design-system";

interface LandingHeaderProps {
  locale: string;
}

export function LandingHeader({ locale }: LandingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: `/${locale}/landing-page` },
    { label: "About Us", href: `/${locale}/landing-page/about` },
    { label: "Our Brands", href: `/${locale}/landing-page/brands` },
    { label: "Contact", href: `/${locale}/landing-page/contact` },
  ];

  const isLinkActive = (href: string) => {
    if (href === `/${locale}/landing-page`) {
      return pathname === href || pathname === `${href}/`;
    }
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-corp-border/80"
          : "bg-white border-b border-corp-border"
      }`}
    >
      {/* 
        Container strictly calibrated with 01_header.svg:
        Canvas 1440px wide, height 93px (h-[93px]), items aligned centered at y=46.5
      */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 h-[93px] flex items-center justify-between">
        
        {/* Brand Wordmark */}
        <Link
          href={`/${locale}/landing-page`}
          className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-corp-dark rounded-lg p-1"
        >
          {/* Brand Name Text: Exact title typography from SVG */}
          <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-corp-dark transition-colors duration-200 group-hover:text-black">
            {siteConfig.name.toUpperCase()}
          </span>
        </Link>

        {/* Right-Clustered Navigation & Action Area (SVG: x=758 to 1319) */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 ml-auto">
          {/* Navigation Links (SVG: x=758-1150) */}
          <nav
            aria-label="Main Navigation"
            className="flex items-center gap-7 lg:gap-9 text-sm font-medium text-corp-dark"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1.5 transition-colors duration-200 ${
                    active ? "text-corp-dark font-semibold" : "text-corp-dark/80 hover:text-corp-dark"
                  } group`}
                >
                  <span>{link.label}</span>
                  {/* Animated underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-corp-dark transition-all duration-300 ease-out ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <LumivestPrimaryButton
            href={`/${locale}/landing-page/contact`}
            size="md"
          >
            Contact Us
          </LumivestPrimaryButton>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="w-11 h-11 rounded-lg border border-corp-border bg-white flex items-center justify-center text-corp-dark hover:bg-corp-light transition-colors focus:outline-none focus:ring-2 focus:ring-corp-dark"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-corp-border ${
          mobileMenuOpen ? "max-h-[360px] opacity-100 shadow-lg" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    active
                      ? "bg-corp-light text-corp-dark font-semibold"
                      : "text-corp-gray hover:bg-gray-50 hover:text-corp-dark"
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-corp-dark" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-corp-border flex justify-center">
            <LumivestPrimaryButton
              href={`/${locale}/landing-page/contact`}
              size="md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </LumivestPrimaryButton>
          </div>
        </div>
      </div>
    </header>
  );
}
