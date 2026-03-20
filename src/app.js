// ═══════════════════════════════════════════════════════════
// CSS Custom Property Reader
// ═══════════════════════════════════════════════════════════
const CSS = (() => {
  const s = getComputedStyle(document.documentElement);
  const g = (v) => s.getPropertyValue(v).trim();
  return {
    text: g('--text'), muted: g('--muted'), dim: g('--dim'),
    border: g('--border'), cNone: g('--c-none'),
    francophone: g('--francophone'), anglophone: g('--anglophone'),
    lusophone: g('--lusophone'), otherH: g('--other-h'),
    scoreX: g('--score-x'), scoreP: g('--score-p'), scoreV: g('--score-v'),
    pillBgV: g('--pill-bg-v'), pillBgP: g('--pill-bg-p'), pillBgX: g('--pill-bg-x'),
    pillCv: g('--pill-c-v'), pillCp: g('--pill-c-p'), pillCx: g('--pill-c-x'),
    strokeDefault: g('--stroke-default'), axisGrid: g('--axis-grid'),
    hatchBg: g('--hatch-bg'), hatchStroke: g('--hatch-stroke'),
  };
})();

// ─── Constants & Color Scales ─────────────────────────────
const COLOR_NONE = CSS.cNone;

// Heritage-keyed color gradients (Component A)
const HERITAGE_COLORS = {
  francophone: { X: '#d5d0e8', P: '#7a82b8', V: '#4a5a9a', flat: '#4a5a9a' },
  anglophone:  { X: '#e8d0d4', P: '#b86878', V: '#9a3a4a', flat: '#9a3a4a' },
  lusophone:   { X: '#cce8dc', P: '#58a880', V: '#2a7a5a', flat: '#2a7a5a' },
  other:       { X: '#dde0e4', P: '#98a0a8', V: '#7a8088', flat: '#7a8088' },
  mixed:       { X: '#dde0e4', P: '#98a0a8', V: '#7a8088', flat: '#7a8088' },
};

const HERITAGE_SCALES = {};
for (const [h, c] of Object.entries(HERITAGE_COLORS)) {
  HERITAGE_SCALES[h] = d3.scaleLinear()
    .domain([0, 1, 2])
    .range([c.X, c.P, c.V])
    .interpolate(d3.interpolateRgb.gamma(2.2));
}

// Single gradient for "Score seul" mode (original)
const COLOR_X = CSS.scoreX;
const COLOR_P = CSS.scoreP;
const COLOR_V = CSS.scoreV;
const mapColorScale = d3.scaleLinear()
  .domain([0, 1, 2])
  .range([COLOR_X, COLOR_P, COLOR_V])
  .interpolate(d3.interpolateRgb.gamma(2.2));

function numVal(s) { return s === 'V' ? 2 : s === 'P' ? 1 : 0; }

const HC = { francophone:CSS.francophone, anglophone:CSS.anglophone, lusophone:CSS.lusophone, other:CSS.otherH, mixed:CSS.otherH };
const HL = { all:'Tous', francophone:'Francophone', anglophone:'Anglophone', lusophone:'Lusophone', other:'Autre' };
const HM_SHORT = {
  'Dpa': 'Péd.aut.', 'F': 'Féd.', 'Dau': 'Auto.', 'Drc': 'Cult.',
  'Drm': 'Min.', 'Id': 'Iden.', 'La': 'Lng.', 'PJ': 'Plur.',
  'Dc': 'Déc.', 'Dis': 'Discr.'
};

// ─── State ─────────────────────────────────────────────────
let selDims = new Set(['Drm']);
let selYear = 2026;
let selCountry = null;
let mapMode = 'combined'; // 'score' | 'combined' | 'heritage'
let geoData = null;
let isoToGeo = {};
let playInt = null;
let hmSort = { col: '_total', dir: -1 };
let hmFilter = 'all';

const GROUPS = {
  'Identitaire': ['Drm','La','Drc','Id'],
  'Institutionnel': ['F','Dc','Dau','PJ'],
  'Protections': ['Dpa','Dis'],
};

// ─── Utility ───────────────────────────────────────────────
function getState(c, y) {
  const evs = DATA.country_timelines[c];
  if (!evs) return null;
  let last = null;
  for (const e of evs) { if (e.year !== null && e.year <= y) last = e; }
  return last;
}

function compScore(st) {
  if (!st || selDims.size === 0) return null;
  let s = 0;
  for (const d of selDims) s += numVal(st.features[d]);
  return s / selDims.size;
}

function fillFor(sc, heritage) {
  if (sc === null) return COLOR_NONE;
  const h = heritage || 'other';
  if (mapMode === 'score') return mapColorScale(sc);
  if (mapMode === 'heritage') return HERITAGE_COLORS[h] ? HERITAGE_COLORS[h].flat : HERITAGE_COLORS.other.flat;
  // combined mode
  return (HERITAGE_SCALES[h] || HERITAGE_SCALES.other)(sc);
}

// Backward-compatible wrapper for bio timeline (always uses single gradient)
function fillForScore(sc) { return sc === null ? COLOR_NONE : mapColorScale(sc); }

// ─── Scale bar ─────────────────────────────────────────────
function renderScale() {
  renderLegend2D();
}

function renderLegend2D() {
  const cont = document.getElementById('legend-2d');
  const heritages = ['francophone','anglophone','lusophone','other'];
  const scores = ['X','P','V'];
  const scoreLabels = { X:'Absent', P:'Partiel', V:'Reconnu' };

  let html = '<div class="legend-grid">';
  // Header row
  html += '<div></div>';
  scores.forEach(s => { html += `<div class="lg-header">${scoreLabels[s]}</div>`; });
  // Heritage rows
  heritages.forEach(h => {
    const hLabel = h === 'other' ? 'Autre' : h.charAt(0).toUpperCase() + h.slice(1);
    const dotColor = HC[h];
    html += `<div class="lg-row-label"><span class="lg-dot" style="background:${dotColor}"></span>${hLabel}</div>`;
    scores.forEach(s => {
      const color = HERITAGE_COLORS[h][s];
      html += `<div class="lg-swatch" style="background:${color}" title="${hLabel} — ${scoreLabels[s]}"></div>`;
    });
  });
  html += '</div>';
  cont.innerHTML = html;
}


// ─── Dim buttons ───────────────────────────────────────────
function buildDimBtns() {
  const cont = document.getElementById('dim-buttons');
  const grpC = document.getElementById('grp-buttons');

  Object.entries(GROUPS).forEach(([n, ds]) => {
    const b = document.createElement('button');
    b.className = 'grp-btn'; b.textContent = n;
    b.title = ds.map(d => DATA.feature_labels[d]).join(', ');
    b.addEventListener('click', () => {
      const all = ds.every(d => selDims.has(d));
      if (all) ds.forEach(d => selDims.delete(d));
      else ds.forEach(d => selDims.add(d));
      if (selDims.size === 0) selDims.add('Drm');
      syncDims(); updateMap();
    });
    grpC.appendChild(b);
  });

  const aBtn = document.createElement('button');
  aBtn.className = 'grp-btn'; aBtn.textContent = 'Toutes';
  aBtn.addEventListener('click', () => {
    DATA.features.forEach(d => selDims.add(d));
    syncDims(); updateMap();
  });
  grpC.appendChild(aBtn);

  DATA.features.forEach(f => {
    const b = document.createElement('button');
    b.className = 'dim-btn'; b.dataset.dim = f;
    b.innerHTML = `<span class="cb"></span>${DATA.feature_labels[f]}`;
    b.addEventListener('click', e => {
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        if (selDims.has(f)) { if (selDims.size > 1) selDims.delete(f); }
        else selDims.add(f);
      } else {
        selDims.clear(); selDims.add(f);
      }
      syncDims(); updateMap();
    });
    cont.appendChild(b);
  });
  syncDims();
}

function syncDims() {
  document.querySelectorAll('.dim-btn').forEach(b => {
    const d = b.dataset.dim;
    b.classList.toggle('active', selDims.has(d));
    b.querySelector('.cb').textContent = selDims.has(d) ? '✓' : '';
  });
  document.querySelectorAll('.grp-btn').forEach(b => {
    const n = b.textContent;
    if (n === 'Toutes') b.classList.toggle('active', selDims.size === DATA.features.length);
    else if (GROUPS[n]) b.classList.toggle('active', GROUPS[n].every(d => selDims.has(d)));
  });
}

// ─── Mode switch ──────────────────────────────────────────
function buildModeSwitch() {
  document.querySelectorAll('#mode-switch .mode-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('#mode-switch .mode-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      mapMode = b.dataset.mode;
      updateMap();
    });
  });
}

function resetStrokes() {
  d3.selectAll('.country-path').each(function() {
    const el = d3.select(this);
    if (!el.classed('selected')) {
      el.attr('stroke', CSS.strokeDefault).attr('stroke-width', 0.4);
    }
  });
}

// ─── Map ───────────────────────────────────────────────────
async function initMap() {
  const r = await fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson');
  const w = await r.json();
  geoData = { type:'FeatureCollection', features: w.features.filter(f => f.properties.CONTINENT === 'Africa') };

  geoData.features.forEach(f => {
    isoToGeo[f.properties.ISO_A3] = f;
    if (f.properties.ISO_A3_EH) isoToGeo[f.properties.ISO_A3_EH] = f;
    if (f.properties.ISO_A3 === '-99' && f.properties.ADM0_A3) isoToGeo[f.properties.ADM0_A3] = f;
  });

  document.getElementById('loading').style.display = 'none';
  document.getElementById('map-svg').style.display = 'block';
  renderMap();
}

function renderMap() {
  const cont = document.getElementById('map-container');
  const W = cont.clientWidth, H = 520;
  const svg = d3.select('#map-svg').attr('viewBox', `0 0 ${W} ${H}`);
  svg.selectAll('*').remove();

  // Hatched pattern for pre-independence countries
  const defs = svg.append('defs');
  const pat = defs.append('pattern')
    .attr('id', 'hatch-colonial')
    .attr('width', 6).attr('height', 6)
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('patternTransform', 'rotate(45)');
  pat.append('rect').attr('width', 6).attr('height', 6).attr('fill', CSS.hatchBg);
  pat.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 6)
    .attr('stroke', CSS.hatchStroke).attr('stroke-width', 1.5);

  const proj = d3.geoMercator().center([20, 3]).scale(Math.min(W, H) * 0.65).translate([W/2, H/2]);
  const path = d3.geoPath().projection(proj);
  const g = svg.append('g');

  // Background (non-African or non-data countries)
  const dataIsos = new Set(Object.values(DATA.name_to_iso));
  g.selectAll('path.bg').data(geoData.features.filter(f => !dataIsos.has(f.properties.ISO_A3) && !dataIsos.has(f.properties.ADM0_A3)))
    .join('path').attr('d', d => path(d)).attr('fill', CSS.hatchBg).attr('stroke', CSS.strokeDefault).attr('stroke-width', 0.3);

  // Data countries
  const cPaths = [];
  for (const [name, iso] of Object.entries(DATA.name_to_iso)) {
    const geo = isoToGeo[iso];
    if (geo) cPaths.push({ name, iso, geo });
  }

  g.selectAll('path.country-path').data(cPaths, d => d.iso).join('path')
    .attr('class', 'country-path')
    .attr('d', d => path(d.geo))
    .attr('data-country', d => d.name)
    .on('mouseenter', onHover).on('mousemove', onMove).on('mouseleave', onLeave).on('click', onClick);

  updateMap();
}

function isIndependent(country, year) {
  const indepYear = DATA.independence_dates && DATA.independence_dates[country];
  if (!indepYear) return true; // assume independent if no data
  return year >= indepYear;
}

function isSplitYet(country, year) {
  // For border-split countries (Eritrea, South Sudan): before split, they don't exist as separate entities
  const split = DATA.border_splits && DATA.border_splits[country];
  if (!split) return true; // not a split country
  return year >= split.split_year;
}

function getParentCountry(country) {
  const split = DATA.border_splits && DATA.border_splits[country];
  return split ? split.parent : null;
}

function updateMap() {
  d3.selectAll('.country-path').each(function(d) {
    const el = d3.select(this);
    const indep = isIndependent(d.name, selYear);
    const splitOk = isSplitYet(d.name, selYear);
    const h = DATA.colonial_heritage[d.name] || 'other';

    if (!splitOk) {
      const parent = getParentCountry(d.name);
      if (parent) {
        const pH = DATA.colonial_heritage[parent] || 'other';
        const pState = getState(parent, selYear);
        const pScore = compScore(pState);
        el.attr('fill', fillFor(pScore, pH));
        el.attr('stroke', fillFor(pScore, pH)).attr('stroke-width', 0.8);
      }
    } else if (!indep) {
      el.attr('fill', 'url(#hatch-colonial)');
    } else {
      const st = getState(d.name, selYear);
      el.attr('fill', fillFor(compScore(st), h));
    }
  });
  resetStrokes();
}

// ─── Tooltip ───────────────────────────────────────────────
const tooltip = document.getElementById('tooltip');

function onHover(ev, d) {
  const indep = isIndependent(d.name, selYear);
  const splitOk = isSplitYet(d.name, selYear);

  let statusLine = '';
  if (!splitOk) {
    const parent = getParentCountry(d.name);
    const splitInfo = DATA.border_splits[d.name];
    statusLine = `<div style="font-size:0.72rem;color:${CSS.pillCp};margin-bottom:0.2rem">Fait partie de ${parent} jusqu'en ${splitInfo.split_year}</div>`;
  } else if (!indep) {
    const indepY = DATA.independence_dates[d.name];
    statusLine = `<div style="font-size:0.72rem;color:${CSS.pillCp};margin-bottom:0.2rem">Territoire colonial — indépendance en ${indepY}</div>`;
  }

  const st = getState(d.name, selYear);
  const sc = compScore(st);
  const h = DATA.colonial_heritage[d.name] || 'other';
  const hLabel = HL[h] || h;
  let pills = '';
  if (st && indep && splitOk) {
    pills = '<div class="tt-pills">' + DATA.features.map(f => {
      const v = st.features[f];
      const act = selDims.has(f);
      const bg = v==='V'?CSS.pillBgV:v==='P'?CSS.pillBgP:CSS.pillBgX;
      const c = v==='V'?CSS.pillCv:v==='P'?CSS.pillCp:CSS.pillCx;
      const brd = act ? `border:1px solid ${c};` : 'border:1px solid transparent;';
      return `<span class="tt-pill" style="background:${bg};color:${c};${brd}">${DATA.feature_labels[f]}: ${v}</span>`;
    }).join('') + '</div>';
  }

  tooltip.innerHTML =
    `<div class="tt-name">${d.name}</div>` +
    `<div style="font-size:0.72rem;color:${HC[h]};margin-bottom:0.15rem">${hLabel}</div>` +
    statusLine +
    (indep && splitOk
      ? `<div class="tt-score"><div class="tt-swatch" style="background:${fillFor(sc, h)}"></div>${sc !== null ? `Score : ${sc.toFixed(2)}/2 (${selDims.size} dim.)` : 'Pas de données'}</div>` +
        (st ? `<div class="tt-const">${st.name} (${st.date_raw||st.year||'?'})</div>` : '')
      : '') +
    pills;
  tooltip.style.opacity = '1';
}

function onMove(ev) {
  tooltip.style.left = Math.min(ev.clientX + 14, window.innerWidth - 420) + 'px';
  tooltip.style.top = (ev.clientY - 10) + 'px';
}

function onLeave() { tooltip.style.opacity = '0'; }

// ─── Country click / Bio ───────────────────────────────────
function onClick(ev, d) {
  d3.selectAll('.country-path').classed('selected', false);
  resetStrokes();
  d3.select(this).classed('selected', true).attr('stroke', CSS.text).attr('stroke-width', 1.8);
  selCountry = d.name;
  openBio(d.name);
}

function openBio(c) {
  const p = document.getElementById('bio-panel');
  p.classList.add('open');
  document.getElementById('bio-country-name').textContent = c;
  const evs = DATA.country_timelines[c];
  const h = DATA.colonial_heritage[c] || 'autre';
  const reg = DATA.country_region[c] || '';
  const hL = { francophone:'Francophone', anglophone:'Anglophone', lusophone:'Lusophone', other:'Autre', mixed:'Mixte' };
  document.getElementById('bio-meta').innerHTML =
    `<span style="color:${HC[h]||HC.other}">${hL[h]||h}</span><span>${reg}</span><span>${evs.length} textes</span>`;
  document.getElementById('commentary-pane').classList.remove('open');
  document.getElementById('commentary-pane').innerHTML = '';
  renderBio(c, evs);
  p.scrollIntoView({ behavior:'smooth', block:'nearest' });
}

function closeBio() {
  document.getElementById('bio-panel').classList.remove('open');
  document.getElementById('commentary-pane').classList.remove('open');
  d3.selectAll('.country-path').classed('selected', false);
  resetStrokes();
  selCountry = null;
}

function showCommentary(ev) {
  const pane = document.getElementById('commentary-pane');
  const pills = DATA.features.map(f => {
    const v = ev.features[f];
    const bg = v==='V'?CSS.pillBgV:v==='P'?CSS.pillBgP:CSS.pillBgX;
    const c = v==='V'?CSS.pillCv:v==='P'?CSS.pillCp:CSS.pillCx;
    return `<span class="tt-pill" style="background:${bg};color:${c};padding:0.12rem 0.4rem;font-size:0.72rem">${DATA.feature_labels[f]}: ${v}</span>`;
  }).join('');

  pane.innerHTML =
    `<div class="cp-title">${ev.name || 'Sans titre'}</div>` +
    `<div class="cp-date">${ev.date_raw || ev.year || ''}</div>` +
    `<div class="cp-pills">${pills}</div>` +
    `<div class="cp-text">${ev.comment || '<em>Pas de commentaire disponible.</em>'}</div>`;
  pane.classList.add('open');
  pane.scrollIntoView({ behavior:'smooth', block:'nearest' });
}

function renderBio(country, events) {
  const evY = events.filter(e => e.year !== null);
  if (!evY.length) return;
  const minY = Math.min(...evY.map(e => e.year));
  const maxY = Math.max(2026, Math.max(...evY.map(e => e.year)));

  const m = { top:28, right:18, bottom:32, left:150 };
  const lH = 19, lG = 2, nL = DATA.features.length;
  const iH = nL * (lH + lG);
  const W = Math.max(680, (maxY - minY) * 12);
  const H = iH + m.top + m.bottom;

  const svg = d3.select('#bio-timeline-svg').attr('width', W + m.left + m.right).attr('height', H);
  svg.selectAll('*').remove();
  const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

  const x = d3.scaleLinear().domain([minY, maxY]).range([0, W]);

  g.append('g').attr('transform', `translate(0,${iH+3})`)
    .call(d3.axisBottom(x).tickFormat(d => String(d)).ticks(Math.min(14, maxY-minY)))
    .selectAll('text').attr('fill',CSS.muted).attr('font-size','9.5px');
  g.selectAll('.domain, .tick line').attr('stroke',CSS.border);

  DATA.features.forEach((f, i) => {
    const y = i * (lH + lG);
    g.append('text').attr('x', -5).attr('y', y + lH/2 + 3.5)
      .attr('text-anchor','end')
      .attr('fill', selDims.has(f) ? CSS.text : CSS.dim)
      .attr('font-size','10px')
      .attr('font-weight', selDims.has(f) ? '600' : '400')
      .text(DATA.feature_labels[f]);
  });

  for (let fi = 0; fi < DATA.features.length; fi++) {
    const feat = DATA.features[fi];
    const y = fi * (lH + lG);
    const isSel = selDims.has(feat);

    for (let ei = 0; ei < evY.length; ei++) {
      const ev = evY[ei];
      const nextY = ei < evY.length - 1 ? evY[ei+1].year : maxY;
      const color = fillForScore(numVal(ev.features[feat]));

      g.append('rect')
        .attr('x', x(ev.year)).attr('y', y)
        .attr('width', Math.max(1, x(nextY) - x(ev.year)))
        .attr('height', lH).attr('fill', color).attr('rx', 2)
        .attr('opacity', isSel ? 0.9 : 0.35)
        .style('cursor','pointer')
        .on('click', function() { showCommentary(ev); })
        .on('mouseenter', function() {
          d3.select(this).attr('opacity', 1).attr('stroke',CSS.text).attr('stroke-width', 1);
        })
        .on('mouseleave', function() {
          d3.select(this).attr('opacity', isSel ? 0.9 : 0.35).attr('stroke','none');
        });
    }
  }

  // Event markers
  evY.forEach(ev => {
    g.append('line')
      .attr('x1', x(ev.year)).attr('x2', x(ev.year))
      .attr('y1', -3).attr('y2', iH)
      .attr('stroke', ev.has_feature_data ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.05)')
      .attr('stroke-width', ev.has_feature_data ? 0.7 : 0.3)
      .attr('stroke-dasharray', ev.has_feature_data ? 'none' : '2,3')
      .attr('pointer-events', 'none');
  });

  // Instruction
  g.append('text').attr('x', W/2).attr('y', iH + 26)
    .attr('text-anchor','middle').attr('fill',CSS.dim).attr('font-size','9px')
    .text('Cliquez sur un segment pour lire le commentaire complet');
}

// ─── Slider ────────────────────────────────────────────────
function initSlider() {
  const sl = document.getElementById('year-slider');
  const disp = document.getElementById('year-display');
  sl.addEventListener('input', () => {
    selYear = parseInt(sl.value);
    disp.textContent = selYear;
    updateMap();
  });
  document.getElementById('play-btn').addEventListener('click', togglePlay);
}

function togglePlay() {
  const btn = document.getElementById('play-btn');
  const sl = document.getElementById('year-slider');
  const disp = document.getElementById('year-display');
  if (playInt) { clearInterval(playInt); playInt = null; btn.classList.remove('playing'); btn.innerHTML = '&#9654;'; return; }
  if (selYear >= 2026) { selYear = 1930; sl.value = 1930; disp.textContent = '1930'; updateMap(); }
  btn.classList.add('playing'); btn.innerHTML = '&#9646;&#9646;';
  playInt = setInterval(() => {
    selYear++;
    if (selYear > 2026) { clearInterval(playInt); playInt = null; btn.classList.remove('playing'); btn.innerHTML = '&#9654;'; return; }
    sl.value = selYear; disp.textContent = selYear; updateMap();
  }, 120);
}

// ─── Heatmap Table ─────────────────────────────────────────
function renderHeatmap() {
  const tbl = document.getElementById('heatmap-table');
  const feats = DATA.features;

  // Build data
  let rows = DATA.feature_matrix.map(r => {
    const total = feats.reduce((s, f) => s + r[f], 0);
    return { ...r, _total: total, _heritage: DATA.colonial_heritage[r.PAYS] || 'other' };
  });

  // Filter
  if (hmFilter !== 'all') rows = rows.filter(r => r._heritage === hmFilter);

  // Sort
  rows.sort((a, b) => {
    const va = hmSort.col === '_total' ? a._total : a[hmSort.col];
    const vb = hmSort.col === '_total' ? b._total : b[hmSort.col];
    return (vb - va) * hmSort.dir;
  });

  let html = '<thead><tr><th>Pays</th>';
  feats.forEach(f => {
    const sorted = hmSort.col === f ? ' sorted' : '';
    html += `<th class="${sorted}" data-col="${f}" title="${DATA.feature_labels[f]}">${HM_SHORT[f] || f}</th>`;
  });
  html += `<th class="${hmSort.col === '_total' ? 'sorted' : ''}" data-col="_total" title="Score total">Total</th>`;
  html += '</tr></thead><tbody>';

  rows.forEach(r => {
    const hDot = `<span class="hm-heritage-dot" style="background:${HC[r._heritage]||HC.other}"></span>`;
    html += `<tr><td data-country="${r.PAYS}">${hDot}${r.PAYS}</td>`;
    feats.forEach(f => {
      const v = r[f + '_label'];
      const bg = v==='V'?CSS.pillBgV:v==='P'?CSS.pillBgP:CSS.pillBgX;
      const c = v==='V'?CSS.pillCv:v==='P'?CSS.pillCp:CSS.pillCx;
      html += `<td style="background:${bg};color:${c}">${v}</td>`;
    });
    html += `<td>${r._total}/20</td></tr>`;
  });

  html += '</tbody>';
  tbl.innerHTML = html;

  // Sort click handlers
  tbl.querySelectorAll('th[data-col]').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      if (hmSort.col === col) hmSort.dir *= -1;
      else { hmSort.col = col; hmSort.dir = -1; }
      renderHeatmap();
    });
  });

  // Country click
  tbl.querySelectorAll('td[data-country]').forEach(td => {
    td.addEventListener('click', () => {
      const c = td.dataset.country;
      openBio(c);
      document.getElementById('bio-panel').scrollIntoView({ behavior:'smooth' });
    });
  });
}

function initHeatmapFilters() {
  document.querySelectorAll('.hm-sort-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.hm-sort-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      hmFilter = b.dataset.hf;
      renderHeatmap();
    });
  });
}

// ─── Divergence Charts ─────────────────────────────────────
function renderDivergence() {
  const grid = document.getElementById('div-grid');
  const hC = { francophone:CSS.francophone, anglophone:CSS.anglophone, lusophone:CSS.lusophone };
  const divTT = document.getElementById('div-tooltip');

  const divAnnotations = {
    'F':   [{year:1990, text:'Le fédéralisme reste une spécificité anglophone — Nigéria, Éthiopie'}],
    'Dc':  [{year:1990, text:'La vague démocratique pousse les francophones à décentraliser massivement'}],
    'Drm': [{year:1990, text:'La démocratisation ne comble pas l\'écart anglophones–francophones sur les minorités'}],
    'La':  [{year:1990, text:'Le multilinguisme officiel reste un marqueur anglophone malgré la démocratisation'}],
    'Drc': [{year:2002, text:'Quelques anglophones inscrivent les droits culturels après la Charte de l\'UA'}],
    'Dpa': [{year:2002, text:'Quasi-absent du continent — aucun État africain signataire de la C169'}],
    'Dis': [{year:1990, text:'La vague démocratique entraîne une adoption quasi universelle'}],
    'Id':  [{year:2002, text:'L\'identité émerge dans les constitutions de 3e génération post-UA'}],
    'Dau': [{year:1990, text:'Rareté structurelle — seules les fédérations prévoient une autonomie réelle'}],
    'PJ':  [{year:2002, text:'Les lusophones rejoignent les anglophones sur le pluralisme juridique'}],
  };

  DATA.features.forEach(feat => {
    const div = document.createElement('div');
    div.className = 'div-chart';
    div.innerHTML = `<div class="dc-title">${DATA.feature_labels[feat]}</div>`;
    grid.appendChild(div);

    const M = { top:6, right:12, bottom:24, left:32 };
    const w = 480, h = 170;

    const svg = d3.select(div).append('svg')
      .attr('viewBox', `0 0 ${w+M.left+M.right} ${h+M.top+M.bottom}`)
      .style('width','100%');

    const g = svg.append('g').attr('transform', `translate(${M.left},${M.top})`);

    const xS = d3.scaleLinear().domain([1960,2026]).range([0,w]);
    const yS = d3.scaleLinear().domain([0,2]).range([h,0]);

    // Axes
    g.append('g').attr('transform', `translate(0,${h})`).call(d3.axisBottom(xS).ticks(6).tickFormat(d => String(d)))
      .selectAll('text').attr('fill',CSS.dim).attr('font-size','9.5px');
    g.append('g').call(d3.axisLeft(yS).ticks(4).tickSize(-w))
      .selectAll('text').attr('fill',CSS.dim).attr('font-size','9.5px');
    g.selectAll('.domain').remove();
    g.selectAll('.tick line').attr('stroke',CSS.axisGrid);

    // Y labels
    g.append('text').attr('x',-4).attr('y',yS(0)+3).attr('text-anchor','end').attr('fill',CSS.dim).attr('font-size','7.5px').text('X');
    g.append('text').attr('x',-4).attr('y',yS(1)+3).attr('text-anchor','end').attr('fill',CSS.dim).attr('font-size','7.5px').text('P');
    g.append('text').attr('x',-4).attr('y',yS(2)+3).attr('text-anchor','end').attr('fill',CSS.dim).attr('font-size','7.5px').text('V');

    // Key event lines
    const events = [
      [1990, 'Démocratisation'],
      [2002, 'UA créée'],
    ];
    events.forEach(([yr, lbl]) => {
      g.append('line').attr('x1',xS(yr)).attr('x2',xS(yr)).attr('y1',0).attr('y2',h)
        .attr('stroke','rgba(0,0,0,0.15)').attr('stroke-width',1).attr('stroke-dasharray','4,3');
      g.append('text').attr('x',xS(yr)+3).attr('y',10).attr('fill',CSS.muted).attr('font-size','8.5px').attr('font-weight','600').text(lbl);
    });

    const line = d3.line().x(d => xS(d[0])).y(d => yS(d[1])).curve(d3.curveBasis);
    const area = d3.area().x(d => xS(d[0])).y0(h).y1(d => yS(d[1])).curve(d3.curveBasis);

    for (const [hg, color] of Object.entries(hC)) {
      const series = DATA.heritage_divergence[feat][hg];
      if (!series) continue;
      g.append('path').datum(series).attr('d',area).attr('fill',color).attr('opacity',0.1);
      g.append('path').datum(series).attr('d',line).attr('fill','none').attr('stroke',color).attr('stroke-width',2.5).attr('opacity',0.85);
    }

    // Interactive overlay with tooltip
    const crossG = g.append('g').style('display','none');
    crossG.append('line').attr('y1',0).attr('y2',h).attr('stroke','rgba(0,0,0,0.2)').attr('stroke-dasharray','3,3');

    g.append('rect').attr('width',w).attr('height',h).attr('fill','transparent')
      .on('mouseenter', () => crossG.style('display',null))
      .on('mouseleave', () => { crossG.style('display','none'); divTT.style.opacity = '0'; })
      .on('mousemove', function(event) {
        const [mx] = d3.pointer(event);
        const yr = Math.max(1960, Math.min(2026, Math.round(xS.invert(mx))));
        const cx = xS(yr);
        crossG.select('line').attr('x1',cx).attr('x2',cx);

        let ttHtml = `<div class="dtt-year">${yr} — ${DATA.feature_labels[feat]}</div>`;
        for (const [hg, color] of Object.entries(hC)) {
          const series = DATA.heritage_divergence[feat][hg];
          if (!series) continue;
          const idx = yr - 1960;
          const val = series[idx] ? series[idx][1] : 0;
          const label = val < 0.5 ? 'Absent' : val < 1.5 ? 'Partiel' : 'Reconnu';
          ttHtml += `<div class="dtt-row"><div class="dtt-dot" style="background:${color}"></div><b>${HL[hg]}</b> : ${val.toFixed(2)} (${label})</div>`;
        }
        // Show contextual annotation near notable events
        const annots = divAnnotations[feat];
        if (annots) {
          for (const a of annots) {
            if (Math.abs(yr - a.year) <= 5) {
              ttHtml += `<div class="dtt-note">${a.text}</div>`;
            }
          }
        }

        divTT.innerHTML = ttHtml;
        divTT.style.opacity = '1';
        divTT.style.left = Math.min(event.clientX + 14, window.innerWidth - 320) + 'px';
        divTT.style.top = (event.clientY - 10) + 'px';
      });
  });
}

// ─── Scatter Plot ──────────────────────────────────────────
function renderScatter() {
  const countries = [];
  for (const row of DATA.feature_matrix) {
    const c = row.PAYS;
    const constScore = DATA.features.reduce((s, f) => s + row[f], 0) / DATA.features.length;
    const rats = DATA.ratif_data[c] || {};
    const treatyCount = DATA.treaties.reduce((s, t) => s + (rats[t] === 'V' ? 1 : 0), 0);
    const treatyScore = (treatyCount / DATA.treaties.length) * 2;
    const h = DATA.colonial_heritage[c] || 'other';
    countries.push({ name:c, constScore, treatyScore, treatyCount, heritage:h });
  }

  const cont = document.getElementById('scatter-container');
  const M = { top:30, right:40, bottom:55, left:60 };
  const w = 720, h = 520;

  const svg = d3.select(cont).append('svg')
    .attr('viewBox', `0 0 ${w+M.left+M.right} ${h+M.top+M.bottom}`)
    .style('max-width','880px');

  const g = svg.append('g').attr('transform', `translate(${M.left},${M.top})`);

  const xS = d3.scaleLinear().domain([0,2.15]).range([0,w]);
  const yS = d3.scaleLinear().domain([0,2.15]).range([h,0]);

  // Grid
  g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(xS).ticks(5))
    .selectAll('text').attr('fill',CSS.dim).attr('font-size','11px');
  g.append('g').call(d3.axisLeft(yS).ticks(5).tickSize(-w))
    .selectAll('text').attr('fill',CSS.dim).attr('font-size','11px');
  g.selectAll('.domain').remove();
  g.selectAll('.tick line').attr('stroke',CSS.axisGrid);

  // Axis labels
  g.append('text').attr('x',w/2).attr('y',h+44).attr('text-anchor','middle').attr('fill',CSS.muted).attr('font-size','11.5px')
    .text('← Moins de traités ratifiés          Traités internationaux ratifiés (normalisé 0–2)          Plus de traités ratifiés →');

  g.append('text').attr('transform','rotate(-90)').attr('x',-h/2).attr('y',-44)
    .attr('text-anchor','middle').attr('fill',CSS.muted).attr('font-size','11.5px')
    .text('← Moins reconnu          Score constitutionnel moyen          Plus reconnu →');

  // Diagonal parity
  g.append('line')
    .attr('x1',xS(0)).attr('y1',yS(0)).attr('x2',xS(2)).attr('y2',yS(2))
    .attr('stroke','rgba(0,0,0,0.12)').attr('stroke-width',1.5).attr('stroke-dasharray','6,4');

  g.append('text').attr('x',xS(0.6)).attr('y',yS(0.7))
    .attr('transform',`rotate(-38, ${xS(0.6)}, ${yS(0.7)})`)
    .attr('fill',CSS.dim).attr('font-size','10px').text('Ligne de parité');

  // Quadrant zones with labels
  // Top-left: high const, low treaties (rare)
  g.append('text').attr('x',xS(0.3)).attr('y',yS(1.9))
    .attr('fill','#a0b0a8').attr('font-size','10px').attr('font-weight','600')
    .text('Reconnaissance sans');
  g.append('text').attr('x',xS(0.3)).attr('y',yS(1.82))
    .attr('fill','#a0b0a8').attr('font-size','10px').attr('font-weight','600')
    .text('engagements internationaux');

  // Top-right: high both (ideal)
  g.append('text').attr('x',xS(1.5)).attr('y',yS(1.95))
    .attr('fill','#88a898').attr('font-size','10.5px').attr('font-weight','700')
    .text('Cohérence maximale');

  // Bottom-right: high treaties, low const (hypocrisy)
  g.append('text').attr('x',xS(1.4)).attr('y',yS(0.35))
    .attr('fill','#b89898').attr('font-size','10.5px').attr('font-weight','700')
    .text('Engagements non');
  g.append('text').attr('x',xS(1.4)).attr('y',yS(0.25))
    .attr('fill','#b89898').attr('font-size','10.5px').attr('font-weight','700')
    .text('concrétisés');

  // Scatter tooltip
  const scTT = d3.select('#scatter-tooltip');

  // Dots
  g.selectAll('circle.scatter-dot').data(countries).join('circle')
    .attr('class','scatter-dot')
    .attr('cx', d => xS(d.treatyScore)).attr('cy', d => yS(d.constScore))
    .attr('r', 5.5)
    .attr('fill', d => HC[d.heritage] || HC.other)
    .attr('opacity', 0.82)
    .attr('stroke','rgba(0,0,0,0.15)').attr('stroke-width',0.5)
    .on('mouseenter', function(ev, d) {
      d3.select(this).attr('r',8).attr('opacity',1);
      scTT.html(
        `<div class="tt-name">${d.name}</div>` +
        `<div style="font-size:0.8rem;margin-top:0.15rem">Score constitutionnel : <b style="color:var(--c2)">${d.constScore.toFixed(2)}</b>/2</div>` +
        `<div style="font-size:0.8rem">Traités ratifiés : <b>${d.treatyCount}</b>/6</div>` +
        `<div style="font-size:0.72rem;color:var(--dim);margin-top:0.15rem">${HL[d.heritage]}</div>`
      ).style('opacity','1').style('left',(ev.clientX+14)+'px').style('top',(ev.clientY-10)+'px');
    })
    .on('mousemove', function(ev) { scTT.style('left',(ev.clientX+14)+'px').style('top',(ev.clientY-10)+'px'); })
    .on('mouseleave', function() { d3.select(this).attr('r',5.5).attr('opacity',0.82); scTT.style('opacity','0'); });

  // Labels for key countries
  const labelSet = new Set([
    'Afrique du Sud','Éthiopie','Kenya','Nigéria','Algérie','Tunisie',
    'Guinée','Soudan du Sud','Rwanda','Botswana','Zimbabwe','Cameroun',
    'Sénégal','Maroc','Guinée-Bissau','Burundi','Somalie','Comores',
  ]);

  const labeled = countries.filter(c => labelSet.has(c.name));
  g.selectAll('text.sl').data(labeled).join('text')
    .attr('x', d => xS(d.treatyScore) + 8)
    .attr('y', d => yS(d.constScore) + 3)
    .attr('fill',CSS.muted).attr('font-size','8.5px')
    .text(d => d.name);
}

// ─── Init ──────────────────────────────────────────────────
renderScale();
buildDimBtns();
buildModeSwitch();
initSlider();
initMap().then(() => {}).catch(err => {
  document.getElementById('loading').innerHTML = `<span style="color:${CSS.anglophone}">Erreur : ${err.message}</span>`;
});
renderHeatmap();
initHeatmapFilters();
renderDivergence();
renderScatter();
