# PrimeShow Architecture

PrimeShow uses the Next.js App Router. Product code is JavaScript; a few TypeScript files remain only where the Vinext, Cloudflare, and Drizzle hosting scaffold requires them.

## Boundaries

| Area | Responsibility |
| --- | --- |
| `app/` | Routes, metadata, schemas, errors, loading, sitemap and robots |
| `components/layout/` | Shared brand, navigation and footer |
| `components/ui/` | Design-system primitives |
| `components/{domain}/` | Home, services, Primeverse, about and contact experiences |
| `content/` | Versioned records and environment-driven public configuration |
| `lib/content/` | Provider-independent repository and content contract |
| `lib/seo/`, `lib/analytics/`, `lib/validation/` | Focused cross-domain services |
| `styles/tokens.css` | Color, type, spacing, radius, shadow, motion and z-index tokens |

The data flow is route → repository → static content or future CMS adapter → props → presentation. Components must not fetch directly from a CMS. A Sanity, Strapi, or Contentful adapter should implement the methods exposed by `staticContentRepository` and normalize provider-specific fields at that boundary.

Use server components for static and SEO-critical content. Add `"use client"` only for browser state, motion, forms, quizzes, menus and galleries. Prefer local state, reuse `SiteHeader`, `SiteFooter`, `Brand` and `ButtonLink`, and clean up every animation or browser listener on unmount.

Future admin, localization, accounts, ratings, favorites, search, notifications, OTT and ticketing features should be separate domains. Provider clients belong under `lib/api/`; durable user data belongs behind server-side services. Keep slugs stable and version CMS schemas with their migrations.

The approved stylesheet remains intact to protect the visual baseline. Tailwind remains available for new primitives, while existing selectors consume centralized tokens.
