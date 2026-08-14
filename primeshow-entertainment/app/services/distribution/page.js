import { DivisionPage } from "@/components/services/ServicesExperience";
import { serviceNavigation, servicesContent } from "@/content/services";
import JsonLd from "@/components/JsonLd";import {breadcrumbSchema,createMetadata} from "@/lib/seo";

export const metadata=createMetadata({title:"Film Distribution",description:"PrimeShow's regional, Pan-India, overseas, and multilingual film distribution ecosystem.",path:"/services/distribution",image:"/images/distribution-hero.webp"});
const schema = { "@context": "https://schema.org", "@type": "Service", name: "Film Distribution", provider: { "@type": "Organization", name: "PrimeShow Entertainment" }, areaServed: ["India", "International"] };
export default function DistributionPage(){return <><DivisionPage division="distribution" content={servicesContent.distribution} navigation={serviceNavigation}/><JsonLd data={[schema,breadcrumbSchema([{name:"Home",path:"/"},{name:"Features",path:"/services"},{name:"Film Distribution",path:"/services/distribution"}]) ]}/></>}
