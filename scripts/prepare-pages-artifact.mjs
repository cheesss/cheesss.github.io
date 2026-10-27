import { appendFile, cp, mkdir, mkdtemp, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'dist');
const retiredRoute = 'recovery-aware-lpb-rb10';
const staging = path.join(root, '.pages-artifacts');

async function files(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const relative = path.join(prefix, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Unexpected artifact symlink: ${relative}`);
    if (entry.isDirectory()) result.push(...await files(path.join(directory, entry.name), relative));
    else result.push(relative);
  }
  return result.sort();
}

if (!(await stat(source)).isDirectory()) throw new Error('Build the portfolio before packaging.');
await mkdir(staging, { recursive: true });
const target = await mkdtemp(path.join(staging, 'release-'));
const inputFiles = await files(source);
const expected = inputFiles.filter(file => file.split(path.sep)[0] !== retiredRoute);

// Create a fresh publishable copy; retained source files are never deleted.
await cp(source, target, {
  recursive: true,
  filter: file => path.relative(source, file).split(path.sep)[0] !== retiredRoute,
});
const actual = await files(target);
if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error('Artifact file inventory mismatch.');
for (const file of expected) {
  const digest = async directory => createHash('sha256').update(await readFile(path.join(directory, file))).digest('hex');
  if (await digest(source) !== await digest(target)) throw new Error(`Changed portfolio file: ${file}`);
}
for (const required of ['index.html', 'research/index.html', 'research/recovery-aware-lpb/index.html', 'about/index.html']) {
  if (!actual.includes(path.normalize(required))) throw new Error(`Missing portfolio page: ${required}`);
}
const audit = spawnSync(process.execPath, ['scripts/audit-public.mjs', '--artifact', target], { cwd: root, stdio: 'inherit' });
if (audit.status !== 0) process.exit(audit.status || 1);
const relative = path.relative(root, target).split(path.sep).join('/');
const manifest = { path: relative, files: actual.length, excludedFiles: inputFiles.length - actual.length, retiredRoute };
await writeFile(path.join(staging, 'latest.json'), JSON.stringify(manifest, null, 2) + '\n');
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `path=${relative}\n`);
console.log(`Pages deployment artifact: ${JSON.stringify(manifest)}`);
