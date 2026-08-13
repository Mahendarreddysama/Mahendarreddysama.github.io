import { movies } from "./movies.js";

export const articles = [
  {
    slug: "building-the-world-of-hanuman",
    title: "Building the World of HanuMan",
    movie: "HanuMan",
    category: "Craft",
    publishedAt: "2024-02-02",
    readingTime: "6 min read",
    author: "PrimeShow Editorial",
    excerpt: "A closer look at the creative disciplines that shaped Anjanadri into a cinematic world.",
    image: "/images/articles/building-world-of-hanuman.webp",
    featured: true,
    sections: [
      { id: "world", title: "A world with its own pulse", body: "Anjanadri was approached as more than a backdrop. Its scale, texture, mythology, and everyday life needed to support the emotional journey at the heart of the film." },
      { id: "craft", title: "Craft working in concert", body: "Production design, cinematography, costume, sound, and visual effects were aligned around a shared visual language so that every department strengthened the same world." },
      { id: "audience", title: "Designed for a shared experience", body: "The film’s multilingual theatrical journey was planned to carry its emotion and spectacle to audiences across regions without losing its cultural identity." },
    ],
  },
  {
    slug: "from-idea-to-audience",
    title: "From Idea to Audience",
    movie: "PrimeShow",
    category: "Studio",
    publishedAt: "2024-03-18",
    readingTime: "5 min read",
    author: "PrimeShow Editorial",
    excerpt: "How one connected production ecosystem protects a story from the first spark through release.",
    image: "/images/about-studio.webp",
    sections: [
      { id: "development", title: "Protecting the first spark", body: "The strongest ideas are clarified early through audience understanding, story development, and a precise creative point of view." },
      { id: "making", title: "One vision across the set", body: "A connected production plan helps creative and operational teams make decisions against the same ambition." },
      { id: "release", title: "The story continues", body: "Distribution and exhibition thinking begin before release, creating a clear path from the finished film to the right audience." },
    ],
  },
  {
    slug: "cinema-without-borders",
    title: "Cinema Without Borders",
    movie: "PrimeShow",
    category: "Distribution",
    publishedAt: "2024-04-12",
    readingTime: "4 min read",
    author: "PrimeShow Editorial",
    excerpt: "Why language, timing, and local market intelligence matter to a truly Pan-India release.",
    image: "/images/articles/cinema-without-borders.webp",
    sections: [
      { id: "language", title: "More than translation", body: "A multilingual release succeeds when campaign, positioning, and audience context feel considered in every market." },
      { id: "coordination", title: "Precision at scale", body: "Release strategy connects timing, theatres, partners, assets, and communication into one coordinated plan." },
      { id: "connection", title: "A local connection", body: "Global reach is built market by market, with respect for the distinct ways audiences discover and celebrate cinema." },
    ],
  },
];

export const quizzes = [
  {
    slug: "hanuman-ultimate-fan",
    movieSlug: "hanuman",
    movie: "HanuMan",
    difficulty: "Fan",
    image: "/images/posters/hanuman.webp",
    posterFocalPoint: "center center",
    questions: [
      { question: "Who directed HanuMan?", options: ["Prasanth Varma", "S. S. Rajamouli", "Sukumar", "Trivikram Srinivas"], correct: 0 },
      { question: "Who plays the title hero?", options: ["Vinay Rai", "Teja Sajja", "Varalaxmi Sarathkumar", "K. Niranjan Reddy"], correct: 1 },
      { question: "What is the name of the film’s fictional world?", options: ["Mahishmati", "Anjanadri", "Kantara", "Ayodhya"], correct: 1 },
      { question: "In which year was HanuMan released?", options: ["2021", "2022", "2023", "2024"], correct: 3 },
      { question: "Which genre best describes HanuMan?", options: ["Romantic comedy", "Superhero fantasy", "Legal drama", "Sports documentary"], correct: 1 },
    ],
  },
];

export const galleries = [
  { id: "direction", title: "Director at work", caption: "Creative decisions between takes", image: "/images/about-studio.webp", position: "22% center" },
  { id: "camera", title: "The camera department", caption: "Precision behind every frame", image: "/images/production-hero.webp", position: "28% center" },
  { id: "set", title: "Building the world", caption: "Production design taking shape", image: "/images/hero-studio.webp", position: "62% center" },
  { id: "light", title: "Sculpting light", caption: "Atmosphere created on set", image: "/images/primeverse/sculpting-light.webp", position: "center center" },
  { id: "crew", title: "One crew, one vision", caption: "Collaboration beyond the frame", image: "/images/about-studio.webp", position: "74% center" },
];

export const upcomingProjects = movies.filter(movie => movie.status !== "Released").map(movie => ({
  slug: movie.slug,
  title: movie.title,
  status: movie.status,
  expectedRelease: movie.year,
  synopsis: movie.synopsis,
  poster: movie.poster,
  posterFocalPoint: movie.posterFocalPoint,
}));

export const awards = [
  { id: "hanuman-national-recognition", year: "2024", movie: "HanuMan", category: "National recognition", description: "Winner of two National Film Awards — Best Film in AVGC and Best Action Direction. This is accurate: the Government of India’s Press Information Bureau confirms Hanu-Man as Best Film in AVGC, and the film also won Best Action Direction.", verified: true },
];

export const hubNavigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Features", href: "/services" },
  { label: "Primeverse", href: "/prime-hub" },
];

export const hubContent = { articles, quizzes, galleries, upcomingProjects, awards };
export const getArticleBySlug = slug => articles.find(article => article.slug === slug);
export const getQuizBySlug = slug => quizzes.find(quiz => quiz.slug === slug);
