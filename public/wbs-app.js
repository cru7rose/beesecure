const PHASES = [
  { id:1, label:'Faza 1 – Projektowanie', short:'F1', start:0, end:6, color:'#3B8BD4', desc:'Projektowanie i prototypowanie: architektura systemu, projekt PCB, zamek i gateway (miesiące 1–6).' },
  { id:2, label:'Faza 2 – Testy & Certyfikacja', short:'F2', start:6, end:14, color:'#1D9E75', desc:'Testy jednostkowe i integracyjne, certyfikacja ZigBee i normy bezpieczeństwa (miesiące 7–14).' },
  { id:3, label:'Faza 3 – Wdrożenie pilotażowe', short:'F3', start:14, end:20, color:'#D85A30', desc:'Uruchomienie systemu u pierwszych klientów, zbieranie feedbacku (miesiące 15–20).' },
  { id:4, label:'Faza 4 – Pełne wdrożenie', short:'F4', start:20, end:24, color:'#9B59B6', desc:'Wprowadzenie na rynek, zarządzanie 1000+ lokalizacji z panelu webowego (miesiące 21–24).' },
];

const WBS = [
  { code:'1', name:'Zamek Elektroniczny', level:1, start:0, end:8, phase:1 },
    { code:'1.1', name:'Projekt PCB i elektroniki', level:2, start:0, end:4, phase:1 },
    { code:'1.2', name:'Moduł ZigBee', level:2, start:1, end:5, phase:1 },
    { code:'1.3', name:'Pinpad i interfejs użytkownika', level:2, start:2, end:6, phase:1 },
    { code:'1.4', name:'Zasilanie bateryjne i klucz awaryjny', level:2, start:3, end:7, phase:1 },
    { code:'1.5', name:'Obudowa i mechanika', level:2, start:4, end:8, phase:1 },
  { code:'2', name:'Gateway Komunikacyjny', level:1, start:0, end:7, phase:1 },
    { code:'2.1', name:'Projekt PCB gateway', level:2, start:0, end:3, phase:1 },
    { code:'2.2', name:'Integracja sieci ZigBee', level:2, start:1, end:5, phase:1 },
    { code:'2.3', name:'Moduł komunikacji serwer–urządzenie', level:2, start:2, end:6, phase:1 },
    { code:'2.4', name:'Integracja z siecią domową', level:2, start:3, end:7, phase:1 },
  { code:'3', name:'Aplikacja Webowa', level:1, start:2, end:16, phase:1 },
    { code:'3.1', name:'Architektura systemu i backend', level:2, start:2, end:8, phase:1 },
    { code:'3.2', name:'Panel zarządzania dostępem', level:2, start:5, end:12, phase:2 },
    { code:'3.3', name:'Moduł zarządzania serwisantami', level:2, start:7, end:13, phase:2 },
    { code:'3.4', name:'Zdalne administrowanie i monitoring', level:2, start:8, end:14, phase:2 },
    { code:'3.5', name:'Interfejs użytkownika (UI/UX)', level:2, start:10, end:16, phase:2 },
  { code:'4', name:'Algorytm Rotacyjny Kluczy', level:1, start:1, end:11, phase:1 },
    { code:'4.1', name:'Implementacja 12-cyfrowego seed', level:2, start:1, end:5, phase:1 },
    { code:'4.2', name:'Mechanizm synchronizacji zamek–serwer', level:2, start:3, end:7, phase:1 },
    { code:'4.3', name:'Generowanie kodów czasowych', level:2, start:4, end:8, phase:2 },
    { code:'4.4', name:'Jednorazowe kody serwisowe', level:2, start:6, end:9, phase:2 },
    { code:'4.5', name:'Autoryzacja lokalna (offline)', level:2, start:7, end:11, phase:2 },
  { code:'5', name:'Testy i Certyfikacja', level:1, start:6, end:14, phase:2 },
    { code:'5.1', name:'Testy jednostkowe i integracyjne', level:2, start:6, end:10, phase:2 },
    { code:'5.2', name:'Testy bezpieczeństwa i penetracyjne', level:2, start:8, end:12, phase:2 },
    { code:'5.3', name:'Certyfikacja ZigBee', level:2, start:9, end:13, phase:2 },
    { code:'5.4', name:'Certyfikacja norm bezpieczeństwa', level:2, start:10, end:14, phase:2 },
    { code:'5.5', name:'Testy użyteczności (usability)', level:2, start:11, end:14, phase:2 },
  { code:'6', name:'Wdrożenie i Skalowanie', level:1, start:14, end:24, phase:3 },
    { code:'6.1', name:'Wdrożenie pilotażowe', level:2, start:14, end:17, phase:3 },
    { code:'6.2', name:'Zbieranie feedbacku i iteracja', level:2, start:16, end:20, phase:3 },
    { code:'6.3', name:'Pełne wdrożenie produkcyjne', level:2, start:19, end:23, phase:4 },
    { code:'6.4', name:'Panel 1000+ lokalizacji', level:2, start:20, end:24, phase:4 },
    { code:'6.5', name:'Szkolenia i dokumentacja', level:2, start:21, end:24, phase:4 },
  { code:'7', name:'Zarządzanie Projektem', level:1, start:0, end:24, phase:1 },
    { code:'7.1', name:'Planowanie i harmonogramowanie', level:2, start:0, end:6, phase:1 },
    { code:'7.2', name:'Zarządzanie ryzykiem', level:2, start:0, end:24, phase:1 },
    { code:'7.3', name:'Komunikacja z partnerem EasyRentals', level:2, start:2, end:24, phase:1 },
    { code:'7.4', name:'Raportowanie i kontrola budżetu', level:2, start:4, end:24, phase:1 },
    { code:'7.5', name:'Zarządzanie dostawcami', level:2, start:0, end:14, phase:1 },
];

const WBS_BASE = WBS.map(i => ({ start: i.start, end: i.end }));
let currentMonth = 0;
let selectedCode = null;

let PROJECT = { budget:1500000, reserve:10, f1:6, f2:8, f3:6, f4:4, dev:5, eng:10, mgmt:10 };
const DEFAULTS = { ...PROJECT };

function MONTHS() { return PROJECT.f1 + PROJECT.f2 + PROJECT.f3 + PROJECT.f4; }
function getTotalMonths() { return MONTHS(); }

function phaseAt(m) {
  for (const p of [...PHASES].reverse()) if (m >= p.start) return p;
  return PHASES[0];
}
function itemProgress(item, month) {
  if (month <= item.start) return 0;
  if (month >= item.end) return 100;
  return Math.round((month - item.start) / (item.end - item.start) * 100);
}
function itemStatus(item, month) {
  if (month >= item.end) return 'done';
  if (month > item.start) return 'active';
  return 'pending';
}
function overallProgress(month) {
  const weights = WBS.map(i => i.end - i.start);
  const totalW = weights.reduce((a,b) => a+b, 0);
  let done = 0;
  WBS.forEach((item, idx) => { done += itemProgress(item, month) / 100 * weights[idx]; });
  return Math.round(done / totalW * 100);
}
function getPhaseColor(phase) { return PHASES.find(p => p.id === phase)?.color || '#888'; }

function renderWBS() {
  document.getElementById('wbsTree').innerHTML = WBS.map(item => {
    const status = itemStatus(item, currentMonth);
    const pct = itemProgress(item, currentMonth);
    let pillClass = 'prog-pending', pillLabel = 'Oczekuje';
    if (status === 'done') { pillClass = 'prog-done'; pillLabel = '✓ Gotowe'; }
    else if (status === 'active') { pillClass = 'prog-active'; pillLabel = pct + '%'; }
    return `<div class="wbs-item level${item.level} ${selectedCode===item.code?'active':''}" onclick="selectItem('${item.code}')">
      <span class="wbs-code">${item.code}</span>
      <span class="wbs-name">${item.name}</span>
      ${item.level < 3 ? `<span class="progress-pill ${pillClass}">${pillLabel}</span>` : ''}
    </div>`;
  }).join('');
}

function renderGantt() {
  const M = MONTHS();
  const pct100 = 100 / M;
  const monthLabels = Array.from({length:M}, (_,i) => i+1);
  const monthPhase = monthLabels.map(m => { for (const p of [...PHASES].reverse()) if (m > p.start) return p; return PHASES[0]; });
  let html = `<div style="min-width:800px">`;
  html += `<div class="gantt-header"><div class="gantt-label-col">Pakiet prac</div><div class="gantt-months">`;
  monthLabels.forEach((m,i) => { const ph = monthPhase[i]; const cur = m===currentMonth; html += `<div class="gantt-month ${cur?'current':''}" style="color:${cur?'var(--gold)':ph.color+'88'}">${m}</div>`; });
  html += `</div></div>`;
  html += `<div class="gantt-phase-row"><div class="gantt-phase-label" style="color:var(--text-muted)">Fazy</div><div class="gantt-phase-bar-row">`;
  for (let m=0;m<=M;m++) html += `<div class="gantt-grid-line" style="left:${m*pct100}%"></div>`;
  html += `<div class="today-line" style="left:${currentMonth*pct100}%" data-month="${currentMonth}"></div>`;
  PHASES.forEach(p => { html += `<div class="gantt-phase-span" style="left:${p.start*pct100}%;width:${(p.end-p.start)*pct100}%;background:${p.color}22;border:1px solid ${p.color}44;color:${p.color}">${p.short}</div>`; });
  html += `</div></div>`;
  WBS.forEach(item => {
    const status = itemStatus(item, currentMonth);
    const pct = itemProgress(item, currentMonth);
    const color = getPhaseColor(item.phase);
    const isL1 = item.level === 1;
    html += `<div class="gantt-row" onclick="selectItem('${item.code}')" style="${isL1?'background:'+color+'08':''} ${selectedCode===item.code?'background:'+color+'14;':''}">
      <div class="gantt-row-label" style="${isL1?'color:'+color+';font-weight:500':'font-size:11px;color:var(--text-muted)'}"><span style="color:var(--text-muted);font-size:10px">${item.code}</span> ${item.name}</div>
      <div class="gantt-bar-area">`;
    for (let m=0;m<=M;m++) html += `<div class="gantt-grid-line" style="left:${m*pct100}%"></div>`;
    html += `<div class="today-line" style="left:${currentMonth*pct100}%" data-month="${currentMonth}"></div>`;
    html += `<div class="gantt-bar" style="left:${item.start*pct100}%;width:${(item.end-item.start)*pct100}%;min-width:2px">
      <div class="gantt-bar-bg" style="background:${color}18;border:1px solid ${color}33"></div>
      <div class="gantt-bar-progress" style="width:${pct}%;background:${status==='done'?color+'cc':color+'55'}"></div>
      <div class="gantt-bar-label">${status==='done'?'✓ ':status==='active'?pct+'% ':''}</div></div>`;
    html += `</div></div>`;
  });
  html += `</div>`;
  document.getElementById('ganttPanel').innerHTML = html;
}

function selectItem(code) {
  selectedCode = selectedCode === code ? null : code;
  const item = WBS.find(i => i.code === code);
  if (item) { const phase = PHASES.find(p => p.id === item.phase); document.getElementById('phaseDesc').textContent = phase ? phase.desc : ''; }
  renderWBS(); renderGantt();
}

function updateTime(val) {
  currentMonth = parseInt(val);
  const M = MONTHS();
  const slider = document.getElementById('timeSlider');
  slider.style.setProperty('--pct', (currentMonth / M * 100).toFixed(1) + '%');
  document.getElementById('timeBadge').textContent = currentMonth === 0 ? 'Start' : `Miesiąc ${currentMonth}`;
  document.getElementById('stat-month').textContent = currentMonth === 0 ? 'M0' : 'M' + currentMonth;
  const phase = phaseAt(currentMonth);
  const pb = document.getElementById('phaseBadge');
  pb.style.borderColor = phase.color; pb.style.color = phase.color;
  pb.textContent = '▶ ' + phase.short;
  document.getElementById('stat-phase').textContent = 'Faza ' + phase.id;
  document.getElementById('phaseDesc').textContent = phase.desc;
  const overall = overallProgress(currentMonth);
  document.getElementById('stat-done').textContent = overall + '%';
  const circ = 2 * Math.PI * 38;
  document.getElementById('ringArc').setAttribute('stroke-dasharray', `${(circ*overall/100).toFixed(1)} ${circ.toFixed(1)}`);
  document.getElementById('ringPct').textContent = overall + '%';
  renderWBS(); renderGantt();
}

function openSettings() { document.getElementById('settingsOverlay').classList.add('open'); syncInputs(); }
function closeSettings() { document.getElementById('settingsOverlay').classList.remove('open'); }
function handleOverlayClick(e) { if (e.target === document.getElementById('settingsOverlay')) closeSettings(); }

function syncInputs() {
  ['budget','reserve','f1','f2','f3','f4','dev','eng','mgmt'].forEach(k => { document.getElementById('inp-'+k).value = PROJECT[k]; });
  refreshPreviews();
}

function refreshPreviews() {
  const b = +document.getElementById('inp-budget').value||1500000;
  const r = +document.getElementById('inp-reserve').value||10;
  const f1=+document.getElementById('inp-f1').value||6, f2=+document.getElementById('inp-f2').value||8;
  const f3=+document.getElementById('inp-f3').value||6, f4=+document.getElementById('inp-f4').value||4;
  const dev=+document.getElementById('inp-dev').value||5, eng=+document.getElementById('inp-eng').value||10, mgmt=+document.getElementById('inp-mgmt').value||10;
  const total=dev+eng+mgmt, totalM=f1+f2+f3+f4, op=Math.round(b*(1-r/100)), res=Math.round(b*r/100);
  document.getElementById('budget-mln').textContent = (b/1000000).toFixed(2).replace('.',',') + ' mln zł';
  document.getElementById('total-months-preview').textContent = totalM + ' miesięcy';
  document.getElementById('total-team-preview').textContent = total + ' osób';
  document.getElementById('cost-op').textContent = op.toLocaleString('pl-PL') + ' zł';
  document.getElementById('cost-res').textContent = res.toLocaleString('pl-PL') + ' zł';
  document.getElementById('cost-per-person').textContent = (total>0?Math.round(op/total/totalM):0).toLocaleString('pl-PL') + ' zł';
}

['budget','reserve','f1','f2','f3','f4','dev','eng','mgmt'].forEach(k => {
  setTimeout(() => { const el = document.getElementById('inp-'+k); if(el) el.addEventListener('input', refreshPreviews); }, 50);
});

function applySettings() {
  ['budget','reserve','f1','f2','f3','f4','dev','eng','mgmt'].forEach(k => { PROJECT[k] = +document.getElementById('inp-'+k).value || PROJECT[k]; });
  const T = MONTHS(), total = PROJECT.dev+PROJECT.eng+PROJECT.mgmt;
  const mln = (PROJECT.budget/1000000).toFixed(2).replace('.',',') + ' mln zł';
  document.getElementById('stat-budget').textContent = mln;
  document.getElementById('stat-team').textContent = total;
  document.getElementById('detail-budget').textContent = mln;
  document.getElementById('detail-time').textContent = T + ' miesięcy';
  document.getElementById('detail-team').textContent = '~' + total + ' osób';
  const f1e=PROJECT.f1, f2e=f1e+PROJECT.f2, f3e=f2e+PROJECT.f3, f4e=f3e+PROJECT.f4;
  PHASES[0].end=f1e; PHASES[1].start=f1e; PHASES[1].end=f2e; PHASES[2].start=f2e; PHASES[2].end=f3e; PHASES[3].start=f3e; PHASES[3].end=f4e;
  WBS_BASE.forEach((base,i) => { WBS[i].start=Math.round(base.start/24*T); WBS[i].end=Math.max(WBS[i].start+1,Math.round(base.end/24*T)); });
  const slider = document.getElementById('timeSlider');
  slider.max = T;
  if (currentMonth > T) { currentMonth = T; slider.value = T; }
  updateTime(currentMonth);
  closeSettings();
}

function resetSettings() {
  PROJECT = { ...DEFAULTS };
  PHASES[0].start=0;PHASES[0].end=6;PHASES[1].start=6;PHASES[1].end=14;PHASES[2].start=14;PHASES[2].end=20;PHASES[3].start=20;PHASES[3].end=24;
  WBS_BASE.forEach((base,i) => { WBS[i].start=base.start; WBS[i].end=base.end; });
  const slider = document.getElementById('timeSlider');
  slider.max = MONTHS();
  syncInputs(); updateTime(0);
}

Object.assign(window, {
  updateTime,
  selectItem,
  openSettings,
  closeSettings,
  handleOverlayClick,
  applySettings,
  resetSettings,
});

updateTime(0);
