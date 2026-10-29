import React from "react";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";

interface LandingFooterProps {
  locale: string;
}

export function LandingFooter({ locale }: LandingFooterProps) {
  return (
    <footer className="w-full bg-[#1A1A1A] text-white pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-gray-800">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-heading text-xl font-bold tracking-tight text-white">
              {siteConfig.name.toUpperCase()}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Trust. Innovation. Growth. A diversified business group committed to excellence across textiles, travel, and strategic ventures.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gray-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href={`/${locale}/landing-page`} className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/landing-page/about`} className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/landing-page/brands`} className="hover:text-white transition-colors">
                  Our Brands
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/landing-page/contact`} className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Brands */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gray-200">
              Our Brands
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href={`/${locale}/landing-page/brands/fashion`} className="hover:text-white transition-colors">
                  Al-Araf Fashion
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/landing-page/brands/artful-travel`} className="hover:text-white transition-colors">
                  Artful Travel International
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/landing-page/brands/agro`} className="hover:text-white transition-colors">
                  Al-Araf Agro
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gray-200">
              Contact Info
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Email: {siteConfig.contact.email}</p>
              <p>Phone: +880 1800-000000</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
              Coming Soon Page
            </Link>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

