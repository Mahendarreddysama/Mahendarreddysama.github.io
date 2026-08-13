import SiteHeader from "@/components/layout/SiteHeader";
import { primaryNavigation } from "@/content/site";

export default function ArticleLayout({ children }) {
  return <>
    <SiteHeader items={primaryNavigation} activeHref="/prime-hub" className="article-header" />
    {children}
  </>;
}
