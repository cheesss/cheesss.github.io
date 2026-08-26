import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const roots = ['src', 'public', 'content', 'README.md'];
const textExtensions = new Set(['.astro', '.css', '.html', '.js', '.json', '.md', '.mjs', '.svg', '.ts', '.txt', '.yml', '.yaml']);
const forbidden = [
  ['OpenAI-style API key', /\bsk-[A-Za-z0-9_-]{16,}\b/g],
  ['GitHub token', /\bgh(?:p|o|u|s|r)_[A-Za-z0-9]{20,}\b/g],
  ['AWS signed URL', /X-Amz-(?:Credential|Signature|Security-Token)=/gi],
  ['Notion internal file reference', /file:\/\//gi],
  ['Local Windows user path', /[A-Z]:[\\/]Users[\\/]/gi],
  ['Private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
];

async function collect(target) {
  const absolute = path.join(root, target);
  const info = await statSafe(absolute);
  if (!info) return [];
  if (info.isFile()) return [absolute];
  const entries = await readdir(absolute, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => collect(path.relative(root, path.join(absolute, entry.name)))));
  return nested.flat();
}

async function statSafe(file) {
  try { return await import('node:fs/promises').then(({ stat }) => stat(file)); } catch { return null; }
}

const files = (await Promise.all(roots.map(collect))).flat().filter((file) => textExtensions.has(path.extname(file).toLowerCase()));
const findings = [];
for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const [label, pattern] of forbidden) {
    pattern.lastIndex = 0;
    if (pattern.test(source)) findings.push(`${path.relative(root, file)}: ${label}`);
  }
}
if (findings.length) throw new Error(`Public audit failed:\n${findings.join('\n')}`);
console.log(`Public audit passed: ${files.length} text assets scanned for credentials and private file references.`);
