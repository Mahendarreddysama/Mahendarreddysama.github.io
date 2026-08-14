import { absoluteUrl, siteConfig } from "@/content/site";

export function createMetadata({ title, description, path, image = siteConfig.defaultImage, type = "website", publishedTime }) {
  const canonical = absoluteUrl(path); const imageUrl = absoluteUrl(image);
  return {
    title, description, alternates: { canonical },
    openGraph: { title: `${title} | ${siteConfig.name}`, description, url: canonical, siteName: siteConfig.name, locale: siteConfig.locale, type, images: [{ url: imageUrl, width: 1600, height: 900, alt: `${title} — ${siteConfig.name}` }], ...(publishedTime ? { publishedTime } : {}) },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description, images: [imageUrl] },
  };
}

export function breadcrumbSchema(items) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })) };
}
