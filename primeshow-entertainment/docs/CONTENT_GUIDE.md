# Content Guide

- Movies: add unique records to `content/movies.js`; include verified title, slug, media, release data, language, genre, runtime, status, synopsis, division, cast/crew, trailer and distribution details where available.
- Articles, quizzes, awards and galleries: manage them in `content/hub.js`. Quiz questions require exactly four options and a zero-based `correct` index.
- Upcoming projects are derived from movies not marked Released.
- Statistics and impact content live in `content/impact.js` and `content/home.js`.
- Page narratives live in their matching content modules.

Use descriptive lowercase media names, prefer AVIF/WebP, provide meaningful alt text, and never invent people, awards, dates, titles or business details. Run `npm run test:content` after every content change.

For CMS migration, implement the repository contract under `lib/content/`, normalize provider fields there, and select the adapter server-side. Do not leak CMS response shapes into components.
