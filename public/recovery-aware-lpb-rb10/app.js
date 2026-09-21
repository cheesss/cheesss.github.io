'use strict';

// Sticky section navigation: mark the section under the header as current.
(() => {
  const list = document.querySelector('.nav-links');
  if (!list) return;
  const links = [...list.querySelectorAll('a[href^="#"]')];
  const sections = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
  let current = null;
  let queued = false;
  const update = () => {
    queued = false;
    let active = '';
    for (const section of sections) if (section.getBoundingClientRect().top <= 140) active = section.id;
    if (active === current) return;
    current = active;
    for (const link of links) {
      if (link.hash === '#' + active) {
        link.setAttribute('aria-current', 'true');
        if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: Math.max(0, link.offsetLeft - 24) });
      } else {
        link.removeAttribute('aria-current');
      }
    }
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
  update();
})();

const catalog = window.IDP_CATALOG;
if (!catalog) { document.getElementById('asset-count').textContent = 'Media catalog unavailable. Rebuild the local site.'; throw new Error('Missing catalog'); }
const byId = id => catalog.assets.find(a => a.id === id || a.aliases.includes(id));
const formatBytes = bytes => {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};
const dialog = document.getElementById('viewer');

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function openMedia(asset) {
  const area = document.getElementById('dialog-media');
  area.replaceChildren();
  document.getElementById('dialog-title').textContent = asset.title;
  document.getElementById('dialog-caption').textContent = asset.caption;
  document.getElementById('dialog-status').textContent = `${asset.status} · ${asset.clearance === 'approved' ? 'Existing public clearance recorded' : 'Caption / privacy review required'} · ${formatBytes(asset.bytes)}`;
  document.getElementById('dialog-download').href = asset.src;
  if (asset.kind === 'figure') {
    const img = new Image(); img.src = asset.src; img.alt = asset.title; area.append(img);
  } else if (asset.kind === 'video') {
    const video = document.createElement('video');
    video.src = asset.src; video.controls = true; video.playsInline = true; video.preload = 'metadata';
    if (asset.thumbnail) video.poster = asset.thumbnail;
    area.append(video);
  } else {
    area.append(el('p', 'dialog-placeholder', 'Editable source / document. Download to inspect at full resolution.'));
  }
  dialog.showModal();
}
function closeMedia() { dialog.close(); document.getElementById('dialog-media').replaceChildren(); }
document.getElementById('close-viewer').addEventListener('click', closeMedia);
dialog.addEventListener('close', () => document.getElementById('dialog-media').replaceChildren());
dialog.addEventListener('click', e => {
  if (e.target !== dialog) return;
  const b = dialog.getBoundingClientRect();
  if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) closeMedia();
});

function videoCard(asset, { title, caption, label, muted = false, preload = 'metadata', ariaLabel, className = 'video-card' }) {
  const article = el('article', className);
  const video = document.createElement('video');
  video.controls = true; video.playsInline = true; video.preload = preload;
  if (muted) video.muted = true;
  video.src = asset.src;
  if (asset.thumbnail) video.poster = asset.thumbnail;
  video.setAttribute('aria-label', ariaLabel || title);
  const body = el('div', 'card-body');
  if (label) body.append(el('span', 'video-label', label));
  body.append(el('h3', '', title), el('p', '', caption));
  article.append(video, body);
  return article;
}

// Assets already embedded in the main sections stay out of the supplementary grid.
const used = new Set();
const hero = byId('idp-research-montage') || byId('ral-two-interventions');
if (hero) {
  used.add(hero.id);
  const video = document.getElementById('hero-video');
  const revision = '?v=' + hero.sha256.slice(0, 12);
  video.src = hero.src + revision;
  // Match the frame to whichever highlight is available.
  const widescreen = ['idp-focused-highlight', 'idp-research-montage'].includes(hero.id);
  video.classList.toggle('research-montage', widescreen);
  video.classList.toggle('comparison-edit', !widescreen);
  video.poster = hero.thumbnail ? hero.thumbnail + revision : '';
}
document.querySelectorAll('video[data-video]').forEach(video => {
  const a = byId(video.dataset.video);
  if (!a) return;
  used.add(a.id);
  const v = '?v=' + a.sha256.slice(0, 12);
  video.src = a.src + v;
  video.poster = a.thumbnail ? a.thumbnail + v : '';
});
document.querySelectorAll('[data-feature]').forEach(figure => {
  const a = byId(figure.dataset.feature);
  if (!a) { figure.hidden = true; return; }
  used.add(a.id);
  const img = figure.querySelector('img');
  if (a.width) { img.width = a.width; img.height = a.height; }
  img.src = a.src;
  figure.querySelector('button').addEventListener('click', () => openMedia(a));
});

const features = [
  ['ral-guidance-inspection', 'Inspect the guidance record', 'New 1x reconstruction from saved V16 inference records: current observation, nearest expert, current-state cost, and the recorded guidance_active flag. Not a calibrated collision-risk score.']
];
const featuredRoot = document.getElementById('featured-videos');
features.forEach(([id, title, caption], i) => {
  const a = byId(id);
  if (!a) return;
  used.add(a.id);
  featuredRoot.append(videoCard(a, { title, caption, label: i % 2 ? 'Diagnostic view' : 'Real-robot recording', preload: 'none' }));
});

const trajectoryVideos = [
  ['fig9-sync-dgb-dp-rmp-lpb', 'DGB', 'DP + RMP + LPB', 'Dynamic-push rollout with the recovery-aware LPB condition.'],
  ['fig9-sync-dgb-dp-rmp', 'DGB', 'DP + RMP', 'Dynamic-push rollout without LPB guidance.'],
  ['fig9-sync-dgb-dp-stop', 'DGB', 'DP + Stop', 'Dynamic-push stop baseline.'],
  ['fig9-sync-sao-dp-rmp-lpb', 'SAO', 'DP + RMP + LPB', 'Sudden-obstacle rollout. Video alignment is estimated because its creation metadata is inconsistent.'],
  ['fig9-sync-sao-dp-rmp', 'SAO', 'DP + RMP', 'Sudden-obstacle rollout using the selected recorded trial.'],
  ['fig9-sync-sao-dp-stop', 'SAO', 'DP + Stop', 'Sudden-obstacle stop baseline.']
];
const trajectoryTasks = [['DGB', 'Dynamic push (DGB)'], ['SAO', 'Sudden obstacle (SAO)']];
const trajectoryRoot = document.getElementById('trajectory-videos');
const tabList = el('div', 'segmented');
tabList.setAttribute('role', 'tablist');
tabList.setAttribute('aria-label', 'Rollout task');
const tabs = [];
const panels = [];
trajectoryTasks.forEach(([task, label]) => {
  const cards = trajectoryVideos.filter(item => item[1] === task).map(([id, , title, caption]) => {
    const a = byId(id);
    if (!a) return null;
    used.add(a.id);
    return videoCard(a, { title, caption, muted: true, ariaLabel: `${task}: ${title}`, className: 'video-card trajectory-card' });
  }).filter(Boolean);
  if (!cards.length) return;
  const key = task.toLowerCase();
  const tab = el('button', 'segment', label);
  tab.type = 'button';
  tab.id = `tab-${key}`;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', `panel-${key}`);
  const panel = el('div', 'trajectory-task-group');
  panel.id = `panel-${key}`;
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', tab.id);
  const grid = el('div', 'video-grid three');
  grid.append(...cards);
  panel.append(grid);
  tabs.push(tab); panels.push(panel); tabList.append(tab);
});
function selectTask(index, focus) {
  tabs.forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[i].hidden = !selected;
    if (!selected) panels[i].querySelectorAll('video').forEach(v => v.pause());
  });
  if (focus) tabs[index].focus();
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTask(i));
  tab.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    selectTask((i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length, true);
  });
});
if (tabs.length) {
  trajectoryRoot.replaceChildren(...(tabs.length > 1 ? [tabList] : []), ...panels);
  selectTask(0);
}

const proximityVideos = [
  ['notion-proximity-close-approach', 'Close-proximity interaction',
    'External view of a person approaching the sensorized robot during policy execution.'],
  ['notion-proximity-task-interaction', 'Proximity interaction during task execution',
    'External view of close human interaction while the robot continues the task sequence.'],
  ['notion-lpb-avoidance-diagnostic', 'LPB avoidance diagnostic',
    'Recorded observations, trajectories and runtime plots for qualitative inspection.'],
  ['notion-lpb-rollout-diagnostic-a', 'LPB rollout diagnostic A',
    'Runtime visualization from one recorded inference run.'],
  ['notion-lpb-rollout-diagnostic-b', 'LPB rollout diagnostic B',
    'Runtime visualization from a second recorded inference run.']
];
const proximityRoot = document.getElementById('proximity-videos');
if (proximityRoot) {
  const cards = proximityVideos.map(([id, title, caption], index) => {
    const asset = byId(id);
    if (!asset) return null;
    used.add(asset.id);
    return videoCard(asset, {
      title,
      caption,
      label: index < 2 ? 'External recording' : 'Runtime diagnostic',
      muted: true,
      preload: 'none',
      ariaLabel: title,
    });
  }).filter(Boolean);
  proximityRoot.replaceChildren(...cards);
}

document.addEventListener('play', e => {
  if (e.target.tagName !== 'VIDEO') return;
  const isTraj = e.target.closest('.trajectory-task-group');
  document.querySelectorAll('video').forEach(v => {
    if (v === e.target) return;
    // Allow simultaneous comparison playback within the active trajectory task group
    if (isTraj && v.closest('.trajectory-task-group') === isTraj) return;
    v.pause();
  });
}, true);

// BibTeX clipboard copy
const copyBtn = document.getElementById('copy-bibtex');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const code = document.getElementById('bibtex-code');
    const textEl = document.getElementById('copy-bibtex-text');
    if (!code || !textEl) return;
    try {
      await navigator.clipboard.writeText(code.textContent);
      const originalText = textEl.textContent;
      textEl.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        textEl.textContent = originalText;
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = code.textContent;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        const originalText = textEl.textContent;
        textEl.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          textEl.textContent = originalText;
          copyBtn.classList.remove('copied');
        }, 2000);
      } catch (fallbackErr) {
        console.warn('Clipboard copy failed', fallbackErr);
      }
    }
  });
}

function card(a) {
  const article = el('article', 'asset-card');
  const button = el('button', 'asset-cover');
  button.type = 'button';
  button.setAttribute('aria-label', `Open ${a.title}`);
  if (a.thumbnail) {
    const img = new Image(); img.src = a.thumbnail; img.alt = a.title; img.loading = 'lazy'; img.decoding = 'async';
    button.append(img);
  } else {
    button.append(el('span', 'filetype', a.src.split('.').pop().toUpperCase()));
  }
  if (a.kind === 'video') {
    const mark = el('span', 'play-mark');
    mark.setAttribute('aria-hidden', 'true');
    mark.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z"/></svg>';
    button.append(mark);
  }
  button.addEventListener('click', () => openMedia(a));
  const info = el('div', 'asset-info');
  const meta = el('div', 'asset-meta');
  [a.category, a.status].filter(Boolean).forEach(text => meta.append(el('span', 'chip', text)));
  const link = el('a', '', `Download ${formatBytes(a.bytes)} ↓`);
  link.href = a.src;
  link.download = '';
  info.append(meta, el('h3', '', a.title), el('p', '', a.caption), link);
  article.append(button, info);
  return article;
}
document.querySelectorAll('a[href="#replay"], a[href="replay.html"], #replay, #replay-shell').forEach(node => node.remove());
const supplementaryIds = ['ral-two-interventions', 'lpb-inference-full'];
const extras = supplementaryIds.map(byId).filter(a => a && !used.has(a.id));
document.getElementById('assets').replaceChildren(...extras.map(card));
document.getElementById('asset-count').textContent = `${extras.length} selected supporting videos`;
