import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const directory = path.join(root, 'src', 'content', 'projects');
const files = (await readdir(directory)).filter((file) => file.endsWith('.md'));
const slugs = new Set();
const required = ['title', 'period', 'status', 'summary', 'contribution', 'role', 'teamContribution', 'metrics', 'methods', 'limitations', 'media', 'links', 'featured', 'order'];

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  if (slugs.has(slug)) throw new Error(`Duplicate project slug: ${slug}`);
  slugs.add(slug);
  const source = await readFile(path.join(directory, file), 'utf8');
  for (const field of required) {
    if (!new RegExp(`^${field}:`, 'm').test(source)) throw new Error(`${file}: missing ${field}`);
  }
  const mediaEntries = source.split(/\n\s*- src:/).slice(1);
  for (const entry of mediaEntries) {
    if (!/\n\s+alt:\s+\S/.test(entry)) throw new Error(`${file}: media entry missing alt`);
    if (!/\n\s+caption:\s+\S/.test(entry)) throw new Error(`${file}: media entry missing caption`);
    const mediaPath = entry.match(/^\s*([^\r\n]+)/)?.[1]?.trim();
    if (!mediaPath?.startsWith('/')) throw new Error(`${file}: media src must be root-relative`);
    try {
      await stat(path.join(root, 'public', mediaPath.slice(1)));
    } catch {
      throw new Error(`${file}: referenced media file does not exist: ${mediaPath}`);
    }
  }
}

if (files.length !== 4) throw new Error(`Expected 4 research projects, found ${files.length}`);
console.log(`Content validation passed: ${files.length} projects, unique slugs, required fields, and media text.`);
