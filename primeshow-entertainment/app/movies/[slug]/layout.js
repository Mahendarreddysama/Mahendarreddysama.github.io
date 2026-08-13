import SiteHeader from "@/components/layout/SiteHeader";
import { primaryNavigation } from "@/content/site";

export default function MovieLayout({ children }) {
  return <>
    <SiteHeader items={primaryNavigation} activeHref="/services" className="movie-header" />
    {children}
  </>;
}
