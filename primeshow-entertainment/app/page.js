import CinematicHome from "@/components/home/CinematicHome";
import { homeContent } from "@/content/home";
import { createMetadata } from "@/lib/seo";
export const metadata=createMetadata({title:"Stories Without Borders",description:"PrimeShow Entertainment creates and carries ambitious Indian stories from the first spark to audiences worldwide.",path:"/"});

export default function HomePage() {
  return <CinematicHome content={homeContent} />;
}
