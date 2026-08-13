import { DivisionPage } from "@/components/services/ServicesExperience";
import { serviceNavigation, servicesContent } from "@/content/services";
import JsonLd from "@/components/JsonLd";import {breadcrumbSchema,createMetadata} from "@/lib/seo";

export const metadata=createMetadata({title:"Film Exhibition",description:"PrimeShow's theatre planning, exhibition partnerships, premieres, and audience engagement services.",path:"/services/exhibition",image:"/images/exhibition-hero.webp"});
const schema = { "@context": "https://schema.org", "@type": "Service", name: "Film Exhibition", provider: { "@type": "Organization", name: "PrimeShow Entertainment" }, areaServed: "India" };
export default function ExhibitionPage(){return <><DivisionPage division="exhibition" content={servicesContent.exhibition} navigation={serviceNavigation}/><JsonLd data={[schema,breadcrumbSchema([{name:"Home",path:"/"},{name:"Features",path:"/services"},{name:"Film Exhibition",path:"/services/exhibition"}]) ]}/></>}
