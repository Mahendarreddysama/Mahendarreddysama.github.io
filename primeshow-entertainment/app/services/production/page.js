import { DivisionPage } from "@/components/services/ServicesExperience";
import { serviceNavigation, servicesContent } from "@/content/services";
import JsonLd from "@/components/JsonLd";import {breadcrumbSchema,createMetadata} from "@/lib/seo";

export const metadata=createMetadata({title:"Film Production",description:"PrimeShow's integrated film production capabilities, featured productions, and official trailers.",path:"/services/production",image:"/images/production-hero.webp"});
const schema = { "@context": "https://schema.org", "@type": "Service", name: "Film Production", provider: { "@type": "Organization", name: "PrimeShow Entertainment" }, areaServed: "India" };
export default function ProductionPage(){return <><DivisionPage division="production" content={servicesContent.production} navigation={serviceNavigation}/><JsonLd data={[schema,breadcrumbSchema([{name:"Home",path:"/"},{name:"Features",path:"/services"},{name:"Film Production",path:"/services/production"}]) ]}/></>}
