export const siteConfig = {
  name: "AL Araf Group",
  description: "Discover AL Araf Group, a Bangladesh-based business group with interests in garments sourcing, travel services, and future ventures. Our new website is coming soon.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://alarafgroup.com",
  ogImage: "/og-image.jpg",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@alarafgroup.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE,
    whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP,
  },
  social: {
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
  },
  launchDate: process.env.NEXT_PUBLIC_LAUNCH_DATE, // e.g. "2026-12-31T00:00:00Z"
};
