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
if (!catalog) { throw new Error('Missing catalog'); }
const byId = id => catalog.assets.find(a => a.id === id || a.aliases.includes(id));
const dialog = document.getElementById('viewer');

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function openMedia(asset, startTime = 0) {
  document.querySelectorAll('video').forEach(video => video.pause());
  const area = document.getElementById('dialog-media');
  area.replaceChildren();
  document.getElementById('dialog-title').textContent = asset.title;
  document.getElementById('dialog-caption').textContent = asset.caption;
  const downloadLink = document.getElementById('dialog-download');
  if (downloadLink) {
    downloadLink.href = asset.src;
    downloadLink.textContent = 'Download ↓';
  }
  if (asset.kind === 'figure') {
    const img = new Image(); img.src = asset.src; img.alt = asset.title; area.append(img);
  } else if (asset.kind === 'video') {
    const video = document.createElement('video');
    video.src = asset.src; video.controls = true; video.playsInline = true; video.preload = 'metadata';
    if (asset.thumbnail) video.poster = asset.thumbnail;
    if (startTime > 0) {
      video.addEventListener('loadedmetadata', () => {
        if (Number.isFinite(video.duration)) video.currentTime = Math.min(startTime, Math.max(0, video.duration - .05));
      }, { once: true });
    }
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

function videoCard(asset, { title, caption, label, muted = false, preload = 'none', ariaLabel, className = 'video-card', analysisAsset }) {
  const article = el('article', className);
  const video = document.createElement('video');
  video.controls = true; video.playsInline = true; video.preload = preload;
  if (muted) video.muted = true;
  const revision = asset.sha256 ? '?v=' + asset.sha256.slice(0, 12) : '';
  video.src = asset.src + revision;
  if (asset.thumbnail) video.poster = asset.thumbnail + revision;
  video.setAttribute('aria-label', ariaLabel || title);
  const body = el('div', 'card-body');
  if (label) body.append(el('span', 'video-label', label));
  body.append(el('h3', '', title), el('p', '', caption));
  const actions = el('div', 'video-actions');
  const enlarge = el('button', 'video-action', 'Enlarge video');
  enlarge.type = 'button';
  enlarge.setAttribute('aria-label', `Enlarge ${ariaLabel || title}`);
  enlarge.addEventListener('click', () => openMedia({ ...asset, title: ariaLabel || title, caption }, video.currentTime));
  actions.append(enlarge);
  if (analysisAsset) {
    const analysis = el('button', 'video-action', 'View trajectory');
    analysis.type = 'button';
    analysis.setAttribute('aria-label', `View trajectory for ${ariaLabel || title}`);
    analysis.addEventListener('click', () => openMedia({ ...analysisAsset, title: `${ariaLabel || title} / Trajectory analysis` }));
    actions.append(analysis);
  }
  body.append(actions);
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

// Figure modal uses the visible figure caption and title rather than internal catalog metadata.
document.querySelectorAll('[data-feature]').forEach(figure => {
  const a = byId(figure.dataset.feature);
  if (!a) { figure.hidden = true; return; }
  used.add(a.id);
  const img = figure.querySelector('img');
  if (a.width) { img.width = a.width; img.height = a.height; }
  img.src = a.src;
  const figcaption = figure.querySelector('figcaption');
  const strong = figcaption ? figcaption.querySelector('strong') : null;
  const visibleTitle = strong
    ? `${strong.textContent.replace(/:$/, '').trim()}${img.alt ? ' — ' + img.alt : ''}`
    : (img.alt || a.title);
  const prefix = strong ? strong.textContent : '';
  const visibleCaption = (figcaption && prefix)
    ? figcaption.textContent.replace(prefix, '').trim()
    : (figcaption ? figcaption.textContent.trim() : a.caption);
  figure.querySelector('button').addEventListener('click', () => openMedia({
    ...a,
    title: visibleTitle,
    caption: visibleCaption
  }));
});

const features = [
  ['ral-guidance-inspection', 'Guidance record inspection', 'Runtime reconstruction of current observation, nearest expert reference, and policy guidance state from saved inference records.']
];
const featuredRoot = document.getElementById('featured-videos');
features.forEach(([id, title, caption], i) => {
  const a = byId(id);
  if (!a) return;
  used.add(a.id);
  featuredRoot.append(videoCard(a, { title, caption, label: i % 2 ? 'Diagnostic view' : 'Real-robot recording', preload: 'none' }));
});

const trajectoryVideos = [
  ['fig9-sync-dgb-dp-rmp-lpb', 'DGB', 'DP + RMP + LPB', 'Dynamic-push rollout with recovery-aware LPB.'],
  ['fig9-sync-dgb-dp-rmp', 'DGB', 'DP + RMP', 'Dynamic-push rollout without LPB guidance.'],
  ['fig9-sync-dgb-dp-stop', 'DGB', 'DP + Stop', 'Dynamic-push stop baseline.'],
  ['fig9-sync-sao-dp-rmp-lpb', 'SAO', 'DP + RMP + LPB', 'Sudden-obstacle rollout with recovery-aware LPB (estimated alignment).'],
  ['fig9-sync-sao-dp-rmp', 'SAO', 'DP + RMP', 'Sudden-obstacle rollout without LPB guidance.'],
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
    const analysis = byId(id);
    const robot = byId(id.replace('fig9-sync-', 'fig9-robot-'));
    const a = robot || analysis;
    if (!a) return null;
    used.add(a.id);
    if (analysis) used.add(analysis.id);
    return videoCard(a, { title, caption, label: robot ? '1x recorded speed' : 'Trajectory analysis',
      muted: true, ariaLabel: `${task}: ${title}`, className: 'video-card robot-card',
      analysisAsset: robot ? analysis : undefined });
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
  const externalGrid = el('div', 'video-grid two');
  const diagnosticGrid = el('div', 'video-grid diagnostic-grid');
  proximityVideos.forEach(([id, title, caption], index) => {
    const asset = byId(id);
    if (!asset) return;
    used.add(asset.id);
    const card = videoCard(asset, {
      title,
      caption,
      label: index < 2 ? 'External recording' : 'Runtime diagnostic',
      muted: true,
      preload: 'none',
      ariaLabel: title,
      className: index < 2 ? 'video-card robot-card' : 'video-card diagnostic-card',
    });
    (index < 2 ? externalGrid : diagnosticGrid).append(card);
  });
  const details = el('details', 'analysis-disclosure');
  details.append(el('summary', '', 'Inspect observation and guidance plots'), diagnosticGrid);
  details.addEventListener('toggle', () => {
    if (!details.open) details.querySelectorAll('video').forEach(video => video.pause());
  });
  proximityRoot.replaceChildren(externalGrid, details);
}

document.addEventListener('play', e => {
  if (e.target.tagName !== 'VIDEO') return;
  const isTraj = e.target.closest('.trajectory-task-group');
  document.querySelectorAll('video').forEach(v => {
    if (v === e.target) return;
    if (isTraj && v.closest('.trajectory-task-group') === isTraj) return;
    v.pause();
  });
}, true);

function card(item) {
  const a = byId(item.id);
  if (!a) return null;
  const cleanAsset = {
    ...a,
    title: item.title || a.title,
    caption: item.caption || a.caption
  };
  const article = el('article', 'asset-card');
  const button = el('button', 'asset-cover');
  button.type = 'button';
  button.setAttribute('aria-label', `Open ${cleanAsset.title}`);
  if (cleanAsset.thumbnail) {
    const img = new Image(); img.src = cleanAsset.thumbnail; img.alt = cleanAsset.title; img.loading = 'lazy'; img.decoding = 'async';
    button.append(img);
  } else {
    button.append(el('span', 'filetype', cleanAsset.src.split('.').pop().toUpperCase()));
  }
  if (cleanAsset.kind === 'video') {
    const mark = el('span', 'play-mark');
    mark.setAttribute('aria-hidden', 'true');
    mark.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z"/></svg>';
    button.append(mark);
  }
  button.addEventListener('click', () => openMedia(cleanAsset));
  const info = el('div', 'asset-info');
  const link = el('a', '', 'Download ↓');
  link.href = cleanAsset.src;
  link.download = '';
  info.append(el('h3', '', cleanAsset.title), el('p', '', cleanAsset.caption), link);
  article.append(button, info);
  return article;
}

document.querySelectorAll('a[href="#replay"], a[href="replay.html"], #replay, #replay-shell').forEach(node => node.remove());

const supplementaryItems = [
  {
    id: 'ral-two-interventions',
    title: 'Reactive avoidance and continuation',
    caption: 'Side-by-side view of two recorded disturbance events during manipulation, showing obstacle avoidance and subsequent task continuation.'
  },
  {
    id: 'lpb-inference-full',
    title: 'Full evaluation rollout',
    caption: 'Recorded full-length evaluation rollout demonstrating reactive avoidance and task continuation.'
  }
];
const extras = supplementaryItems
  .filter(item => !used.has(item.id))
  .map(card)
  .filter(Boolean);

const assetsRoot = document.getElementById('assets');
if (assetsRoot) {
  assetsRoot.replaceChildren(...extras);
}
