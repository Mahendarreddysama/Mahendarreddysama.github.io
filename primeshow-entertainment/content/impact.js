export const processImpactContent = {
  process: {
    eyebrow: "Our Process",
    title: "From Discover to Distribute",
    subtitle: "A seven-step workflow that puts craft, culture and audience at the heart of every release.",
    steps: [
      { number: "01", title: "Discover", icon: "Lightbulb", summary: "Story hunts, IP scouting and cultural research.", detail: "Idea generation · Market research · Audience understanding · Story selection" },
      { number: "02", title: "Develop", icon: "PanelsTopLeft", summary: "Writers’ room, story bible and franchise blueprint.", detail: "Script writing · Storyboarding · Character development · Production planning" },
      { number: "03", title: "Design", icon: "Palette", summary: "Concept art, worldbuilding and pre-visualisation.", detail: "Creative direction · Concept art · Costume · Production design · Visual identity" },
      { number: "04", title: "Produce", icon: "Clapperboard", summary: "Principal photography with big-screen craft.", detail: "Film shooting · Camera · Lighting · Performance · Crew · Location management" },
      { number: "05", title: "Polish", icon: "WandSparkles", summary: "Editorial, sound, VFX and colour on event-scale specs.", detail: "Editing · VFX · Sound design · Color grading · Final quality review" },
      { number: "06", title: "Position", icon: "Megaphone", summary: "Marketing, PR and audience-first campaigns.", detail: "Marketing · Branding · Posters · Trailers · Promotions · Media campaigns" },
      { number: "07", title: "Distribute", icon: "Globe2", summary: "Pan-Indian and global theatrical release.", detail: "Theatrical release · OTT platforms · International markets · Audience reach" },
    ],
  },
  impact: {
    eyebrow: "A global command center",
    title: "Market Impact",
    subtitle: "A connected release ecosystem designed to help Indian stories travel farther, meet new audiences, and create lasting cultural value.",
    metrics: [
      { label: "Worldwide Gross", value: 300, prefix: "₹", suffix: "Cr+", note: "HanuMan benchmark", verified: true, icon: "Globe2" },
      { label: "Productions", value: null, note: "Official slate data pending", verified: false, icon: "Clapperboard" },
      { label: "National Awards", value: 2, suffix: "", note: "Verified recognition", verified: true, icon: "Award" },
      { label: "Countries Reached", value: null, note: "Territory data pending", verified: false, icon: "MapPinned" },
      { label: "Release Languages", value: 5, suffix: "", note: "HanuMan release", verified: true, icon: "Languages" },
      { label: "Audience Reach", value: null, note: "Verified data pending", verified: false, icon: "Users" },
      { label: "Theatre Partners", value: null, note: "Partner data pending", verified: false, icon: "Building2" },
      { label: "OTT Releases", value: null, note: "Platform data pending", verified: false, icon: "MonitorPlay" },
    ],
    countries: [
      { code: "IN", name: "India", x: 67, y: 55, movies: "Core market", languages: "Telugu · Hindi · Tamil · Kannada · Malayalam", detail: "Production, theatrical release, and multi-language distribution" },
      { code: "US", name: "North America", x: 20, y: 39, movies: "Release territory", languages: "Indian-language releases", detail: "Overseas theatrical audience" },
      { code: "AE", name: "Middle East", x: 58, y: 50, movies: "Market data pending", languages: "Release data pending", detail: "International distribution pathway" },
      { code: "SG", name: "Southeast Asia", x: 78, y: 64, movies: "Market data pending", languages: "Release data pending", detail: "International distribution pathway" },
    ],
  },
};
