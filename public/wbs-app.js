import {
  initWbsState,
  getWbs,
  getPhases,
  getProject,
  saveState,
  rescaleWbsToProjectTimeline,
  syncPhaseEndsFromProject,
  resetStateToFactory,
  reloadStateFromStorage,
  subscribeWbsChanges,
  totalMonths,
  GRP_COLORS,
} from './data/wbs-shared.js';

initWbsState();

function MONTHS() {
  return totalMonths();
}

let currentMonth = 0;
let selectedCode = null;

function phaseAt(m) {
  const PHASES = getPhases();
  for (const p of [...PHASES].reverse()) if (m >= p.start) return p;
  return PHASES[0];
}
function iProg(item, m) {
  if (m <= item.start) return 0;
  if (m >= item.end) return 100;
  return Math.round(((m - item.start) / (item.end - item.start)) * 100);
}
function iStat(item, m) {
  if (m >= item.end) return 'done';
  if (m > item.start) return 'active';
  return 'pending';
}
function overall(m) {
  const WBS = getWbs();
  const w = WBS.map((i) => i.end - i.start);
  const tw = w.reduce((a, b) => a + b, 0);
  return Math.round(WBS.reduce((s, it, ix) => s + (iProg(it, m) / 100) * w[ix], 0) / tw * 100);
}
function phColor(phase) {
  return getPhases().find((p) => p.id === phase)?.color || '#888';
}

/* ── TABS ── */
function switchTab(tab) {
  document.querySelectorAll('.nav-tab').forEach((t) => t.classList.remove('active'));
  document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.getElementById('page-' + tab).classList.add('active');
  if (tab === 'tree') renderBlockTree();
}

/* ── WBS LIST ── */
function renderWBS() {
  const WBS = getWbs();
  document.getElementById('wbsTree').innerHTML = WBS.map((item) => {
    const st = iStat(item, currentMonth);
    const pct = iProg(item, currentMonth);
    let pc = 'prog-pending';
    let pl = 'Oczekuje';
    if (st === 'done') {
      pc = 'prog-done';
      pl = '✓';
    } else if (st === 'active') {
      pc = 'prog-active';
      pl = pct + '%';
    }
    return `<div class="wbs-item level${item.level}${selectedCode === item.code ? ' active' : ''}" onclick="sel('${item.code}')">
      <span class="wbs-code">${item.code}</span>
      <span class="wbs-name">${item.name}</span>
      ${item.level < 3 ? `<span class="progress-pill ${pc}">${pl}</span>` : ''}
    </div>`;
  }).join('');
}

/* ── GANTT ── */
function renderGantt() {
  const el = document.getElementById('ganttPanel');
  const WBS = getWbs();
  const PHASES = getPhases();
  const M = MONTHS();
  const p100 = 100 / M;
  const labs = Array.from({ length: M }, (_, i) => i + 1);
  const mPh = labs.map((m) => {
    for (const p of [...PHASES].reverse()) if (m > p.start) return p;
    return PHASES[0];
  });
  let h = `<div style="min-width:660px">`;
  h += `<div class="gantt-header"><div class="gantt-label-col">Pakiet prac</div><div class="gantt-months">`;
  labs.forEach((m, i) => {
    const cur = m === currentMonth;
    h += `<div class="gantt-month${cur ? ' current' : ''}" style="color:${cur ? 'var(--gold)' : mPh[i].color + '88'}">${m}</div>`;
  });
  h += `</div></div>`;
  h += `<div class="gantt-phase-row"><div class="gantt-phase-label" style="color:var(--text-muted)">Fazy</div><div class="gantt-phase-bar-row">`;
  for (let m = 0; m <= M; m++) h += `<div class="gantt-grid-line" style="left:${m * p100}%"></div>`;
  h += `<div class="today-line" style="left:${currentMonth * p100}%" data-month="${currentMonth}"></div>`;
  PHASES.forEach((p) => {
    h += `<div class="gantt-phase-span" style="left:${p.start * p100}%;width:${(p.end - p.start) * p100}%;background:${p.color}22;border:1px solid ${p.color}44;color:${p.color}">${p.short}</div>`;
  });
  h += `</div></div>`;
  WBS.forEach((item) => {
    const st = iStat(item, currentMonth);
    const pct = iProg(item, currentMonth);
    const c = phColor(item.phase);
    const l1 = item.level === 1;
    h += `<div class="gantt-row" onclick="sel('${item.code}')" style="${l1 ? 'background:' + c + '08' : ''} ${selectedCode === item.code ? 'background:' + c + '14;' : ''}">
      <div class="gantt-row-label" style="${l1 ? 'color:' + c + ';font-weight:500' : 'font-size:9px;color:var(--text-muted)'}"><span style="color:var(--text-muted);font-size:8px">${item.code}</span> ${item.name}</div>
      <div class="gantt-bar-area">`;
    for (let m = 0; m <= M; m++) h += `<div class="gantt-grid-line" style="left:${m * p100}%"></div>`;
    h += `<div class="today-line" style="left:${currentMonth * p100}%" data-month="${currentMonth}"></div>`;
    h += `<div class="gantt-bar" style="left:${item.start * p100}%;width:${(item.end - item.start) * p100}%;min-width:2px">
      <div class="gantt-bar-bg" style="background:${c}18;border:1px solid ${c}33"></div>
      <div class="gantt-bar-progress" style="width:${pct}%;background:${st === 'done' ? c + 'cc' : c + '55'}"></div>
      <div class="gantt-bar-label">${st === 'done' ? '✓ ' : st === 'active' ? pct + '% ' : ''}</div></div>`;
    h += `</div></div>`;
  });
  h += `</div>`;
  el.innerHTML = h;
}

/* ── BLOCK TREE ── */
function renderBlockTree() {
  const WBS = getWbs();
  const ov = overall(currentMonth);
  document.getElementById('tree-prog').textContent = `M${currentMonth} – ${ov}%`;
  const roots = WBS.filter((i) => i.level === 1);
  const kids = (code) => WBS.filter((i) => i.level === 2 && i.code.startsWith(code + '.'));

  let h = `<div class="tree-root">`;
  const PROJECT = getProject();
  h += `<div class="root-box" onclick="sel('0')">🔑 BeeSecure – KeyLock
    <div class="root-sub">${MONTHS()} miesięcy • ${(PROJECT.budget / 1000000).toFixed(1)} mln zł • ~${PROJECT.dev + PROJECT.eng + PROJECT.mgmt} osób</div>
  </div>`;
  h += `<div class="tree-vline"></div>`;

  const n = roots.length;
  const colW = 154;
  const lineW = n * colW;
  h += `<div style="position:relative;width:${lineW}px;height:2px;background:rgba(212,160,23,0.2)">`;
  roots.forEach((_, i) => {
    h += `<div style="position:absolute;top:0;left:${((i + 0.5) / n * 100).toFixed(2)}%;width:2px;height:12px;background:rgba(212,160,23,0.2);transform:translateX(-50%)"></div>`;
  });
  h += `</div>`;

  h += `<div class="l1-row">`;
  roots.forEach((root, gi) => {
    const c = GRP_COLORS[gi % GRP_COLORS.length];
    const rPct = iProg(root, currentMonth);
    const rSt = iStat(root, currentMonth);
    const cs = kids(root.code);
    h += `<div class="l1-col">`;
    h += `<div class="l1-box" style="background:${c}1a;border:1px solid ${c}55;color:${c}cc"
      onmouseenter="tip(event,'${root.code}','${root.name.replace(/'/g, "\\'")}',${rPct},'${rSt}')"
      onmouseleave="tipHide()" onclick="sel('${root.code}')">
      <div class="l1-code">${root.code}</div>${root.name}
      ${rSt === 'done' ? `<span class="pbadge pb-done">✓</span>` : rSt === 'active' ? `<span class="pbadge pb-act">${rPct}%</span>` : ''}
      <div class="pbar" style="width:${rPct}%;background:${c}88"></div>
    </div>`;
    if (cs.length) {
      h += `<div class="l1-tick2" style="background:${c}44"></div>`;
      h += `<div class="l2-list">`;
      cs.forEach((k) => {
        const kPct = iProg(k, currentMonth);
        const kSt = iStat(k, currentMonth);
        h += `<div class="l2-box" style="background:${c}0d;border:1px solid ${c}33;color:${c}aa"
          onmouseenter="tip(event,'${k.code}','${k.name.replace(/'/g, "\\'")}',${kPct},'${kSt}')"
          onmouseleave="tipHide()" onclick="sel('${k.code}')">
          <div class="l2-code">${k.code}</div>${k.name}
          ${kSt === 'done' ? `<span class="pbadge pb-done" style="font-size:6px">✓</span>` : kSt === 'active' ? `<span class="pbadge pb-act" style="font-size:6px">${kPct}%</span>` : ''}
          <div class="pbar" style="width:${kPct}%;background:${c}66"></div>
        </div>`;
      });
      h += `</div>`;
    }
    h += `</div>`;
  });
  h += `</div></div>`;
  document.getElementById('blockTree').innerHTML = h;
}

/* ── TOOLTIP ── */
function tip(e, code, name, pct, st) {
  const t = document.getElementById('tip');
  const item = getWbs().find((i) => i.code === code);
  const stLbl = st === 'done' ? '✓ Gotowe' : st === 'active' ? `W toku – ${pct}%` : 'Oczekuje';
  t.innerHTML = `<strong>${code} – ${name}</strong>Status: ${stLbl}<br>Czas: M${(item?.start || 0) + 1}–M${item?.end || 0} (${(item?.end || 0) - (item?.start || 0)} mies.)`;
  t.classList.add('on');
  tipMove(e);
}
function tipHide() {
  document.getElementById('tip').classList.remove('on');
}
function tipMove(e) {
  const t = document.getElementById('tip');
  t.style.left = e.clientX + 12 + 'px';
  t.style.top = e.clientY - 8 + 'px';
}
document.addEventListener('mousemove', (e) => {
  if (document.getElementById('tip').classList.contains('on')) tipMove(e);
});

/* ── SELECT ── */
function sel(code) {
  selectedCode = selectedCode === code ? null : code;
  const item = getWbs().find((i) => i.code === code);
  if (item) {
    const ph = getPhases().find((p) => p.id === item.phase);
    document.getElementById('phaseDesc').textContent = ph ? ph.desc : '';
  }
  renderWBS();
  renderGantt();
  if (document.getElementById('page-tree').classList.contains('active')) renderBlockTree();
}

/* ── UPDATE TIME ── */
function updateTime(val) {
  currentMonth = parseInt(val, 10);
  const M = MONTHS();
  const sl = document.getElementById('timeSlider');
  sl.style.setProperty('--pct', ((currentMonth / M) * 100).toFixed(1) + '%');
  document.getElementById('timeBadge').textContent = currentMonth === 0 ? 'Start' : `Miesiąc ${currentMonth}`;
  document.getElementById('stat-month').textContent = 'M' + currentMonth;
  const ph = phaseAt(currentMonth);
  const pb = document.getElementById('phaseBadge');
  pb.style.borderColor = ph.color;
  pb.style.color = ph.color;
  pb.textContent = '▶ ' + ph.short;
  document.getElementById('stat-phase').textContent = 'Faza ' + ph.id;
  document.getElementById('phaseDesc').textContent = ph.desc;
  const ov = overall(currentMonth);
  document.getElementById('stat-done').textContent = ov + '%';
  const circ = 2 * Math.PI * 38;
  document.getElementById('ringArc').setAttribute('stroke-dasharray', `${(circ * ov / 100).toFixed(1)} ${circ.toFixed(1)}`);
  document.getElementById('ringPct').textContent = ov + '%';
  renderWBS();
  renderGantt();
  if (document.getElementById('page-tree').classList.contains('active')) renderBlockTree();
}

/* ── SETTINGS ── */
function openSettings() {
  document.getElementById('sOverlay').classList.add('open');
  syncInputs();
}
function closeSettings() {
  document.getElementById('sOverlay').classList.remove('open');
}
function handleOverlayClick(e) {
  if (e.target === document.getElementById('sOverlay')) closeSettings();
}
function syncInputs() {
  const PROJECT = getProject();
  ['budget', 'reserve', 'f1', 'f2', 'f3', 'f4', 'dev', 'eng', 'mgmt'].forEach((k) => {
    document.getElementById('inp-' + k).value = PROJECT[k];
  });
  refreshPreviews();
}
function refreshPreviews() {
  const b = +document.getElementById('inp-budget').value || 1500000;
  const r = +document.getElementById('inp-reserve').value || 10;
  const f1 = +document.getElementById('inp-f1').value || 6;
  const f2 = +document.getElementById('inp-f2').value || 8;
  const f3 = +document.getElementById('inp-f3').value || 6;
  const f4 = +document.getElementById('inp-f4').value || 4;
  const dv = +document.getElementById('inp-dev').value || 5;
  const en = +document.getElementById('inp-eng').value || 10;
  const mg = +document.getElementById('inp-mgmt').value || 10;
  const tot = dv + en + mg;
  const tm = f1 + f2 + f3 + f4;
  const op = Math.round(b * (1 - r / 100));
  const rs = Math.round(b * r / 100);
  document.getElementById('budget-mln').textContent = (b / 1e6).toFixed(2).replace('.', ',') + ' mln zł';
  document.getElementById('total-months-preview').textContent = tm + ' miesięcy';
  document.getElementById('total-team-preview').textContent = tot + ' osób';
  document.getElementById('cost-op').textContent = op.toLocaleString('pl-PL') + ' zł';
  document.getElementById('cost-res').textContent = rs.toLocaleString('pl-PL') + ' zł';
  document.getElementById('cost-per-person').textContent = (tot > 0 ? Math.round(op / tot / tm) : 0).toLocaleString('pl-PL') + ' zł';
}
['budget', 'reserve', 'f1', 'f2', 'f3', 'f4', 'dev', 'eng', 'mgmt'].forEach((k) => {
  setTimeout(() => {
    const el = document.getElementById('inp-' + k);
    if (el) el.addEventListener('input', refreshPreviews);
  }, 50);
});

function applySettings() {
  const PROJECT = getProject();
  ['budget', 'reserve', 'f1', 'f2', 'f3', 'f4', 'dev', 'eng', 'mgmt'].forEach((k) => {
    PROJECT[k] = +document.getElementById('inp-' + k).value || PROJECT[k];
  });
  const T = MONTHS();
  const tot = PROJECT.dev + PROJECT.eng + PROJECT.mgmt;
  const mln = (PROJECT.budget / 1e6).toFixed(2).replace('.', ',') + ' mln zł';
  document.getElementById('stat-budget').textContent = mln;
  document.getElementById('stat-team').textContent = tot;
  document.getElementById('detail-budget').textContent = mln;
  document.getElementById('detail-time').textContent = T + ' miesięcy';
  document.getElementById('detail-team').textContent = '~' + tot + ' osób';
  syncPhaseEndsFromProject();
  rescaleWbsToProjectTimeline();
  saveState();
  const sl = document.getElementById('timeSlider');
  sl.max = T;
  if (currentMonth > T) {
    currentMonth = T;
    sl.value = T;
  }
  updateTime(currentMonth);
  closeSettings();
}

function resetSettings() {
  resetStateToFactory();
  document.getElementById('timeSlider').max = MONTHS();
  syncInputs();
  updateTime(0);
}

Object.assign(window, {
  switchTab,
  openSettings,
  closeSettings,
  handleOverlayClick,
  updateTime,
  sel,
  tip,
  tipHide,
  applySettings,
  resetSettings,
});

subscribeWbsChanges(() => {
  reloadStateFromStorage();
  const sl = document.getElementById('timeSlider');
  const T = MONTHS();
  sl.max = T;
  if (currentMonth > T) {
    currentMonth = T;
    sl.value = T;
  }
  syncInputs();
  updateTime(currentMonth);
});

updateTime(0);
