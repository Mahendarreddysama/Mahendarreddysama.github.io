import CinematicMotion from "../components/motion/CinematicMotion";
import Analytics from "../components/Analytics";
import JsonLd from "../components/JsonLd";
import WhatsAppFloatingButton from "../components/WhatsAppFloatingButton";
import { absoluteUrl,publicSocialProfiles,siteConfig } from "@/content/site";
import "./globals.css";
import "./mobile-performance.css";
import "./theme.css";
import "./detail-light.css";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "PrimeShow Entertainment — Stories Without Borders",
    template: "%s | PrimeShow Entertainment",
  },
  description:
    "PrimeShow Entertainment is an Indian film production and distribution company creating ambitious stories for audiences worldwide.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "PrimeShow Entertainment",
    description: "Indian storytelling. Global cinematic scale.",
    type: "website",locale:siteConfig.locale,siteName:siteConfig.name,url:absoluteUrl("/"),images:[{url:absoluteUrl(siteConfig.defaultImage),width:1600,height:900,alt:"PrimeShow Entertainment cinematic studio"}],
  },
  twitter:{card:"summary_large_image",title:"PrimeShow Entertainment",description:"Indian storytelling. Global cinematic scale.",images:[absoluteUrl(siteConfig.defaultImage)]},
  robots: { index: true, follow: true },
  applicationName:siteConfig.name,authors:[{name:siteConfig.name}],creator:siteConfig.name,publisher:siteConfig.name,category:"Entertainment",icons:{icon:[{url:"/favicon-v3.png",type:"image/png",sizes:"64x64"}],shortcut:"/favicon-v3.png",apple:"/favicon-v3.png"},verification:{google:process.env.GOOGLE_SITE_VERIFICATION||undefined},
  other: { "codex-preview": "development" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#050403",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name:siteConfig.name,url:siteConfig.url,logo:absoluteUrl("/images/primeshow-logo.png"),description:siteConfig.description,address:{"@type":"PostalAddress",streetAddress:"Plot No. 5, Ganesh Nagar Colony, Kuntloor, Hayathnagar",addressLocality:"Hyderabad",addressRegion:"Telangana",postalCode:"501505",addressCountry:"IN"},sameAs:publicSocialProfiles,
};
const websiteSchema={"@context":"https://schema.org","@type":"WebSite",name:siteConfig.name,url:siteConfig.url,inLanguage:"en-IN"};

const themeInit = `(function(){try{var t=localStorage.getItem('primeshow-theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme='dark';}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.style.colorScheme='dark';}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html:themeInit}} /></head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <CinematicMotion>{children}</CinematicMotion>
        <JsonLd data={[organizationSchema,websiteSchema]}/>
        <Analytics/>
        <WhatsAppFloatingButton number={siteConfig.whatsapp}/>
      </body>
    </html>
  );
}
