import SiteHeader from "@/components/layout/SiteHeader";
import { primaryNavigation } from "@/content/site";

export default function QuizLayout({ children }) {
  return <>
    <SiteHeader items={primaryNavigation} activeHref="/prime-hub" className="quiz-main-header" />
    {children}
  </>;
}
