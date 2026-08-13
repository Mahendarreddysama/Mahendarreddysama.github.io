import ContactExperience from "@/components/contact/ContactExperience";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { breadcrumbSchema,createMetadata } from "@/lib/seo";
export const metadata=createMetadata({title:"Contact",description:"Connect with PrimeShow Entertainment for production, distribution, exhibition, investment, media, and creative collaboration enquiries.",path:"/contact"});
export default function ContactPage(){const schema={"@context":"https://schema.org","@type":"ContactPage",name:"Contact PrimeShow Entertainment",mainEntity:{"@type":"Organization",name:siteConfig.name,...(siteConfig.email?{email:siteConfig.email}:{}),...(siteConfig.phone?{telephone:siteConfig.phone}:{}),contactPoint:{"@type":"ContactPoint",contactType:"business enquiries",availableLanguage:["English","Telugu","Hindi"],...(siteConfig.email?{email:siteConfig.email}:{}),...(siteConfig.phone?{telephone:siteConfig.phone}:{})}}};return <><ContactExperience whatsapp={siteConfig.whatsapp} email={siteConfig.email}/><JsonLd data={[schema,breadcrumbSchema([{name:"Home",path:"/"},{name:"Contact",path:"/contact"}]) ]}/></>}
