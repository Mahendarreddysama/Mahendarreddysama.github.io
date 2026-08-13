import { ServicesLanding } from "@/components/services/ServicesExperience";
import { serviceNavigation, servicesContent } from "@/content/services";
import { createMetadata } from "@/lib/seo";

export const metadata=createMetadata({title:"Features",description:"Explore PrimeShow Entertainment's connected production, distribution, and exhibition ecosystem.",path:"/services",image:"/images/production-hero.webp"});

export default function ServicesPage() { return <ServicesLanding content={servicesContent.landing} navigation={serviceNavigation} />; }
