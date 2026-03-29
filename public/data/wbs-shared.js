/**
 * Wspólny stan WBS + fazy + projekt dla harmonogramu i diagramu blokowego.
 * localStorage: zsynchronizowane między podstronami; skalowanie czasu z baseline (24 mies.).
 */
export const STORAGE_KEY = 'beesecure_wbs_shared_v1';
export const BASELINE_MONTHS = 24;
export const GRP_COLORS = ['#3B8BD4', '#1D9E75', '#D4A017', '#D85A30', '#9B59B6', '#E74C3C', '#888070'];

export const DEFAULT_PROJECT = {
  budget: 1500000,
  reserve: 10,
  f1: 6,
  f2: 8,
  f3: 6,
  f4: 4,
  dev: 5,
  eng: 10,
  mgmt: 10,
};

export const DEFAULT_PHASES = [
  { id: 1, short: 'F1', start: 0, end: 6, color: '#3B8BD4', desc: 'Projektowanie i prototypowanie: architektura systemu, projekt PCB, zamek i gateway (M1–6).' },
  { id: 2, short: 'F2', start: 6, end: 14, color: '#1D9E75', desc: 'Testy jednostkowe i integracyjne, certyfikacja ZigBee i normy bezpieczeństwa (M7–14).' },
  { id: 3, short: 'F3', start: 14, end: 20, color: '#D85A30', desc: 'Uruchomienie systemu u pierwszych klientów, zbieranie feedbacku (M15–20).' },
  { id: 4, short: 'F4', start: 20, end: 24, color: '#9B59B6', desc: 'Wprowadzenie na rynek, zarządzanie 1000+ lokalizacji (M21–24).' },
];

export const DEFAULT_WBS = [
  { code: '1', name: 'Zamek Elektroniczny', level: 1, start: 0, end: 8, phase: 1 },
  { code: '1.1', name: 'Projekt PCB i elektroniki', level: 2, start: 0, end: 4, phase: 1 },
  { code: '1.1.1', name: 'Schemat i BOM', level: 3, start: 0, end: 2, phase: 1 },
  { code: '1.1.2', name: 'Weryfikacja EMC', level: 3, start: 2, end: 4, phase: 1 },
  { code: '1.2', name: 'Moduł ZigBee', level: 2, start: 1, end: 5, phase: 1 },
  { code: '1.3', name: 'Pinpad i interfejs', level: 2, start: 2, end: 6, phase: 1 },
  { code: '1.4', name: 'Zasilanie i klucz awaryjny', level: 2, start: 3, end: 7, phase: 1 },
  { code: '1.5', name: 'Obudowa i mechanika', level: 2, start: 4, end: 8, phase: 1 },
  { code: '2', name: 'Gateway Komunikacyjny', level: 1, start: 0, end: 7, phase: 1 },
  { code: '2.1', name: 'Projekt PCB gateway', level: 2, start: 0, end: 3, phase: 1 },
  { code: '2.2', name: 'Integracja sieci ZigBee', level: 2, start: 1, end: 5, phase: 1 },
  { code: '2.3', name: 'Moduł serwer–urządzenie', level: 2, start: 2, end: 6, phase: 1 },
  { code: '2.4', name: 'Integracja z siecią domową', level: 2, start: 3, end: 7, phase: 1 },
  { code: '3', name: 'Aplikacja Webowa', level: 1, start: 2, end: 16, phase: 1 },
  { code: '3.1', name: 'Architektura i backend', level: 2, start: 2, end: 8, phase: 1 },
  { code: '3.1.1', name: 'API i baza danych', level: 3, start: 2, end: 5, phase: 1 },
  { code: '3.1.2', name: 'Uwierzytelnianie', level: 3, start: 4, end: 8, phase: 1 },
  { code: '3.2', name: 'Panel zarządzania dostępem', level: 2, start: 5, end: 12, phase: 2 },
  { code: '3.3', name: 'Moduł serwisantów', level: 2, start: 7, end: 13, phase: 2 },
  { code: '3.4', name: 'Zdalne administrowanie', level: 2, start: 8, end: 14, phase: 2 },
  { code: '3.5', name: 'Interfejs UI/UX', level: 2, start: 10, end: 16, phase: 2 },
  { code: '4', name: 'Algorytm Rotacyjny Kluczy', level: 1, start: 1, end: 11, phase: 1 },
  { code: '4.1', name: 'Implementacja 12-cyfrowego seed', level: 2, start: 1, end: 5, phase: 1 },
  { code: '4.2', name: 'Synchronizacja zamek–serwer', level: 2, start: 3, end: 7, phase: 1 },
  { code: '4.3', name: 'Kody czasowe dla gości', level: 2, start: 4, end: 8, phase: 2 },
  { code: '4.4', name: 'Jednorazowe kody serwisowe', level: 2, start: 6, end: 9, phase: 2 },
  { code: '4.5', name: 'Autoryzacja lokalna (offline)', level: 2, start: 7, end: 11, phase: 2 },
  { code: '5', name: 'Testy i Certyfikacja', level: 1, start: 6, end: 14, phase: 2 },
  { code: '5.1', name: 'Testy jednostkowe i integracyjne', level: 2, start: 6, end: 10, phase: 2 },
  { code: '5.1.1', name: 'Testy modułowe', level: 3, start: 6, end: 8, phase: 2 },
  { code: '5.1.2', name: 'Testy E2E', level: 3, start: 7, end: 10, phase: 2 },
  { code: '5.2', name: 'Testy bezpieczeństwa', level: 2, start: 8, end: 12, phase: 2 },
  { code: '5.3', name: 'Certyfikacja ZigBee', level: 2, start: 9, end: 13, phase: 2 },
  { code: '5.4', name: 'Certyfikacja norm', level: 2, start: 10, end: 14, phase: 2 },
  { code: '5.5', name: 'Testy użyteczności', level: 2, start: 11, end: 14, phase: 2 },
  { code: '6', name: 'Wdrożenie i Skalowanie', level: 1, start: 14, end: 24, phase: 3 },
  { code: '6.1', name: 'Wdrożenie pilotażowe', level: 2, start: 14, end: 17, phase: 3 },
  { code: '6.2', name: 'Feedback i iteracja', level: 2, start: 16, end: 20, phase: 3 },
  { code: '6.3', name: 'Wdrożenie produkcyjne', level: 2, start: 19, end: 23, phase: 4 },
  { code: '6.4', name: 'Panel 1000+ lokalizacji', level: 2, start: 20, end: 24, phase: 4 },
  { code: '6.5', name: 'Szkolenia i dokumentacja', level: 2, start: 21, end: 24, phase: 4 },
  { code: '7', name: 'Zarządzanie Projektem', level: 1, start: 0, end: 24, phase: 1 },
  { code: '7.1', name: 'Planowanie i harmonogramowanie', level: 2, start: 0, end: 6, phase: 1 },
  { code: '7.2', name: 'Zarządzanie ryzykiem', level: 2, start: 0, end: 24, phase: 1 },
  { code: '7.3', name: 'Komunikacja z EasyRentals', level: 2, start: 2, end: 24, phase: 1 },
  { code: '7.4', name: 'Raportowanie i budżet', level: 2, start: 4, end: 24, phase: 1 },
  { code: '7.5', name: 'Zarządzanie dostawcami', level: 2, start: 0, end: 14, phase: 1 },
];

function deepClone(o) {
  return JSON.parse(JSON.stringify(o));
}

let state = null;

function createFreshState() {
  return {
    phases: deepClone(DEFAULT_PHASES),
    wbs: deepClone(DEFAULT_WBS),
    project: { ...DEFAULT_PROJECT },
    baseline: deepClone(DEFAULT_WBS).map((i) => ({ start: i.start, end: i.end })),
  };
}

/** Porządkuje kody 1 < 1.2 < 1.10 < 1.2.1 */
export function compareWbsCode(a, b) {
  const pa = String(a).split('.').map((x) => parseInt(x, 10) || 0);
  const pb = String(b).split('.').map((x) => parseInt(x, 10) || 0);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const da = pa[i] ?? -1;
    const db = pb[i] ?? -1;
    if (da !== db) return da - db;
  }
  return 0;
}

function escapeCodeRe(code) {
  return String(code).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Dzieci bezpośrednie: L1→L2 lub L2→L3 */
export function getDirectChildCodes(wbs, parentCode) {
  const parent = wbs.find((x) => x.code === parentCode);
  if (!parent) return [];
  const re =
    parent.level === 1
      ? new RegExp(`^${escapeCodeRe(parentCode)}\\.\\d+$`)
      : parent.level === 2
        ? new RegExp(`^${escapeCodeRe(parentCode)}\\.\\d+$`)
        : null;
  if (!re) return [];
  const wantLevel = parent.level + 1;
  return wbs.filter((x) => x.level === wantLevel && re.test(x.code));
}

export function normalizeWbsOrder() {
  if (!state) initWbsState();
  const pairs = state.wbs.map((item, i) => ({ item, bl: state.baseline[i] }));
  pairs.sort((x, y) => compareWbsCode(x.item.code, y.item.code));
  state.wbs = pairs.map((p) => p.item);
  state.baseline = pairs.map((p) => p.bl);
}

function validateLoaded(s) {
  if (!s?.wbs?.length || !Array.isArray(s.baseline) || s.baseline.length !== s.wbs.length) return false;
  if (!s.phases || s.phases.length !== 4) return false;
  if (!s.project || typeof s.project.budget !== 'number') return false;
  return true;
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (validateLoaded(parsed)) {
        state = parsed;
        return;
      }
    }
  } catch (_) {
    /* ignore */
  }
  state = createFreshState();
}

/** Pierwsze wywołanie na stronie; wymusza odczyt z localStorage. */
export function initWbsState() {
  loadState();
  return state;
}

export function reloadStateFromStorage() {
  state = null;
  loadState();
}

export function getWbs() {
  if (!state) initWbsState();
  return state.wbs;
}

export function getPhases() {
  if (!state) initWbsState();
  return state.phases;
}

export function getProject() {
  if (!state) initWbsState();
  return state.project;
}

export function saveState() {
  if (!state) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('beesecure-wbs-changed'));
  } catch (_) {
    /* quota */
  }
}

export function totalMonths() {
  const p = getProject();
  return Math.max(1, p.f1 + p.f2 + p.f3 + p.f4);
}

export function syncPhaseEndsFromProject() {
  const p = state.project;
  const f1e = p.f1;
  const f2e = f1e + p.f2;
  const f3e = f2e + p.f3;
  const f4e = f3e + p.f4;
  state.phases[0].start = 0;
  state.phases[0].end = f1e;
  state.phases[1].start = f1e;
  state.phases[1].end = f2e;
  state.phases[2].start = f2e;
  state.phases[2].end = f3e;
  state.phases[3].start = f3e;
  state.phases[3].end = f4e;
}

/** Skaluje start/end pakietów z baseline (skala 24 mies.) do bieżącego horyzontu. */
export function rescaleWbsToProjectTimeline() {
  const T = totalMonths();
  const w = state.wbs;
  const b = state.baseline;
  for (let i = 0; i < w.length; i++) {
    const bl = b[i] || { start: 0, end: BASELINE_MONTHS };
    w[i].start = Math.round((bl.start / BASELINE_MONTHS) * T);
    w[i].end = Math.max(w[i].start + 1, Math.round((bl.end / BASELINE_MONTHS) * T));
  }
}

export function resetStateToFactory() {
  state = createFreshState();
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (_) {
    /* ignore */
  }
  saveState();
}

export function addWorkPackageL1(name) {
  initWbsState();
  const w = state.wbs;
  const roots = w.filter((x) => x.level === 1);
  const maxN = roots.reduce((m, r) => Math.max(m, parseInt(r.code, 10) || 0), 0);
  const ncode = String(maxN + 1);
  const T = totalMonths();
  const blEnd = Math.min(8, BASELINE_MONTHS);
  w.push({
    code: ncode,
    name: (name || `Obszar ${ncode}`).trim(),
    level: 1,
    start: 0,
    end: Math.min(8, T),
    phase: 1,
  });
  state.baseline.push({ start: 0, end: blEnd });
  normalizeWbsOrder();
  rescaleWbsToProjectTimeline();
  saveState();
  return ncode;
}

export function addWorkPackageL2(parentCode, name) {
  initWbsState();
  const w = state.wbs;
  const parent = w.find((x) => x.code === parentCode && x.level === 1);
  if (!parent) return null;
  const T = totalMonths();
  const kids = getDirectChildCodes(w, parentCode);
  const sub =
    kids.reduce((m, k) => {
      const tail = parseInt(k.code.split('.').pop(), 10);
      return Number.isFinite(tail) ? Math.max(m, tail) : m;
    }, 0) + 1;
  const ncode = `${parentCode}.${sub}`;
  const span = Math.max(2, Math.min(6, parent.end - parent.start));
  let start = parent.start;
  let end = Math.min(T, parent.start + span);
  if (kids.length) {
    const last = kids.reduce((a, b) => (compareWbsCode(a.code, b.code) > 0 ? a : b));
    start = Math.min(Math.max(last.start, parent.start), parent.end - 1);
    end = Math.min(T, start + Math.max(1, Math.min(span, parent.end - start)));
  }
  if (end <= start) end = Math.min(T, start + 1);
  w.push({
    code: ncode,
    name: (name || `Pakiet ${ncode}`).trim(),
    level: 2,
    start,
    end,
    phase: parent.phase,
  });
  state.baseline.push({
    start: (start / T) * BASELINE_MONTHS,
    end: (end / T) * BASELINE_MONTHS,
  });
  normalizeWbsOrder();
  rescaleWbsToProjectTimeline();
  saveState();
  return ncode;
}

/** Pod-podpakiet (L3) pod wybranym pakietem L2 */
export function addWorkPackageL3(parentL2Code, name) {
  initWbsState();
  const w = state.wbs;
  const parent = w.find((x) => x.code === parentL2Code && x.level === 2);
  if (!parent) return null;
  const T = totalMonths();
  const kids = getDirectChildCodes(w, parentL2Code);
  const sub =
    kids.reduce((m, k) => {
      const tail = parseInt(k.code.split('.').pop(), 10);
      return Number.isFinite(tail) ? Math.max(m, tail) : m;
    }, 0) + 1;
  const ncode = `${parentL2Code}.${sub}`;
  const span = Math.max(1, Math.min(4, parent.end - parent.start));
  let start = parent.start;
  let end = Math.min(T, parent.start + Math.max(1, Math.min(span, parent.end - parent.start)));
  if (kids.length) {
    const last = kids.reduce((a, b) => (compareWbsCode(a.code, b.code) > 0 ? a : b));
    start = Math.min(Math.max(last.start, parent.start), parent.end - 1);
    end = Math.min(T, start + Math.max(1, Math.min(span, parent.end - start)));
  }
  if (end <= start) end = Math.min(T, start + 1);
  w.push({
    code: ncode,
    name: (name || `Zadanie ${ncode}`).trim(),
    level: 3,
    start,
    end,
    phase: parent.phase,
  });
  state.baseline.push({
    start: (start / T) * BASELINE_MONTHS,
    end: (end / T) * BASELINE_MONTHS,
  });
  normalizeWbsOrder();
  rescaleWbsToProjectTimeline();
  saveState();
  return ncode;
}

export function removeWorkPackage(code) {
  initWbsState();
  const w = state.wbs;
  const idx = [];
  const dots = (code.match(/\./g) || []).length;
  if (dots === 0) {
    w.forEach((item, i) => {
      if (item.code === code || item.code.startsWith(`${code}.`)) idx.push(i);
    });
  } else if (dots === 1) {
    const prefix = `${code}.`;
    w.forEach((item, i) => {
      if (item.code === code || item.code.startsWith(prefix)) idx.push(i);
    });
  } else {
    const i = w.findIndex((x) => x.code === code);
    if (i >= 0) idx.push(i);
  }
  [...new Set(idx)]
    .sort((a, b) => b - a)
    .forEach((i) => {
      w.splice(i, 1);
      state.baseline.splice(i, 1);
    });
  normalizeWbsOrder();
  rescaleWbsToProjectTimeline();
  saveState();
}

export function renameWorkPackage(code, newName) {
  initWbsState();
  const item = state.wbs.find((x) => x.code === code);
  if (!item) return false;
  const t = (newName || '').trim();
  if (t) item.name = t;
  saveState();
  return true;
}

export function subscribeWbsChanges(callback) {
  const fn = () => callback();
  window.addEventListener('beesecure-wbs-changed', fn);
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) callback();
  });
  return () => {
    window.removeEventListener('beesecure-wbs-changed', fn);
  };
}
