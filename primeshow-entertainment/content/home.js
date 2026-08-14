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
          { number: "02", title: "One Studio", text: "Development, production and distribution thinking work as one connected house.", image: "/images/about/one-studio.webp", imageAlt: "An integrated film crew working together on a large outdoor set" },
          { number: "03", title: "Big-Screen Craft", text: "Scale, sound and detail are shaped for the shared theatrical experience.", image: "/images/about/big-screen-craft.webp", imageAlt: "A large-scale Indian film soundstage with camera, lighting, and production crew" },
          { number: "04", title: "Built to Travel", text: "Multi-language planning and distribution strategy help every story reach its audience.", image: "/images/about/built-to-travel.webp", imageAlt: "A film distribution team planning global theatrical reach" },
        ],
      },
      {
        id: "vision",
        label: "Vision",
        eyebrow: "Vision",
        title: "Stories that inspire. Experiences that stay.",
        body: "We build cinema at the intersection of Indian heritage, event scale and franchise thinking—engineered to fill theatres and live in memory long after the credits roll.",
        layout: "pillars",
        features: [
          { number: "Pillar 01", title: "Culture", text: "Stories rooted in Indian heritage, mythology and the emotional truth of our regions.", image: "/images/vision-culture.webp", imageAlt: "A richly decorated Indian temple representing cultural heritage" },
          { number: "Pillar 02", title: "Audience", text: "Big-screen experiences designed to bring audiences back to theatres, together.", image: "/images/vision-audience.webp", imageAlt: "An engaged audience sharing a theatrical cinema experience" },
          { number: "Pillar 03", title: "Scale", text: "Ambitious productions with franchise potential and pan-Indian execution." },
        ],
      },
      {
        id: "mission",
        label: "Mission",
        eyebrow: "Mission",
        title: "Protect the idea. Elevate every frame.",
        body: "Our mission is to give distinctive stories the creative courage, production discipline and audience strategy they need to travel farther.",
        layout: "principles",
        features: [
          { number: "01", title: "Discover", text: "Find voices and worlds with lasting cultural and emotional power.", image: "/images/mission/discover.webp", imageAlt: "A filmmaker developing stories among cinematic references" },
          { number: "02", title: "Build", text: "Bring the right craft, systems and partnerships around every story.", image: "/images/mission/build.webp", imageAlt: "A film crew building a story on an active soundstage" },
          { number: "03", title: "Connect", text: "Take each film to its widest possible theatrical and global audience.", image: "/images/mission/connect.webp", imageAlt: "A packed theatre audience connecting with a film on the big screen" },
        ],
      },
      {
        id: "strength",
        label: "Strength",
        eyebrow: "Strengths",
        title: "Ambition, supported by execution.",
        body: "Six operating principles shape every project we greenlight, produce and take to theatres.",
        layout: "strengths",
        features: [
          { number: "01", title: "Stories Built to Scale", text: "Spectacle, emotion and mass appeal from day one." },
          { number: "02", title: "Franchise Thinking", text: "Worlds designed to grow across stories and formats." },
          { number: "03", title: "World Creation", text: "Deep development and visual research inform every frame." },
          { number: "04", title: "Big-Screen DNA", text: "Sound, image and craft engineered for theatrical impact." },
          { number: "05", title: "Full-Stack Production", text: "Development through distribution under one roof." },
          { number: "06", title: "Pan-Indian Execution", text: "Multi-language releases built for audiences everywhere." },
        ],
      },
    ],
  },
  productions: [
    { title: "HanuMan", year: "2024", language: "Telugu · Pan-India", status: "Released", position: "0%", poster: "/images/posters/hanuman.webp", posterFocalPoint: "center center" },
    { title: "Sambarala Yeti Gattu", year: "TBA", language: "Multilingual", status: "Post Production", position: "20%", poster: "/images/posters/syg.webp", posterFocalPoint: "center center" },
    { title: "Billa Ranga Baasha", year: "TBA", language: "Multilingual", status: "In Production", position: "40%", poster: "/images/posters/brb-optimized.webp", posterFocalPoint: "center center" },
    { title: "Darling", year: "TBA", language: "Telugu", status: "Released", position: "60%", poster: "/images/posters/darling.webp", posterFocalPoint: "center center" },
    { title: "House Arrest", year: "TBA", language: "Telugu", status: "Released", position: "80%", poster: "/images/posters/house-arrest.webp", posterFocalPoint: "center center" },
    { title: "BFH", year: "TBA", language: "Telugu", status: "Released", position: "100%", poster: "/images/posters/bfh.webp", posterFocalPoint: "center center" },
  ],
  distribution: distributionMovies,
};