import { 
  Shield, 
  Compass, 
  TrendingUp, 
  Users, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  MessageCircle 
} from "lucide-react";
import { ValuePillarItem } from "../organisms/ValuesGrid";
import { ContactInfoItem, SocialLinkItem } from "../organisms/ContactSection";
import { siteConfig } from "@/src/config/site";

export const corporateData = {
  landingPillars: [
    {
      id: "integrity",
      title: "Unwavering Integrity",
      description: "Transparent dealings, dependable governance, and ethical accountability across every transaction.",
      icon: Shield,
    },
    {
      id: "connectivity",
      title: "Global Connectivity",
      description: "International sourcing networks and seamless coordination between buyers, partners, and operators.",
      icon: Compass,
    },
    {
      id: "progress",
      title: "Continuous Progress",
      description: "Modern methodologies and continuous investment in process efficiency and technology.",
      icon: TrendingUp,
    },
    {
      id: "partner-centricity",
      title: "Partner Centricity",
      description: "Tailored solutions designed to foster mutual prosperity and long-lasting commercial alliances.",
      icon: Users,
    },
  ] as ValuePillarItem[],

  aboutPillars: [
    {
      id: "integrity",
      title: "Integrity",
      description: "Honest, transparent conduct forms the core of every client agreement and operational decision.",
      icon: Shield,
    },
    {
      id: "excellence",
      title: "Excellence",
      description: "Rigorous quality assurance and uncompromising standards in all sourcing and services.",
      icon: Award,
    },
    {
      id: "progress",
      title: "Progress",
      description: "Embracing technological modernization and agile approaches to dynamic market demands.",
      icon: TrendingUp,
    },
    {
      id: "global-reach",
      title: "Global Reach",
      description: "Bridging local capabilities with international buyer networks and supply chains.",
      icon: Compass,
    },
    {
      id: "partnership",
      title: "Partnership",
      description: "Building deep, mutually rewarding relationships that endure across market cycles.",
      icon: Users,
    },
  ] as ValuePillarItem[],

  stats: [
    { value: "3+", label: "Core Business Divisions" },
    { value: "100%", label: "Compliance & Quality Assured" },
    { value: "24/7", label: "Dedicated Client Support" },
  ],

  officeDetails: [
    {
      icon: MapPin,
      label: "Head Office",
      value: "House 00, Road 00, Gulshan / Banani, Dhaka, Bangladesh",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+880 1700-000000",
      href: "tel:+8801700000000",
    },
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Sunday – Thursday: 9:00 AM – 6:00 PM (GMT+6)",
    },
  ] as ContactInfoItem[],

  socialLinks: [
    { name: "Facebook", href: "https://facebook.com", icon: ExternalLink },
    { name: "Instagram", href: "https://instagram.com", icon: ExternalLink },
    { name: "LinkedIn", href: "https://linkedin.com", icon: ExternalLink },
    { name: "WhatsApp", href: "https://wa.me/", icon: MessageCircle },
  ] as SocialLinkItem[],
};

