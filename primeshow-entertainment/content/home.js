import { processImpactContent } from "./impact.js";
import { distributionMovies } from "./movies.js";

export const homeContent = {
  processImpact: processImpactContent,
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "/about" },
    { label: "Features", href: "/services" },
    { label: "Primeverse", href: "/prime-hub" },
  ],
  hero: {
    eyebrow: "PrimeShow Entertainment",
    title: ["Stories that rise.", "Cinema that travels."],
    body: "We build original worlds, back ambitious voices, and take Indian stories from the first spark to audiences across the globe.",
    image: "/images/hero-brb-optimized.webp",
    slides: [
      { image: "/images/hero-brb-optimized.webp", alt: "BRB First Blood cinematic key art", position: "center center", mobilePosition: "75% center" },
      { image: "/images/hero-syg-optimized.webp", alt: "SYG cinematic key art with a warrior surrounded by fire", position: "center center", mobilePosition: "56% center" },
      { image: "/images/hero-hanuman-optimized.webp", alt: "HanuMan cinematic key art", position: "center center", mobilePosition: "72% center" },
    ],
  },
  statistics: [
    { value: 350, prefix: "₹", suffix: "Cr+", label: "Worldwide Gross" },
    { value: 6, prefix: "", suffix: "", label: "Languages" },
    { value: 3, prefix: "", suffix: "+", label: "Awards for HanuMan" },
    { value: 5, prefix: "", suffix: "+", label: "Countries Reached" },
  ],
  marquee: ["HanuMan · National Award Winner", "Sambarala Yeti Gattu — Post Production", "Billa Ranga Baasha — In Production", "Pan-Indian Distribution"],
  about: {
    slides: [
      {
        id: "about-us",
        label: "About Us",
        eyebrow: "PrimeShow Entertainment",
        title: "Indian stories. Event-scale cinema.",
        body: "A Hyderabad-born production and distribution house creating culturally-rooted, franchise-ready films for the world’s biggest screens.",
        layout: "intro",
        features: [
          { number: "01", title: "Story First", text: "Every journey begins with an idea powerful enough to move an audience.", image: "/images/about/story-first.webp", imageAlt: "A filmmaker developing an Indian story with a collaborative creative team" },
          { number: "02", title: "Built to Travel", text: "Rooted in Indian emotion, designed to connect across languages and borders.", image: "/images/about/built-to-travel.webp", imageAlt: "A cinematic visual representing stories traveling across regions and audiences" },
          { number: "03", title: "Complete Journey", text: "From development and production to distribution and exhibition, we stay with the story.", image: "/images/about/complete-journey.webp", imageAlt: "A film production journey from camera to cinema screen" },
        ],
      },
      {
        id: "vision",
        label: "Vision",
        eyebrow: "Our Vision",
        title: "Stories without borders.",
        body: "To build a globally trusted Indian entertainment studio where distinctive stories become enduring cinematic experiences.",
        layout: "vision",
        features: [
          { number: "01", title: "Global Reach", text: "Take culturally rooted cinema to audiences everywhere.", image: "/images/vision-culture.webp", imageAlt: "Indian cinema reaching a global audience" },
          { number: "02", title: "Enduring Worlds", text: "Create stories and characters with the power to live beyond a single release.", image: "/images/about/enduring-worlds.webp", imageAlt: "A richly designed cinematic world built for long-term storytelling" },
        ],
      },
      {
        id: "mission",
        label: "Mission",
        eyebrow: "Our Mission",
        title: "Back bold voices. Build memorable cinema.",
        body: "We unite strong creative voices, disciplined production, intelligent distribution, and audience-first exhibition to move every story further.",
        layout: "mission",
        features: [
          { number: "01", title: "Discover", text: "Find ideas and filmmakers with a distinct point of view.", image: "/images/mission/discover.webp", imageAlt: "Creative development and story discovery" },
          { number: "02", title: "Build", text: "Develop and produce with craft, scale, and clarity.", image: "/images/mission/build.webp", imageAlt: "Film crew building an ambitious production" },
          { number: "03", title: "Connect", text: "Carry stories to the audiences, markets, and screens they deserve.", image: "/images/mission/connect.webp", imageAlt: "Cinema connecting with audiences across territories" },
        ],
      },
      {
        id: "strength",
        label: "Strength",
        eyebrow: "Our Strength",
        title: "One studio. Connected capabilities.",
        body: "Creative development, production, distribution, and exhibition work together as one connected system.",
        layout: "strengths",
        features: [
          { number: "01", title: "Development", text: "Story, screenplay, packaging, and creative strategy." },
          { number: "02", title: "Production", text: "Scalable execution with cinematic craft and control." },
          { number: "03", title: "Distribution", text: "Regional and Pan-India release intelligence." },
          { number: "04", title: "Exhibition", text: "Audience-facing theatrical experience and release support." },
          { number: "05", title: "Partnerships", text: "Collaborations across talent, markets, media, and brands." },
          { number: "06", title: "Reach", text: "Stories positioned to travel across languages and territories." },
        ],
      },
    ],
  },
  productions: [
    { title: "HanuMan", year: "2024", language: "Telugu", status: "Released", poster: "/images/posters/hanuman.webp", slug: "hanuman" },
    { title: "Sambarala Yeti Gattu", year: "Upcoming", language: "Telugu", status: "Post Production", poster: "/images/posters/syg.webp", slug: "syg" },
    { title: "Billa Ranga Baasha", year: "Upcoming", language: "Kannada", status: "In-Production", poster: "/images/posters/brb.webp", slug: "brb" },
    { title: "Darling", year: "2024", language: "Telugu", status: "Released", poster: "/images/posters/darling.webp", slug: "darling", hasDetailPage: false },
    { title: "House Arrest", year: "2021", language: "Telugu", status: "Released", poster: "/images/posters/house-arrest.webp", slug: "house-arrest", hasDetailPage: false },
    { title: "BFH", year: "2022", language: "Telugu", status: "Released", poster: "/images/posters/bfh.webp", slug: "bfh", hasDetailPage: false },
  ],
  distribution: distributionMovies,
};
