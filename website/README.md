# Fettle website

This directory contains the public Fettle website and user documentation.

```bash
npm ci
npm run dev
```

The Next.js site runs on port 3000, and Docusaurus runs on port 3001. `npm run build` builds the docs into `public/docs`, then builds the site.

Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to enable account pages locally. The site works without it.
