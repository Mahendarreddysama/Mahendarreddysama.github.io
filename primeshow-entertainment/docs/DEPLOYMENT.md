# Deployment

Copy `.env.example` locally and configure the same keys in production. Confirm the canonical HTTPS origin and add only verified business details. Empty optional analytics integrations stay disabled; secrets must never use `NEXT_PUBLIC_`.

Run `npm run verify` before release. It covers linting, validation logic, content contracts, the production build, artifact integrity and rendered metadata. Also review keyboard navigation, reduced motion, contact handoff, quiz completion, lightbox controls, responsive overflow and browser-console errors.

Use focused feature branches, meaningful commits, pull requests and review. Keep content and architecture changes separate where practical, and deploy only a reviewed clean commit.
