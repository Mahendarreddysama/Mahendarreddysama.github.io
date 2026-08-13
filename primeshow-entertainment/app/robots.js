import { absoluteUrl } from "@/content/site";
export default function robots(){return{rules:{userAgent:"*",allow:"/",disallow:["/admin/","/api/","/_next/"]},sitemap:absoluteUrl("/sitemap.xml"),host:absoluteUrl("/")}}
