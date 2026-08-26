import { readFile } from 'node:fs/promises';
import path from 'node:path';

const manifestPath = path.join(process.cwd(), 'content', 'media-manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const uncleared = manifest.published.filter((item) => item.publicClearance !== true);

if (uncleared.length > 0) {
  const files = uncleared.map((item) => `- ${item.file}`).join('\n');
  throw new Error(`Release blocked: ${uncleared.length} staged media assets still require public clearance.\n${files}`);
}

console.log(`Release clearance passed: ${manifest.published.length} published assets approved.`);
