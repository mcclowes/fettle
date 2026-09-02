import {readdirSync, readFileSync} from 'node:fs';
import {join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const siteRoot = fileURLToPath(new URL('..', import.meta.url));
const docsRoot = join(siteRoot, 'docs');

function filesBelow(directory) {
  return readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  });
}

const errors = [];
const routes = new Map();
const content = filesBelow(docsRoot).filter((path) => path.endsWith('.md') || path.endsWith('.mdx'));

for (const path of content) {
  const source = readFileSync(path, 'utf8');
  const name = relative(siteRoot, path);
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/u)?.[1];
  if (!frontmatter) {
    errors.push(`${name}: missing frontmatter`);
    continue;
  }
  for (const field of ['title', 'description']) {
    if (!new RegExp(`^${field}:\\s*\\S`, 'mu').test(frontmatter)) errors.push(`${name}: missing ${field}`);
  }
  const slug = frontmatter.match(/^slug:\s*(\S+)/mu)?.[1];
  if (slug && routes.has(slug)) errors.push(`${name}: duplicate slug ${slug} (also ${routes.get(slug)})`);
  else if (slug) routes.set(slug, name);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${content.length} documentation pages.`);
}
