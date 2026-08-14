import { distributionMovies, productionMovies } from "./movies.js";

export const serviceNavigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Features", href: "/services" },
  { label: "Primeverse", href: "/prime-hub" },
];

export const servicesContent = {
  landing: [
    { key: "production", number: "01", title: "Production", eyebrow: "Ideas into worlds", description: "An integrated filmmaking engine from story development to final delivery.", href: "/services/production", image: "/images/features-production.webp" },
    { key: "distribution", number: "02", title: "Distribution", eyebrow: "Stories into markets", description: "Release intelligence that carries cinema across languages, regions, and borders.", href: "/services/distribution", image: "/images/features-distribution.webp" },
    { key: "exhibition", number: "03", title: "Exhibition", eyebrow: "Films into experiences", description: "Theatre strategy and audience experiences designed for opening day and beyond.", href: "/services/exhibition", image: "/images/features-exhibition.webp" },
  ],
  production: {
    hero: { eyebrow: "From first draft to final frame", title: "Production", body: "PrimeShow unites creative development, physical production, and post-production around one clear ambition: protect the idea and elevate every frame.", image: "/images/production-hero.webp" },
    capabilities: [
      ["FilePenLine", "Story Development", "Shape a compelling premise into a cinematic world."],
      ["ScrollText", "Script Writing", "Develop structure, character, dialogue, and emotional rhythm."],
      ["Sparkles", "Creative Direction", "Build one coherent vision across every department."],
      ["Users", "Casting", "Find performers who make the story feel inevitable."],
      ["ClipboardList", "Pre-Production", "Turn creative intent into a precise production plan."],
      ["Workflow", "Production Management", "Coordinate people, time, locations, and resources."],
      ["Camera", "Cinematography", "Translate emotion into light, lens, movement, and composition."],
      ["WandSparkles", "VFX", "Extend the world with seamless visual imagination."],
      ["Scissors", "Editing", "Find the film’s pace, tension, and emotional truth."],
      ["AudioLines", "Sound Design", "Create a dimensional sonic world around every frame."],
      ["Palette", "Color Grading", "Give the finished film a distinctive visual signature."],
      ["Megaphone", "Marketing Support", "Carry the story’s promise clearly into the market."],
    ],
    movies: productionMovies,
  },
  distribution: {
    hero: { eyebrow: "Across screens. Across borders.", title: "Distribution", body: "A market-aware release ecosystem connecting films with the right audiences, territories, languages, and theatrical moments.", image: "/images/distribution-hero.webp" },
    capabilities: [
      ["MapPinned", "Regional Distribution", "Ground-level market knowledge for focused regional releases."],
      ["Map", "Pan-India Releases", "One coordinated vision adapted for many audience cultures."],
      ["Globe2", "Overseas Distribution", "Strategic access to audiences beyond the domestic market."],
      ["Languages", "Multi-language Releases", "Release planning that respects each language market."],
      ["Megaphone", "Marketing Support", "Campaign alignment from announcement through opening weekend."],
      ["Route", "Release Strategy", "Position, timing, and scale designed around each film."],
      ["Projector", "Theatre Coordination", "Clear communication across exhibitors and local partners."],
      ["MonitorPlay", "Digital Distribution", "Platform-ready pathways for the film’s next audience."],
    ],
    movies: distributionMovies,
    galleryMovies: distributionMovies,
  },
  exhibition: {
    hero: { eyebrow: "Where stories meet audiences", title: "Exhibition", body: "PrimeShow brings release planning, theatre relationships, premiere execution, and audience engagement into one coordinated big-screen experience.", image: "/images/exhibition-hero.webp" },
    capabilities: [
      ["CalendarRange", "Theatre Release Planning", "Build a release footprint matched to audience demand."],
      ["Building2", "Multiplex Partnerships", "Coordinate premium screens and high-value programming."],
      ["Projector", "Single Screen Coordination", "Support the cultural heart of regional moviegoing."],
      ["PanelsTopLeft", "Screen Allocation", "Balance reach, show density, and market opportunity."],
      ["Clock3", "Show Scheduling", "Plan convenient, high-performing audience touchpoints."],
      ["MapPinned", "Nationwide Planning", "Orchestrate cities, languages, and release windows."],
      ["Users", "Audience Engagement", "Keep conversation active before and after release."],
      ["Megaphone", "Promotional Campaigns", "Connect on-ground energy with the film campaign."],
      ["Truck", "Release Logistics", "Coordinate assets, partners, schedules, and delivery."],
    ],
    workflow: ["Film Ready", "Marketing", "Theatre Booking", "Regional Planning", "Premiere", "Public Release", "Audience Engagement", "Performance Analysis"],
  },
};
