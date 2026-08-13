import AboutExperience from "@/components/about/AboutExperience";
import { aboutContent } from "@/content/about";
import { createMetadata } from "@/lib/seo";

export const metadata=createMetadata({title:"Our Story",description:"Discover the vision, mission, strengths, and leadership behind PrimeShow Entertainment.",path:"/about",image:"/images/about-studio.webp"});

export default function AboutPage() {
  return <AboutExperience content={aboutContent} />;
}
