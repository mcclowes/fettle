# Fettle website

This directory contains the public Fettle website and user documentation.

```bash
npm ci
npm run dev
```

The Next.js site runs on port 3000, and Docusaurus runs on port 3001. `npm run build` builds the docs into `public/docs`, then builds the site.

Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to enable account pages locally. The site works without it.

`npm run docs:build` fails on broken page links, Markdown links, and section anchors. Run it after changing headings or internal links; `npm run check` validates frontmatter and types but doesn't run the production anchor check. The full website build and CI include `docs:build`.

## Dependency maintenance

Use Node 22, matching CI, and keep `npm ci`, `npm run check`, and `npm run build` passing when updating the lockfile.

The scoped `tinypool`, `serialize-javascript`, selector-parser, and SockJS UUID overrides select patched releases while Docusaurus 3.10.2 and its tools require older majors. These remain temporary bridges until upstream dependency ranges include the fixes. Run `npm test` after installation: it checks the six legacy CSS consumers and real loopback SockJS sessions, including connection IDs and Unicode messages. CI runs these checks before the website build.

A worker-pool update also needs a docs build with `future.faster.ssgWorkerThreads` and `future.v4.removeLegacyPostBuildHeadAttribute` enabled, plus `DOCUSAURUS_SSG_WORKER_THREAD_COUNT=2`; the normal build uses inline rendering.

The [dependency audit](https://github.com/mcclowes/fettle/issues/1) distinguishes package findings from request-time exposure. The remaining unpatched `braces` advisory and eventual removal of these overrides are tracked in [#17](https://github.com/mcclowes/fettle/issues/17). Docs are built from repository content and served as static files through Next.js; the Docusaurus development server is not part of the production start command. Reassess this boundary before accepting user-supplied glob patterns or CSS, or exposing the development server publicly.

Do not use `npm audit fix --force` to clear these findings: its current proposal downgrades Docusaurus to 3.7.0.
