# Ngo Chi Nghia — AI Engineer Portfolio

Personal portfolio for selected GenAI, retrieval, computer-vision, and software projects.

**Live site:** [portfolio-chinghia.vercel.app](https://portfolio-chinghia.vercel.app)

**GitHub:** [@chinghia689](https://github.com/chinghia689) · **LinkedIn:** [linkedin.com/in/chinghia010804](https://www.linkedin.com/in/chinghia010804/)

## Features

- Project pages with problem context, implementation details, and evaluation status
- Publications, awards, résumé, and contact pages
- Responsive Next.js interface with light and dark themes
- Admin-managed portfolio content; Neon Postgres and Vercel Blob are optional production integrations

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Neon Postgres · Vercel Blob

## Run locally

Requires Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Run the available checks before opening a pull request:

```bash
npm run lint
npm run build
```

To use the admin page locally, set `ADMIN_PASSWORD` in your environment and open `/admin`. Keep `.env.local` and production credentials out of Git.

## Content

The source defaults are in `lib/portfolio-data.ts`. In deployments with Neon configured, saved admin content takes precedence over those defaults. Update both the default content and the admin-managed content when changing public project claims.
