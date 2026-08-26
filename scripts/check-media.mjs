import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const manifest = JSON.parse(await readFile(path.join(root, 'content', 'media-manifest.json'), 'utf8'));
let total = 0;

for (const item of manifest.published) {
  const filePath = path.join(root, item.file);
  const info = await stat(filePath);
  total += info.size;
  const extension = path.extname(filePath).toLowerCase();
  const max = extension === '.mp4' ? (item.intendedUse === 'Hero' ? 5 : 8) * 1024 * 1024 : 350 * 1024;
  if (info.size > max) throw new Error(`${item.file} exceeds its ${Math.round(max / 1024)} KB budget.`);
}

if (total > manifest.policy.totalBudgetBytes) throw new Error(`Published media total ${total} bytes exceeds initial budget.`);
console.log(`Media validation passed: ${manifest.published.length} assets, ${(total / 1024).toFixed(1)} KB total.`);
