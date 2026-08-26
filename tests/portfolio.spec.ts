import { expect, test } from '@playwright/test';

const projects = ['recovery-aware-lpb', 'ragtal-dna-hero', 'vlm-lmtg', 'llm-trajectory-generation'];

test('home communicates research direction and exposes primary actions', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /Hyeonjun Cho/ })).toBeVisible();
  await expect(page.getByText('Imitation learning, diffusion policies', { exact: false })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', /Hyeonjun_Cho_Academic_CV_20260805\.pdf/);
  await expect(page.getByRole('link', { name: 'Email Me' })).toHaveAttribute('href', 'mailto:chohjender@g.skku.edu');
  await expect(page.locator('body')).toHaveJSProperty('scrollWidth', await page.locator('body').evaluate((el) => el.clientWidth));
});

for (const slug of projects) {
  test(`${slug} case study has evidence, role, and limitations`, async ({ page }) => {
    await page.goto(`/research/${slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('My Role', { exact: true })).toBeVisible();
    await expect(page.getByText('Team Contribution', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Results in context' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What this does not claim' })).toBeVisible();
  });
}

test('404 offers research recovery routes', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page.getByRole('heading', { name: /Trajectory interrupted/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return home' })).toBeVisible();
});

test('internal links and stable CV asset resolve', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page.locator('a[href]').evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute('href')).filter(Boolean))] as string[]);
  for (const href of hrefs.filter((value) => value.startsWith('/'))) {
    const response = await request.get(href);
    expect(response.ok(), `${href} should resolve`).toBeTruthy();
  }
  const cv = await request.get('/cv/Hyeonjun_Cho_Academic_CV_20260805.pdf');
  expect(cv.headers()['content-type']).toContain('application/pdf');
});

test('core content remains available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /Hyeonjun Cho/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View Research' })).toBeVisible();
  await context.close();
});

test('reduced motion disables continuous CSS animation', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  const motion = await page.locator('.recovery-path').evaluate((element) => ({
    durationSeconds: Number.parseFloat(getComputedStyle(element).animationDuration),
    iterations: getComputedStyle(element).animationIterationCount,
  }));
  expect(motion.durationSeconds).toBeLessThan(0.001);
  expect(motion.iterations).toBe('1');
  await context.close();
});
