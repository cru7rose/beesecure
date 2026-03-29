import {
  initWbsState,
  getWbs,
  getPhases,
  getProject,
  reloadStateFromStorage,
  totalMonths,
  GRP_COLORS,
  addWorkPackageL1,
  addWorkPackageL2,
  addWorkPackageL3,
  removeWorkPackage,
  renameWorkPackage,
  resetStateToFactory,
  subscribeWbsChanges,
  getDirectChildCodes,
} from './data/wbs-shared.js';

initWbsState();

const COL_W = 200;
let currentMonth = 0;
let pickedCode = null;

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

function syncSliderMax() {
  const sl = document.getElementById('slider');
  if (!sl) return;
  const M = totalMonths();
  sl.max = M;
  if (currentMonth > M) {
    currentMonth = M;
    sl.value = M;
  }
}

function updateMetaLine() {
  const WBS = getWbs();
  const roots = WBS.filter((i) => i.level === 1);
  const l2 = WBS.filter((i) => i.level === 2).length;
  const l3 = WBS.filter((i) => i.level === 3).length;
  const PROJECT = getProject();
  const el = document.getElementById('diagramMetaLine');
  if (el) {
    el.textContent = `Hierarchiczna dekompozycja · ${roots.length} obszarów · ${l2} podpakietów · ${l3} pod-podpakietów · ${totalMonths()} mies. · ${(PROJECT.budget / 1e6).toFixed(2).replace('.', ',')} mln zł`;
  }
}

function renderLegend() {
  const roots = getWbs().filter((i) => i.level === 1);
  const host = document.getElementById('diagramLegend');
  if (!host) return;
  host.innerHTML = roots
    .map((r, gi) => {
      const c = GRP_COLORS[gi % GRP_COLORS.length];
      return `<div class="legend-item"><div class="ld" style="background:${c}"></div>${r.code}. ${escapeHtml(r.name)}</div>`;
    })
    .join('');
  host.innerHTML += `<div class="legend-divider"></div>
    <div class="legend-item"><div class="ld" style="background:#4ecda0"></div>✓ Gotowe</div>
    <div class="legend-item"><div class="ld" style="background:var(--gold)"></div>W toku</div>
    <div class="legend-item"><div class="ld" style="background:rgba(255,255,255,0.12)"></div>Oczekuje</div>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function updateEditorChrome() {
  const item = pickedCode ? getWbs().find((x) => x.code === pickedCode) : null;
  const disp = document.getElementById('editorSelectionDisplay');
  if (disp) {
    if (!item) {
      disp.classList.add('is-empty');
      disp.innerHTML =
        '<span class="sel-empty-icon">◇</span> Kliknij blok na diagramie albo wpisz <strong>kod</strong> w polu obok (np. <code>3.1</code>, <code>3.1.2</code>).';
    } else {
      disp.classList.remove('is-empty');
      const lvl =
        item.level === 1 ? 'Obszar · L1' : item.level === 2 ? 'Podpakiet · L2' : 'Pod-podpakiet · L3';
      disp.innerHTML = `<div class="sel-head"><span class="sel-code">${escapeHtml(item.code)}</span><span class="sel-lvl">${lvl}</span></div><div class="sel-name">${escapeHtml(item.name)}</div>`;
    }
  }
  const btn2 = document.getElementById('btnAddL2');
  const btn3 = document.getElementById('btnAddL3');
  if (btn2) btn2.disabled = !(item && item.level === 1);
  if (btn3) btn3.disabled = !(item && item.level === 2);
  const canEdit = !!item;
  const btnRen = document.getElementById('btnRename');
  const btnRm = document.getElementById('btnRemove');
  if (btnRen) btnRen.disabled = !canEdit;
  if (btnRm) btnRm.disabled = !canEdit;
}

function pbadgeHtml(st, pct, small) {
  const sm = small ? ' style="font-size:8px;padding:1px 5px"' : '';
  if (st === 'done') return `<span class="pbadge pb-done"${sm}>✓</span>`;
  if (st === 'active') return `<span class="pbadge pb-act"${sm}>${pct}%</span>`;
  return '';
}

function render() {
  syncSliderMax();
  updateMetaLine();
  renderLegend();
  updateEditorChrome();
  const WBS = getWbs();
  const ov = overall(currentMonth);
  document.getElementById('bigProg').textContent = `M${currentMonth} – ${ov}%`;
  document.getElementById('progChip').textContent = ov + '%';

  const roots = WBS.filter((i) => i.level === 1);
  const n = roots.length;

  let h = '<div class="tree-root-wrap">';

  const PROJECT = getProject();
  h += `<div class="root-box">
    🔑 BeeSecure – KeyLock
    <div class="root-sub">${totalMonths()} miesięcy &nbsp;·&nbsp; ${(PROJECT.budget / 1e6).toFixed(2).replace('.', ',')} mln zł &nbsp;·&nbsp; ~${PROJECT.dev + PROJECT.eng + PROJECT.mgmt} osób &nbsp;·&nbsp; Partner: EasyRentals</div>
  </div>`;

  h += `<div class="vline" style="width:2px;height:32px"></div>`;

  const barW = Math.max(n * COL_W - 10, 200);
  h += `<div style="position:relative;width:${barW}px">`;
  h += `<div class="hline" style="width:100%"></div>`;
  roots.forEach((_, i) => {
    const lp = ((i + 0.5) / n) * 100;
    h += `<div class="vline" style="position:absolute;top:0;left:${lp.toFixed(2)}%;transform:translateX(-50%);width:2px;height:18px"></div>`;
  });
  h += `</div>`;

  h += `<div class="l1-row">`;
  roots.forEach((root, gi) => {
    const c = GRP_COLORS[gi % GRP_COLORS.length];
    const rPct = iProg(root, currentMonth);
    const rSt = iStat(root, currentMonth);
    const cs = getDirectChildCodes(WBS, root.code);
    const pickL1 = pickedCode === root.code ? ' diagram-picked' : '';

    h += `<div class="l1-col" style="width:${COL_W}px">`;

    h += `<div class="l1-box${pickL1}" style="width:${COL_W - 10}px;background:${c}24;border-color:${c}70;color:${c}f0"
      onmouseenter="tipShow(event,'${root.code}','${root.name.replace(/'/g, "\\'")}',${rPct},'${rSt}')"
      onmouseleave="tipHide()" onclick="pickWp('${root.code}')">
      <div class="l1-code">${root.code}</div>
      ${root.name}
      ${pbadgeHtml(rSt, rPct, false)}
      <div class="pbar" style="width:${rPct}%;background:${c}bb"></div>
    </div>`;

    if (cs.length) {
      h += `<div class="vline" style="width:2px;height:16px;background:${c}50"></div>`;
      h += `<div class="l2-list" style="width:${COL_W - 10}px">`;
      cs.forEach((k) => {
        const kPct = iProg(k, currentMonth);
        const kSt = iStat(k, currentMonth);
        const pickL2 = pickedCode === k.code ? ' diagram-picked' : '';
        const l3s = getDirectChildCodes(WBS, k.code);
        h += `<div class="l2-stack">`;
        h += `<div class="l2-box${pickL2}" style="width:${COL_W - 10}px;background:${c}12;border-color:${c}48;color:${c}d8"
          onmouseenter="tipShow(event,'${k.code}','${k.name.replace(/'/g, "\\'")}',${kPct},'${kSt}')"
          onmouseleave="tipHide()" onclick="pickWp('${k.code}')">
          <div class="l2-code">${k.code}</div>
          ${k.name}
          ${pbadgeHtml(kSt, kPct, true)}
          <div class="pbar" style="width:${kPct}%;background:${c}80"></div>
        </div>`;
        if (l3s.length) {
          h += `<div class="l3-list">`;
          l3s.forEach((z) => {
            const zPct = iProg(z, currentMonth);
            const zSt = iStat(z, currentMonth);
            const pickL3 = pickedCode === z.code ? ' diagram-picked' : '';
            h += `<div class="l3-box${pickL3}" style="background:${c}0a;border-color:${c}36;color:${c}c8"
              onmouseenter="tipShow(event,'${z.code}','${z.name.replace(/'/g, "\\'")}',${zPct},'${zSt}')"
              onmouseleave="tipHide()" onclick="pickWp('${z.code}')">
              <div class="l3-code">${z.code}</div>
              ${z.name}
              ${pbadgeHtml(zSt, zPct, true)}
              <div class="pbar" style="width:${zPct}%;background:${c}70"></div>
            </div>`;
          });
          h += `</div>`;
        }
        h += `</div>`;
      });
      h += `</div>`;
    }

    h += `</div>`;
  });
  h += `</div></div>`;

  document.getElementById('blockTree').innerHTML = h;
}

function updateTime(val) {
  currentMonth = parseInt(val, 10);
  const M = totalMonths();
  const sl = document.getElementById('slider');
  sl.style.setProperty('--pct', ((currentMonth / M) * 100).toFixed(1) + '%');
  document.getElementById('timeBadge').textContent = currentMonth === 0 ? 'Start' : `Miesiąc ${currentMonth}`;
  const ph = phaseAt(currentMonth);
  const pp = document.getElementById('phasePill');
  pp.style.borderColor = ph.color;
  pp.style.color = ph.color;
  pp.textContent = '▶ ' + ph.short;
  render();
}

function tipShow(e, code, name, pct, st) {
  const t = document.getElementById('tip');
  const item = getWbs().find((i) => i.code === code);
  const stLbl = st === 'done' ? '✓ Gotowe' : st === 'active' ? `W toku – ${pct}%` : 'Oczekuje';
  const dur = (item?.end || 0) - (item?.start || 0);
  const lvl = item?.level === 3 ? 'L3' : item?.level === 2 ? 'L2' : 'L1';
  t.innerHTML = `<strong>${code} – ${name}</strong><span class="tip-meta">${lvl}</span>Status: ${stLbl}<br>Czas: M${(item?.start || 0) + 1} – M${item?.end || 0} &nbsp;(${dur} mies.)`;
  t.classList.add('on');
  tipMove(e);
}
function tipHide() {
  document.getElementById('tip').classList.remove('on');
}
function tipMove(e) {
  const t = document.getElementById('tip');
  t.style.left = e.clientX + 16 + 'px';
  t.style.top = e.clientY - 10 + 'px';
}
document.addEventListener('mousemove', (e) => {
  if (document.getElementById('tip').classList.contains('on')) tipMove(e);
});

function pickWp(code) {
  pickedCode = pickedCode === code ? null : code;
  const inp = document.getElementById('wpPickedLabel');
  if (inp) inp.value = pickedCode || '';
  render();
}

function editorSyncPickInput() {
  const raw = (document.getElementById('wpPickedLabel')?.value || '').trim();
  if (!raw) {
    pickedCode = null;
    render();
    return;
  }
  const item = getWbs().find((x) => x.code === raw);
  pickedCode = item ? item.code : null;
  render();
}

function newNameValue() {
  return (document.getElementById('wpNewName')?.value || '').trim();
}

function editorAddL1() {
  addWorkPackageL1(newNameValue());
  const el = document.getElementById('wpNewName');
  if (el) el.value = '';
  pickedCode = null;
  const lab = document.getElementById('wpPickedLabel');
  if (lab) lab.value = '';
}

function editorAddL2() {
  const parent = pickedCode;
  const p = parent ? getWbs().find((x) => x.code === parent && x.level === 1) : null;
  if (!p) return;
  addWorkPackageL2(parent, newNameValue());
  const el = document.getElementById('wpNewName');
  if (el) el.value = '';
}

function editorAddL3() {
  const parent = pickedCode;
  const p = parent ? getWbs().find((x) => x.code === parent && x.level === 2) : null;
  if (!p) return;
  addWorkPackageL3(parent, newNameValue());
  const el = document.getElementById('wpNewName');
  if (el) el.value = '';
}

function pickedOrInputCode() {
  return (document.getElementById('wpPickedLabel')?.value || pickedCode || '').trim();
}

function editorRemove() {
  const code = pickedOrInputCode();
  if (!code || code === '0') return;
  if (!confirm(`Usunąć „${code}” wraz z całym podziałem (wszystkie poziomy pod spodem)?`)) return;
  removeWorkPackage(code);
  pickedCode = null;
  const lab = document.getElementById('wpPickedLabel');
  if (lab) lab.value = '';
}

function editorRename() {
  const code = pickedOrInputCode();
  const name = document.getElementById('wpRenameName')?.value || '';
  if (!code || code === '0') return;
  if (!name.trim()) return;
  renameWorkPackage(code, name.trim());
  document.getElementById('wpRenameName').value = '';
}

function editorResetWbs() {
  if (!confirm('Przywrócić domyślną strukturę WBS (z przykładowymi L3) i zsynchronizować z harmonogramem?')) return;
  pickedCode = null;
  const lab = document.getElementById('wpPickedLabel');
  if (lab) lab.value = '';
  currentMonth = 0;
  const sl = document.getElementById('slider');
  if (sl) sl.value = 0;
  resetStateToFactory();
  updateTime(0);
}

subscribeWbsChanges(() => {
  reloadStateFromStorage();
  updateTime(currentMonth);
});

Object.assign(window, {
  updateTime,
  tipShow,
  tipHide,
  tipMove,
  pickWp,
  editorSyncPickInput,
  editorAddL1,
  editorAddL2,
  editorAddL3,
  editorRemove,
  editorRename,
  editorResetWbs,
});

updateTime(0);
