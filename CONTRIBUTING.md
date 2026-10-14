# Contributing

Thanks for helping make Fettle better.

## Bugs

Search the existing issues first. If you can't find the problem, use the bug report form and include:

- The Fettle and macOS versions
- Clear steps to reproduce the problem
- What you expected and what happened instead
- Screenshots or diagnostics, when useful

Remove source code, credentials, tokens, private repository names, and other sensitive information before posting.

## Ideas

Use Discussions for early or open-ended ideas. Open a feature request when the desired behavior is concrete enough to evaluate.

## Pull requests

Fettle's application source isn't hosted here, so this repository doesn't accept application-code contributions. Pull requests for the website and user documentation are welcome.

For website or documentation changes, use Node 22, matching CI, and run these commands from `website/` before opening a pull request:

```bash
npm ci
npm test
npm run check
npm run build
```

`npm run check` validates documentation frontmatter and TypeScript. The full build also builds the documentation, rejecting broken page links, Markdown links, and section anchors, then builds the website. When changing headings or internal links, `npm run docs:build` runs that documentation gate on its own.
