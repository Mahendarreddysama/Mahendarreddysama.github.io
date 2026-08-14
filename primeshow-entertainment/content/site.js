const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://primeshowentertainment.com";

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Features", href: "/services" },
  { label: "Primeverse", href: "/prime-hub" },
];

export const siteConfig = {
  name: "PrimeShow Entertainment",
  legalName: "PrimeShow Entertainment",
  url: siteUrl.replace(/\/$/, ""),
  description: "PrimeShow Entertainment is an Indian film production and distribution company creating ambitious stories for audiences worldwide.",
  locale: "en_IN",
  location: "Plot No. 5, Ganesh Nagar Colony, Kuntloor, Hayathnagar, Ranga Reddy, Hyderabad, Telangana, 501505, India",
  locationLines: [
    "Plot No. 5, Ganesh Nagar Colony, Kuntloor,",
    "Hayathnagar, Ranga Reddy, Hyderabad, Telangana, 501505, India",
  ],
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  whatsapp: "+917842985404",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/primeshowentertainment/",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/primeshowofficial/",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@PrimeShowEntertainment",
    x: process.env.NEXT_PUBLIC_X_URL || "https://x.com/Primeshowtweets",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  },
  defaultImage: "/images/hero-studio.webp",
};

export const absoluteUrl = (path = "/") => new URL(path, `${siteConfig.url}/`).toString();
export const publicSocialProfiles = Object.values(siteConfig.social).filter(Boolean);
