import assert from "node:assert/strict";
import test from "node:test";
import { getContentRepository } from "../lib/content/index.js";
import { validateRepository } from "../lib/content/validate.js";
import { homeContent } from "../content/home.js";
import { quizzes, upcomingProjects } from "../content/hub.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("static content satisfies the CMS contract", () => {
  const result = validateRepository(getContentRepository());
  assert.equal(result.valid, true, result.errors.join("\n"));
});

test("Home uses the current BRB poster and Distribution catalogue artwork", () => {
  const brb = homeContent.productions.find((movie) => movie.title === "Billa Ranga Baasha");
  assert.equal(brb?.poster, "/images/posters/brb-optimized.webp");
  assert.ok(homeContent.distribution.length >= 10);
  assert.ok(homeContent.distribution.every((movie) => movie.distributionPoster));
});

test("Manjumal Boys is included as a 2024 Regional distribution title", () => {
  const manjumalBoys = homeContent.distribution.find((movie) => movie.slug === "manjumal-boys");
  assert.equal(manjumalBoys?.title, "Manjumal Boys");
  assert.equal(manjumalBoys?.year, "2024");
  assert.equal(manjumalBoys?.territory, "Regional");
  assert.equal(manjumalBoys?.distributionPoster, "/images/distribution/manjumal-boys.webp");
});

test("Exhibition gallery uses the four dedicated supplied images", () => {
  const source = fs.readFileSync(new URL("../components/services/ServicesExperience.jsx", import.meta.url), "utf8");
  for (const image of ["interior", "premiere", "audience", "screen"]) {
    assert.match(source, new RegExp(`/images/exhibition-${image}\\.webp`));
  }
  assert.doesNotMatch(source, /key: "red-carpet"/);
});

test("Primeverse uses dedicated Hanuman, SYG, and BRB posters", () => {
  assert.equal(quizzes.find((quiz) => quiz.movieSlug === "hanuman")?.image, "/images/posters/hanuman.webp");
  assert.equal(upcomingProjects.find((movie) => movie.slug === "syg")?.poster, "/images/posters/syg.webp");
  assert.equal(upcomingProjects.find((movie) => movie.slug === "brb")?.poster, "/images/posters/brb-optimized.webp");
});

test("SYG and BRB detail pages use their dedicated hero artwork", () => {
  const syg = getContentRepository().getMovie("syg");
  const brb = getContentRepository().getMovie("brb");
  assert.equal(syg?.heroImage, "/images/hero-syg-optimized.webp");
  assert.equal(brb?.heroImage, "/images/hero-brb-optimized.webp");
  const detailSource = fs.readFileSync(new URL("../components/services/MovieDetail.jsx", import.meta.url), "utf8");
  assert.match(detailSource, /movie\.heroImage/);
});

test("HanuMan detail page uses its dedicated hero and supplied gallery", () => {
  const hanuman = getContentRepository().getMovie("hanuman");
  assert.equal(hanuman?.heroImage, "/images/hero-hanuman-optimized.webp");
  assert.deepEqual(
    hanuman?.gallery?.map((item) => item.image),
    [
      "/images/movies/hanuman/gallery-1.webp",
      "/images/movies/hanuman/gallery-2.webp",
      "/images/movies/hanuman/gallery-3.webp",
    ],
  );
  const detailSource = fs.readFileSync(new URL("../components/services/MovieDetail.jsx", import.meta.url), "utf8");
  assert.match(detailSource, /movie\.gallery/);
});

test("SYG detail page uses the three supplied gallery images", () => {
  const syg = getContentRepository().getMovie("syg");
  assert.deepEqual(
    syg?.gallery?.map((item) => item.image),
    [
      "/images/movies/syg/gallery-1.webp",
      "/images/movies/syg/gallery-2.webp",
      "/images/movies/syg/gallery-3.webp",
    ],
  );
});

test("BRB detail page uses the three supplied gallery images", () => {
  const brb = getContentRepository().getMovie("brb");
  assert.deepEqual(
    brb?.gallery?.map((item) => item.image),
    [
      "/images/movies/brb/gallery-1.webp",
      "/images/movies/brb/gallery-2.webp",
      "/images/movies/brb/gallery-3.webp",
    ],
  );
});

test("Production uses full SYG and BRB names and disables the Darling, House Arrest, and BFH detail pages", () => {
  const repository = getContentRepository();
  assert.equal(repository.getMovie("syg")?.title, "Sambarala Yeti Gattu");
  assert.equal(repository.getMovie("brb")?.title, "Billa Ranga Baasha");
  assert.equal(repository.getMovie("darling")?.hasDetailPage, false);
  assert.equal(repository.getMovie("house-arrest")?.hasDetailPage, false);
  assert.equal(repository.getMovie("bfh")?.hasDetailPage, false);
  assert.ok(homeContent.productions.some((movie) => movie.title === "Sambarala Yeti Gattu"));
  assert.ok(homeContent.productions.some((movie) => movie.title === "Billa Ranga Baasha"));
  const pageSource = fs.readFileSync(new URL("../app/movies/[slug]/page.js", import.meta.url), "utf8");
  assert.match(pageSource, /movie\.hasDetailPage === false/);
});

test("Only HanuMan, SYG, and BRB have movie detail pages", () => {
  const repository = getContentRepository();
  const enabledSlugs = repository.getMovies()
    .filter((movie) => movie.hasDetailPage !== false)
    .map((movie) => movie.slug)
    .sort();
  assert.deepEqual(enabledSlugs, ["brb", "hanuman", "syg"]);
  const sitemapSource = fs.readFileSync(new URL("../app/sitemap.js", import.meta.url), "utf8");
  assert.match(sitemapSource, /movie\.hasDetailPage!==false/);
});

test("Primeverse lists HanuMan's two National Film Awards", async () => {
  const { awards } = await import("../content/hub.js");
  const hanumanAward = awards.find((award) => award.id === "hanuman-national-recognition");
  assert.match(hanumanAward?.description ?? "", /Best Film in AVGC/);
  assert.match(hanumanAward?.description ?? "", /Best Action Direction/);
});

test("Primeverse articles use the supplied HanuMan and distribution artwork", async () => {
  const { articles } = await import("../content/hub.js");
  assert.equal(
    articles.find((article) => article.slug === "building-the-world-of-hanuman")?.image,
    "/images/articles/building-world-of-hanuman.webp",
  );
  assert.equal(
    articles.find((article) => article.slug === "cinema-without-borders")?.image,
    "/images/articles/cinema-without-borders.webp",
  );
});

test("Primeverse uses the supplied Sculpting Light behind-the-scenes image", async () => {
  const { galleries } = await import("../content/hub.js");
  const sculptingLight = galleries.find((item) => item.id === "light");
  assert.equal(sculptingLight?.image, "/images/primeverse/sculpting-light.webp");
  assert.equal(sculptingLight?.position, "center center");
});

test("Primeverse quiz routes contact and score messages to the official WhatsApp number", () => {
  const source = fs.readFileSync(new URL("../components/hub/QuizExperience.jsx", import.meta.url), "utf8");
  assert.match(source, /createWhatsAppUrl\(\s*siteConfig\.whatsapp/);
  assert.match(source, /\+91 78429 85404/);
  assert.match(source, /Share on WhatsApp/);
});

test("All standalone detail routes include the sticky main header", () => {
  const layouts = [
    "../app/movies/[slug]/layout.js",
    "../app/prime-hub/articles/[slug]/layout.js",
    "../app/prime-hub/quizzes/[slug]/layout.js",
  ];
  for (const layout of layouts) {
    const source = fs.readFileSync(new URL(layout, import.meta.url), "utf8");
    assert.match(source, /SiteHeader/);
    assert.match(source, /primaryNavigation/);
  }
  const contactSource = fs.readFileSync(new URL("../components/contact/ContactExperience.jsx", import.meta.url), "utf8");
  assert.match(contactSource, /SiteHeader/);
});

test("Sticky main header remains transparent and the logo is offset left and down", () => {
  const styles = fs.readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /\.site-header\.is-scrolled\{[\s\S]*?background:transparent!important/);
  assert.match(styles, /\.site-header \.brand-logo\{[\s\S]*?translate\(-18px,6px\)/);
});

test("Primary hero and BRB artwork use lightweight WebP assets", () => {
  const optimizedAssets = [
    "public/images/hero-brb-optimized.webp",
    "public/images/hero-syg-optimized.webp",
    "public/images/hero-hanuman-optimized.webp",
    "public/images/posters/brb-optimized.webp",
  ];

  for (const asset of optimizedAssets) {
    const bytes = fs.statSync(path.join(projectRoot, asset)).size;
    assert.ok(bytes < 500_000, `${asset} is ${bytes} bytes; expected under 500 KB`);
  }

  const activeContent = [
    fs.readFileSync(path.join(projectRoot, "content/home.js"), "utf8"),
    fs.readFileSync(path.join(projectRoot, "content/movies.js"), "utf8"),
  ].join("\n");
  assert.doesNotMatch(activeContent, /hero-slide-[123]\.png|posters\/brb\.png/);
});

test("Every public asset is referenced by the website source", () => {
  const sourceDirectories = ["app", "components", "content", "lib", "styles"];
  const sourceFiles = [];

  const collectFiles = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) collectFiles(fullPath);
      else sourceFiles.push(fullPath);
    }
  };

  for (const directory of sourceDirectories) collectFiles(path.join(projectRoot, directory));
  const source = sourceFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
  const publicRoot = path.join(projectRoot, "public");
  const publicFiles = [];

  const collectPublicFiles = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) collectPublicFiles(fullPath);
      else publicFiles.push(fullPath);
    }
  };

  collectPublicFiles(publicRoot);
  const unusedAssets = publicFiles
    .map((file) => `/${path.relative(publicRoot, file).split(path.sep).join("/")}`)
    .filter((assetPath) => !source.includes(assetPath));
  assert.deepEqual(unusedAssets, []);
});
