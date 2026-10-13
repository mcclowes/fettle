# Fettle website

This directory contains the public Fettle website and user documentation.

```bash
npm ci
npm run dev
```

The Next.js site runs on port 3000, and Docusaurus runs on port 3001. `npm run build` builds the docs into `public/docs`, then builds the site.

Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to enable account pages locally. The site works without it.

## Dependency maintenance

Use Node 22, matching CI, and keep `npm ci`, `npm run check`, and `npm run build` passing when updating the lockfile.

The scoped `tinypool` and `serialize-javascript` overrides select patched releases while Docusaurus 3.10.2 and its build plugins require older majors. Both patched majors require Node 20 or newer. Remove the overrides when upstream dependency ranges include the fixes. A worker-pool update also needs a docs build with `future.faster.ssgWorkerThreads` and `future.v4.removeLegacyPostBuildHeadAttribute` enabled, plus `DOCUSAURUS_SSG_WORKER_THREAD_COUNT=2`; the normal build uses inline rendering.

The [dependency audit](https://github.com/mcclowes/fettle/issues/1) distinguishes package findings from request-time exposure. Remaining `braces`, legacy `postcss-selector-parser`, and dev-server `uuid` findings are tracked in [#17](https://github.com/mcclowes/fettle/issues/17). Docs are built from repository content and served as static files through Next.js; the Docusaurus development server is not part of the production start command. Reassess this boundary before accepting user-supplied glob patterns or CSS, or exposing the development server publicly.

Do not use `npm audit fix --force` to clear these findings: its current proposal downgrades Docusaurus to 3.7.0.
