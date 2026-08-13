import PrimeHub from "@/components/hub/PrimeHub";
import { hubContent, hubNavigation } from "@/content/hub";
import { createMetadata } from "@/lib/seo";

export const metadata=createMetadata({title:"Primeverse",description:"Explore PrimeShow movies, editorial stories, quizzes, behind-the-scenes galleries, upcoming projects, and awards.",path:"/prime-hub"});
export default function PrimeHubPage(){return <PrimeHub content={hubContent} navigation={hubNavigation}/>}
