/**
 * Lewy panel: statyczna replika treści slajdu Canvy (Material Symbols + teksty z danych mapy).
 */
import { BEESECURE_MINDMAP_DATA } from './data/beesecure-mindmap-data.js';
import { NODE_PICTOGRAM } from './data/bee-pictograms.js';

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const nodesById = new Map(BEESECURE_MINDMAP_DATA.nodes.map((n) => [n.id, n]));

/** @typedef {{ title: string, headerMaterial: string, introFrom?: string, ids: string[] }} SectionSpec */

/** @type {SectionSpec[]} */
const SECTIONS = [
  {
    title: 'Warunki satysfakcji',
    headerMaterial: 'task_alt',
    introFrom: 'warunki',
    ids: ['war-koszty', 'war-self', 'war-skal', 'war-zero', 'war-bezp', 'war-konk'],
  },
  {
    title: 'Cele',
    headerMaterial: 'flag',
    introFrom: 'cele',
    ids: ['cele-glowny', 'cele-koszty', 'cele-1000', 'cele-zero', 'cele-self', 'cele-bezp', 'cele-wizer'],
  },
  {
    title: 'Harmonogram',
    headerMaterial: 'calendar_month',
    introFrom: 'harmonogram',
    ids: ['harm-f1', 'harm-f2', 'harm-f3', 'harm-f4'],
  },
  {
    title: 'Produkty',
    headerMaterial: 'category',
    introFrom: 'produkty',
    ids: ['prod-zamek', 'prod-gateway', 'prod-app', 'prod-alg'],
  },
  {
    title: 'Zasoby',
    headerMaterial: 'inventory_2',
    introFrom: 'zasoby',
    ids: ['zas-budzet', 'zas-czas', 'zas-zespol', 'zas-partner', 'zas-it'],
  },
  {
    title: 'Zagrożenia',
    headerMaterial: 'warning',
    introFrom: 'zagrozenia',
    ids: ['zag-testy', 'zag-hw', 'zag-ceny', 'zag-lancuch', 'zag-montaz', 'zag-sync'],
  },
  {
    title: 'Zakres',
    headerMaterial: 'design_services',
    introFrom: 'zakres',
    ids: ['zak-app', 'zak-alg', 'zak-hw', 'zak-testy', 'zak-zigbee'],
  },
];

function elMaterial(name, extraClass = '') {
  const s = document.createElement('span');
  s.className = `material-symbols-outlined ${extraClass}`.trim();
  s.textContent = name;
  s.setAttribute('aria-hidden', 'true');
  return s;
}

function renderItem(id) {
  const n = nodesById.get(id);
  if (!n) return null;
  const pic = NODE_PICTOGRAM[id];
  const row = document.createElement('div');
  row.className = 'canva-item';
  const iconWrap = document.createElement('div');
  iconWrap.className = 'canva-item-icon';
  if (pic?.material) iconWrap.appendChild(elMaterial(pic.material, 'canva-item-glyph'));
  const body = document.createElement('div');
  body.className = 'canva-item-body';
  const title = document.createElement('strong');
  title.className = 'canva-item-title';
  title.textContent = (n.label || '').replace(/\n/g, ' ');
  const desc = document.createElement('p');
  desc.className = 'canva-item-desc';
  desc.textContent = n.description || '';
  body.append(title, desc);
  row.append(iconWrap, body);
  return row;
}

function renderSection(spec) {
  const section = document.createElement('section');
  section.className = 'canva-section';
  const head = document.createElement('h2');
  head.className = 'canva-section-title';
  head.appendChild(elMaterial(spec.headerMaterial, 'canva-section-glyph'));
  head.appendChild(document.createTextNode(spec.title));
  section.appendChild(head);
  if (spec.introFrom) {
    const introN = nodesById.get(spec.introFrom);
    if (introN?.description) {
      const p = document.createElement('p');
      p.className = 'canva-section-intro';
      p.textContent = introN.description;
      section.appendChild(p);
    }
  }
  const list = document.createElement('div');
  list.className = 'canva-item-list';
  for (const id of spec.ids) {
    const item = renderItem(id);
    if (item) list.appendChild(item);
  }
  section.appendChild(list);
  return section;
}

function render() {
  const root = document.getElementById('canva-slide-root');
  if (!root) return;
  root.innerHTML = '';

  const raster = document.getElementById('canva-raster');
  if (raster) {
    raster.onload = () => {
      raster.classList.remove('canva-raster--hidden');
      root.classList.add('canva-slide-root--hidden');
    };
    raster.onerror = () => {
      raster.classList.add('canva-raster--hidden');
      root.classList.remove('canva-slide-root--hidden');
    };
    raster.src = asset('assets/canva-slide-full.png');
  }

  const top = document.createElement('header');
  top.className = 'canva-slide-top';
  const logo = document.createElement('img');
  logo.className = 'canva-slide-logo';
  logo.src = asset('assets/beesecure-logo-canva.png');
  logo.alt = 'BeeSecure';
  logo.width = 200;
  logo.height = 66;
  const h1 = document.createElement('h1');
  h1.className = 'canva-slide-h1';
  h1.textContent = 'Warunki satysfakcji';
  const sub = document.createElement('p');
  sub.className = 'canva-slide-sub';
  const rootNode = nodesById.get('root');
  sub.textContent = rootNode?.description || '';
  top.append(logo, h1, sub);
  root.appendChild(top);

  const grid = document.createElement('div');
  grid.className = 'canva-section-grid';
  for (const spec of SECTIONS) {
    grid.appendChild(renderSection(spec));
  }
  root.appendChild(grid);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}
