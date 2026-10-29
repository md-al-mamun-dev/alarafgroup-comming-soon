import { 
  Shirt, 
  Plane, 
  Sprout, 
  Sparkles, 
  Moon, 
  Sun, 
  ShieldCheck, 
  Award, 
  Tag, 
  Headphones, 
  Compass, 
  Luggage, 
  Ticket, 
  Briefcase, 
  DollarSign, 
  Clock, 
  PhoneCall, 
  Apple, 
  Wheat, 
  Egg, 
  Truck 
} from "lucide-react";
import { ContentCardItem, StepCardItem } from "../molecules/ContentCard";
import { GalleryItem } from "../organisms/GalleryGrid";

export interface BrandData {
  id: string;
  slug: string;
  name: string;
  category: string;
  badgeLabel: string;
  summary: string;
  description: string;
  heroSubtitle: string;
  icon: typeof Shirt;
  mediaBadge: string;
  mediaTitle: string;
  mediaSubtitle: string;
  mediaSpec: string;
  mediaStatus: string;
  ctaText: string;
  imageUrl?: string;
  highlights: string[];
  offerings: ContentCardItem[];
  whyChooseUs: ContentCardItem[];
  steps?: StepCardItem[];
  gallery: GalleryItem[];
}

export const brandsData: Record<string, BrandData> = {
  fashion: {
    id: "fashion",
    slug: "fashion",
    name: "Al-Araf Fashion",
    category: "Garments & Textiles Division",
    badgeLabel: "01 • Manufacturing & Sourcing",
    summary: "Connecting international fashion retailers with Bangladesh's world-class textile manufacturing ecosystem.",
    description: "Our garment manufacturing and apparel export wing manages end-to-end apparel solutions — from sustainable raw fabric procurement and pattern development to factory compliance auditing, rigorous multi-stage quality control, and timely worldwide shipping. With direct partnerships across high-capacity certified manufacturers, we deliver reliable production scaled to global buyer specifications.",
    heroSubtitle: "Style & Comfort Redefined. A premier garment manufacturing and apparel export house delivering modern, high-grade fashion to domestic and international retail markets.",
    icon: Shirt,
    imageUrl: "/images/landing/brand-fashion.jpg",
    mediaBadge: "Manufacturing Hub",
    mediaTitle: "Al-Araf Fashion Facilities",
    mediaSubtitle: "584 × 399 Architectural & Production Visual Frame",
    mediaSpec: "SPEC // 06_FASHION_DETAILS",
    mediaStatus: "ISO 9001 Compliant",
    ctaText: "View Brand Details",
    highlights: [
      "Ethical & certified factory vendor network (OEKO-TEX, WRAP, SEDEX)",
      "Strict in-line & pre-shipment quality assurance procedures",
      "Flexible order quantities with streamlined lead-time execution",
      "Dedicated merchandisers providing 24/7 global client support",
    ],
    offerings: [
      {
        id: "mens-wear",
        title: "Men's Wear",
        description: "Explore our comprehensive men's apparel line crafted with premium fabrics, modern tailoring, and exceptional durability.",
        icon: Shirt,
      },
      {
        id: "womens-wear",
        title: "Women's Wear",
        description: "Contemporary fashion and everyday elegance designed with breathable textiles, refined cuts, and trend-focused patterns.",
        icon: Sparkles,
      },
      {
        id: "traditional-religious",
        title: "Traditional Religious Wear",
        description: "Authentic panjabis, modest attires, and religious ceremonial garments made from finely woven cottons and exquisite embroideries.",
        icon: Moon,
      },
      {
        id: "seasonal-collections",
        title: "Seasonal Collections",
        description: "Dynamic winter knitwear, summer linens, festive Eid collections, and weather-adaptive outerwear scaled for high-volume demand.",
        icon: Sun,
      },
    ],
    whyChooseUs: [
      {
        id: "quality-control",
        title: "Quality Control",
        description: "Multi-stage inspection protocols from raw yarn intake to finished garments, ensuring full compliance with international standards.",
        icon: ShieldCheck,
      },
      {
        id: "ethical-sourcing",
        title: "Ethical Sourcing",
        description: "OEKO-TEX certified fabrics, environmentally safe dye chemicals, and complete fair-labor compliance across all production lines.",
        icon: Award,
      },
      {
        id: "competitive-pricing",
        title: "Competitive Pricing",
        description: "Lean manufacturing efficiencies and direct-from-mill raw material procurement deliver exceptional wholesale value.",
        icon: Tag,
      },
      {
        id: "dedicated-support",
        title: "Dedicated Support",
        description: "Round-the-clock merchandiser support, live sample tracking, and dedicated account managers for corporate retail buyers.",
        icon: Headphones,
      },
    ],
    gallery: [
      { title: "Cutting & Pattern Loft", tag: "Pre-Production" },
      { title: "Automated Sewing Floor", tag: "Garment Assembly" },
      { title: "Precision Embroidery Bay", tag: "Design & Embellishment" },
      { title: "Ironing & Finishing Line", tag: "Final Presentation" },
      { title: "Color Lab & Dye Testing", tag: "Chemical Safety" },
      { title: "Needle Detection & Audit", tag: "Quality Assurance" },
      { title: "Steam Pressing Station", tag: "Garment Finishing" },
      { title: "Packaging & Dispatch Bay", tag: "Global Logistics" },
    ],
  },
  travel: {
    id: "artful-travel",
    slug: "artful-travel",
    name: "Artful Travel International",
    category: "Hospitality & Mobility Division",
    badgeLabel: "02 • Travel & Hospitality",
    summary: "Tailored corporate travel, premium leisure expeditions, and authorized ticketing services.",
    description: "Artful Travel International delivers dependable mobility and hospitality solutions for corporate executives, trade delegations, and individual travelers. From seamless flight reservations, visa processing assistance, and worldwide hotel bookings to bespoke pilgrimage and luxury vacation packages, our experienced consultants ensure comfort, precision, and peace of mind.",
    heroSubtitle: "Your Trusted Travel Partner. Delivering seamless global mobility, verified ticketing, bespoke holiday expeditions, and authorized visa solutions.",
    icon: Plane,
    imageUrl: "/images/landing/brand-travel.jpg",
    mediaBadge: "Travel Concierge",
    mediaTitle: "Artful Travel Network",
    mediaSubtitle: "584 × 399 Worldwide Destinations & Ticketing Frame",
    mediaSpec: "SPEC // 07_ARTFUL_TRAVEL_DETAILS",
    mediaStatus: "IATA Authorized",
    ctaText: "View Brand Details",
    highlights: [
      "IATA-standard domestic and international air ticketing",
      "Comprehensive corporate travel management & invoicing",
      "Tailored executive concierge and airport VIP assistance",
      "Customized inbound and outbound leisure holiday itineraries",
    ],
    offerings: [
      {
        id: "hajj-umrah",
        title: "Hajj & Umrah",
        description: "Comprehensive religious pilgrimage arrangements featuring premium accommodations near Holy Harams, dedicated ground logistics, and spiritual guidance.",
        icon: Compass,
      },
      {
        id: "tourism",
        title: "Tourism",
        description: "Tailor-made domestic and international holiday tour packages, family getaways, exotic cultural expeditions, and guided luxury travel itineraries.",
        icon: Luggage,
      },
      {
        id: "air-ticket",
        title: "Air Ticket",
        description: "Instant flight bookings across top domestic and international airlines with optimized routes, flexible reissuance, and competitive fares.",
        icon: Ticket,
      },
      {
        id: "work-visa",
        title: "Work Visa",
        description: "Expert overseas employment visa guidance, embassy document attestation, biometric coordination, and reliable processing assistance.",
        icon: Briefcase,
      },
    ],
    steps: [
      {
        step: 1,
        title: "Consultation",
        description: "Discuss your travel aspirations, flight preferences, or visa requirements with our seasoned travel advisors.",
      },
      {
        step: 2,
        title: "Documentation",
        description: "Submit necessary paperwork, passport details, and travel preferences for thorough verification and pre-vetting.",
      },
      {
        step: 3,
        title: "Application & Processing",
        description: "Our dedicated operations desk processes tickets, secures confirmed lodging, and manages official embassy submissions.",
      },
      {
        step: 4,
        title: "Travel Support",
        description: "Receive your verified tickets, visas, and complete travel vouchers backed by our 24/7 round-the-clock concierge team.",
      },
    ],
    whyChooseUs: [
      {
        id: "expert-guidance",
        title: "Expert Guidance",
        description: "Experienced travel managers with extensive airline routing expertise and global immigration protocol know-how.",
        icon: Award,
      },
      {
        id: "transparent-pricing",
        title: "Transparent Pricing",
        description: "Clear and upfront cost breakdowns with zero hidden fees, providing guaranteed best-value travel investments.",
        icon: DollarSign,
      },
      {
        id: "fast-processing",
        title: "Fast Processing",
        description: "Expedited ticketing systems and direct consular liaison networks ensuring rapid document turnaround.",
        icon: Clock,
      },
      {
        id: "support-24-7",
        title: "24/7 Support",
        description: "Dedicated travel support desk available day and night to assist with schedule adjustments or flight changes.",
        icon: PhoneCall,
      },
    ],
    gallery: [],
  },
  agro: {
    id: "agro",
    slug: "agro",
    name: "Al-Araf Agro",
    category: "Agriculture & Food Security Division",
    badgeLabel: "03 • Agriculture & Commodities",
    summary: "Sustainable agronomic science, contract farming, post-harvest cold chains, and wholesale agro-commodity distribution.",
    description: "Pioneering modern agricultural science in Bangladesh, Al-Araf Agro strengthens food security by integrating temperature-controlled warehousing, high-yield grain processing, and responsible contract farming. We supply premium grains, fresh horticulture, and agro-commodities to domestic markets and international trade networks.",
    heroSubtitle: "Freshness & Sustainability Combined. Delivering farm-fresh produce, staple grains, and wholesome agricultural solutions backed by modern post-harvest supply chains.",
    icon: Sprout,
    imageUrl: "/images/landing/brand-agro.jpg",
    mediaBadge: "Sustainable Agronomy",
    mediaTitle: "Al-Araf Agro Processing Hub",
    mediaSubtitle: "584 × 399 Farm-To-Fork Infrastructure Frame",
    mediaSpec: "SPEC // 08_AL_ARAF_AGRO_DETAILS",
    mediaStatus: "Global GAP Certified",
    ctaText: "View Brand Details",
    highlights: [
      "Global GAP compliant farm practices & post-harvest handling",
      "Modern temperature-controlled cold-chain preservation hubs",
      "Bulk trade in aromatic rice, milling wheat, and fresh produce",
      "Direct contract farming partnerships empowering local farmers",
    ],
    offerings: [
      {
        id: "fresh-produce",
        title: "Fresh Produce",
        description: "Direct-from-farm seasonal fruits, vegetables, and specialty horticulture cultivated using sustainable, safe farming protocols.",
        icon: Apple,
      },
      {
        id: "staple-crops",
        title: "Staple Crops",
        description: "High-grade aromatic rice, milling wheat, maize, and pulses sourced directly through our established contract farming network.",
        icon: Wheat,
      },
      {
        id: "poultry-dairy",
        title: "Poultry & Dairy Products",
        description: "Hygienically processed poultry, farm-fresh eggs, and wholesome dairy products meeting strict health and safety standards.",
        icon: Egg,
      },
    ],
    whyChooseUs: [
      {
        id: "fresh-farm-produce",
        title: "Fresh Farm Produce",
        description: "Harvested at peak ripeness and transported via cold-chain logistics to guarantee farm-fresh nutritional quality and taste.",
        icon: Sprout,
      },
      {
        id: "fair-pricing",
        title: "Fair Pricing",
        description: "Transparent farm-gate economics eliminating unnecessary middlemen, ensuring fair compensation to growers and optimal buyer rates.",
        icon: DollarSign,
      },
      {
        id: "sustainable-practices",
        title: "Sustainable Farming Practices",
        description: "Responsible soil enrichment, controlled water management, and organic crop protection preserving agricultural ecosystems.",
        icon: ShieldCheck,
      },
      {
        id: "direct-supply",
        title: "Direct Supply",
        description: "Reliable bulk delivery directly from harvest fields and regional grain silos straight to your retail or commercial operations.",
        icon: Truck,
      },
    ],
    gallery: [
      { title: "Smart Irrigation Fields", tag: "Water Management" },
      { title: "Controlled Cold Storage Facility", tag: "Post-Harvest" },
      { title: "Grain Silo & Storage Terminal", tag: "Bulk Handling" },
      { title: "Organic Sorting & Packing Hub", tag: "Packaging" },
      { title: "Soil Health & Nutrient Lab", tag: "Agronomy Lab" },
      { title: "Fleet Distribution Logistics", tag: "Cold Logistics" },
    ],
  },
};

