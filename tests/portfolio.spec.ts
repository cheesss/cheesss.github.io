import { expect, test } from '@playwright/test';

const projects = ['recovery-aware-lpb', 'ragtal-dna-hero', 'vlm-lmtg', 'llm-trajectory-generation'];

test('home communicates research direction and exposes primary actions', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /Hyeonjun Cho/ })).toBeVisible();
  await expect(page.getByText('robot learning for physical manipulation under distribution shift', { exact: false })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Academic CV (PDF)' }).first()).toHaveAttribute('href', /Hyeonjun_Cho_Academic_CV_20260805\.pdf/);
  await expect(page.getByRole('link', { name: 'chohjender@g.skku.edu' }).first()).toHaveAttribute('href', 'mailto:chohjender@g.skku.edu');
  await expect(page.locator('body')).toHaveJSProperty('scrollWidth', await page.locator('body').evaluate((el) => el.clientWidth));
});

for (const slug of projects) {
  test(`${slug} case study has evidence, role, and limitations`, async ({ page }) => {
    await page.goto(`/research/${slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'My Role' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Team Contribution' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Evaluation results' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Limitations' })).toBeVisible();
  });
}

test('404 offers research recovery routes', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page.getByRole('heading', { name: /Page not found/ })).toBeVisible();
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
  await expect(page.getByRole('heading', { level: 2, name: 'Research', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Project page' }).first()).toBeVisible();
  await context.close();
});

test('reduced motion disables continuous CSS animation', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('video[data-autoplay="true"]')).toHaveJSProperty('paused', true);
  await context.close();
});

test('research evidence videos retain posters, captions, and native controls', async ({ page }) => {
  await page.goto('/research/vlm-lmtg/');
  const videos = page.locator('.evidence-media video, .limitation-media video');
  await expect(videos).toHaveCount(3);
  for (let index = 0; index < await videos.count(); index += 1) {
    await expect(videos.nth(index)).toHaveAttribute('poster', /\/media\/posters\/.+\.webp/);
    await expect(videos.nth(index)).toHaveAttribute('controls', '');
  }
});

test('additional project evidence stays within the four published research cases', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#ongoing')).toHaveCount(0);
  await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Ongoing' })).toHaveCount(0);

  await page.goto('/research/ragtal-dna-hero/');
  await expect(page.locator('video source[src="/media/videos/ragtal-gripper-sync.mp4"]')).toHaveCount(1);
  await expect(page.locator('figcaption').filter({ hasText: 'Leader–follower gripper synchronization check' })).toHaveCount(1);

  await page.goto('/research/llm-trajectory-generation/');
  await expect(page.locator('video source[src="/media/videos/lmtg-simulation-planning.mp4"]')).toHaveCount(1);
  await expect(page.locator('figcaption').filter({ hasText: 'Simulation trace of the language-generated approach' })).toHaveCount(1);
});

test('project pages link only to repositories that match their implementation scope', async ({ page }) => {
  const repositories = {
    '/research/recovery-aware-lpb/': [
      'https://github.com/cheesss/fork-interactive_diffusion_policy-main',
      'https://github.com/cheesss/fork_lpb_interactive_diffusion_policy',
    ],
    '/research/ragtal-dna-hero/': [
      'https://github.com/cheesss/robomimic_DNA',
      'https://github.com/cheesss/robotory_rb10_rt',
      'https://github.com/cheesss/teleop_data',
    ],
    '/research/vlm-lmtg/': [
      'https://github.com/cheesss/folk-language-models-trajectory-generators/tree/VLM_memory_LMTG_realWorld',
    ],
    '/research/llm-trajectory-generation/': [
      'https://github.com/cheesss/language-models-trajectory-generators',
    ],
  };

  for (const [path, hrefs] of Object.entries(repositories)) {
    await page.goto(path);
    for (const href of hrefs) {
      await expect(page.locator(`a[href="${href}"]`)).toHaveCount(1);
    }
  }
});

test('LPB project introduces the RMP inference run with masked footage', async ({ page }) => {
  await page.goto('/research/recovery-aware-lpb/');
  await expect(page.getByRole('heading', { name: 'RMP intervention and LPB inference' })).toBeVisible();
  const video = page.locator('.intro-media video');
  await expect(video).toHaveCount(1);
  await expect(video.locator('source')).toHaveAttribute('src', '/media/videos/lpb-rmp-inference-intro.mp4');
  await expect(video).toHaveAttribute('poster', '/media/posters/lpb-rmp-inference-intro.webp');
  await expect(page.locator('.intro-media figcaption')).toContainText('third-party faces are masked');
});

test('primary mobile navigation remains fully visible at 320px', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 320, height: 720 } });
  const page = await context.newPage();
  await page.goto('/');
  for (const name of ['Research', 'CV', 'Contact']) {
    const link = page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name });
    await expect(link).toBeVisible();
    const box = await link.boundingBox();
    expect(box, `${name} should have a layout box`).not.toBeNull();
    expect((box?.x ?? 0) + (box?.width ?? 0), `${name} should fit inside the viewport`).toBeLessThanOrEqual(320);
  }
  await context.close();
});

test('mobile detail and 404 pages do not overflow horizontally', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  for (const path of ['/research/recovery-aware-lpb/', '/research/ragtal-dna-hero/', '/404.html']) {
    await page.goto(path);
    const dimensions = await page.locator('body').evaluate((body) => ({ clientWidth: body.clientWidth, scrollWidth: body.scrollWidth }));
    expect(dimensions.scrollWidth, `${path} should fit the viewport`).toBe(dimensions.clientWidth);
  }
  await context.close();
});
