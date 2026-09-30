# Portfolio

## Admin

Set `ADMIN_PASSWORD` in the server environment, then open `/admin`. The admin session
uses an HTTP-only cookie. On Vercel, portfolio content is stored in Neon Postgres and
uploaded media is stored in Vercel Blob. Without those integrations, local development
uses `data/portfolio.json` and `data/uploads` as a fallback.

Run locally with:

```sh
ADMIN_PASSWORD='choose-a-long-unique-password' npm run dev
```

The Vercel Blob SDK requires Node.js 20 or newer. Vercel project `portfolio-8zgt` uses
Node.js 24. Keep secrets in environment variables; never commit `.env.local`.
