import cytoscape from 'cytoscape';
import { BEESECURE_MINDMAP_DATA as MINDMAP_DATA, BEESECURE_BRANCH_COLORS as BRANCH_COLORS } from './data/beesecure-mindmap-data.js';
import { NODE_PICTOGRAM } from './data/bee-pictograms.js';
import { preloadMaterialIconsForNodes, getCachedMaterialDataUrl } from './data/material-iconify.js';
import { getNodeEdits, setNodeEdit, removeNodeEdit, mergeNodeWithEdits } from './data/node-edits-storage.js';

const cyContainer = document.getElementById('cy');
const detailPanel = document.getElementById('detail-panel');
const detailClose = document.getElementById('detail-close');
const detailIcon = document.getElementById('detail-icon');
const detailTitle = document.getElementById('detail-title');
const detailBody = document.getElementById('detail-body');
const detailLabel = document.getElementById('detail-label');
const detailDesc = document.getElementById('detail-desc');
const detailNotes = document.getElementById('detail-notes');
const detailSave = document.getElementById('detail-save');
const detailReset = document.getElementById('detail-reset');

if (!cyContainer) {
  document.body.innerHTML = '<p style="padding:2rem;color:red;">Error: missing container #cy.</p>';
  throw new Error('Missing container #cy');
}

const nodesById = new Map(MINDMAP_DATA.nodes.map((n) => [n.id, n]));

// Głębokość w drzewie (root=0, gałęzie=1, liście=2+)
function computeDepth() {
  const depth = new Map([['root', 0]]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const e of MINDMAP_DATA.edges) {
      const dParent = depth.get(e.source);
      if (dParent === undefined) continue;
      const dChild = (depth.get(e.target) ?? 99);
      if (dParent + 1 < dChild) {
        depth.set(e.target, dParent + 1);
        changed = true;
      }
    }
  }
  return depth;
}
const nodeDepth = computeDepth();

const iconDataUrlCache = {};
function getIconDataUrl(emoji, size = 128) {
  const key = `${emoji}-${size}`;
  if (iconDataUrlCache[key]) return iconDataUrlCache[key];
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const fontSize = Math.round(size * 0.7);
  ctx.font = `${fontSize}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
  ctx.fillText(emoji, size / 2, size / 2);
  iconDataUrlCache[key] = canvas.toDataURL('image/png');
  return iconDataUrlCache[key];
}

function buildCyElements() {
  const elements = [];
  for (const n of MINDMAP_DATA.nodes) {
    const d = nodeDepth.get(n.id) ?? 0;
    const pic = NODE_PICTOGRAM[n.id];
    const iconBg =
      (pic?.material && getCachedMaterialDataUrl(pic.material)) || getIconDataUrl(n.icon || '•');
    elements.push({
      group: 'nodes',
      data: {
        id: n.id,
        label: n.label,
        branch: n.branch,
        icon: n.icon,
        iconBg,
        description: n.description,
        depth: d,
      },
    });
  }
  for (const e of MINDMAP_DATA.edges) {
    elements.push({
      group: 'edges',
      data: { source: e.source, target: e.target },
    });
  }
  return elements;
}

function initCy() {
  const cy = cytoscape({
    container: cyContainer,
    elements: buildCyElements(),
    style: [
    {
      selector: 'node',
      style: {
        label: 'data(label)',
        'text-valign': 'bottom',
        // większy margines — miejsce na dwie linie etykiety pod kwadratem
        'text-margin-y': (el) => (el.data('depth') === 0 ? 20 : el.data('depth') === 1 ? 16 : 18),
        'text-halign': 'center',
        'font-size': (el) => (el.data('depth') === 0 ? 13 : el.data('depth') === 1 ? 11 : 9),
        'font-family': 'Outfit, sans-serif',
        color: '#e6edf3',
        // wrap zamiast ellipsis — pełny tekst w 1–2 liniach (także \n z danych)
        'text-max-width': (el) => (el.data('depth') === 0 ? 170 : el.data('depth') === 1 ? 150 : 132),
        'text-wrap': 'wrap',
        'text-background-color': 'rgba(15, 23, 42, 0.98)',
        'text-background-padding': '4px 6px',
        'text-background-shape': 'roundrectangle',
        'text-outline-width': 1,
        'text-outline-color': '#020617',
        'background-color': '#1e293b',
        'background-image': 'data(iconBg)',
        'background-fit': 'contain',
        'background-clip': 'node',
        'background-opacity': 1,
        width: (el) => (el.data('depth') === 0 ? 88 : el.data('depth') === 1 ? 68 : 56),
        height: (el) => (el.data('depth') === 0 ? 88 : el.data('depth') === 1 ? 68 : 56),
        shape: 'rectangle',
        'border-width': 2,
        'border-color': (el) => BRANCH_COLORS[el.data('branch')] || '#d4af37',
        'border-opacity': 0.9,
        'overlay-color': (el) => BRANCH_COLORS[el.data('branch')] || '#d4af37',
        'overlay-opacity': 0.15,
      },
    },
    {
      selector: 'node[branch="root"]',
      style: {
        width: 100,
        height: 100,
        'text-margin-y': 22,
        'font-size': 14,
        'text-max-width': 180,
      },
    },
    {
      selector: 'node:selected',
      style: {
        'border-width': 3,
        'border-color': '#fff',
        'border-opacity': 1,
      },
    },
    {
      selector: 'node:active',
      style: {
        'overlay-opacity': 0.35,
      },
    },
    {
      selector: 'edge',
      style: {
        width: 2,
        'line-color': (el) => {
          const cy = el.cy();
          const src = cy.getElementById(el.data('source'));
          return BRANCH_COLORS[src?.data('branch')] || '#6b7280';
        },
        'target-arrow-color': (el) => {
          const cy = el.cy();
          const src = cy.getElementById(el.data('source'));
          return BRANCH_COLORS[src?.data('branch')] || '#6b7280';
        },
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        opacity: 0.8,
      },
    },
  ],
  layout: {
    name: 'concentric',
    concentric: (node) => 100 - (node.data('depth') ?? 0),
    levelWidth: () => 1,
    minNodeSpacing: 88,
    padding: 50,
    startAngle: (3 / 2) * Math.PI,
    sweep: 2 * Math.PI,
    clockwise: true,
    avoidOverlap: true,
    // Primary branches: order around circle (Warunki satysfakcji at top)
    sort: (node) => {
      const order = [
        'warunki',
        'harmonogram',
        'produkty',
        'zasoby',
        'zagrozenia',
        'zakres',
      ];
      const id = node.id();
      const i = order.indexOf(id);
      return i === -1 ? 99 : i;
    },
  },
  minZoom: 0.2,
  maxZoom: 3,
  });

  cy.on('layoutstop', () => {
    cy.fit(60);
  });

  const ro = new ResizeObserver(() => {
    cy.resize();
    cy.fit(60);
  });
  ro.observe(cyContainer);

  let currentDetailNodeId = null;

  async function showNodeDetail(node) {
    const id = node.data('id');
    const baseData = nodesById.get(id);
    if (!baseData) return;
    const edits = await getNodeEdits();
    const data = mergeNodeWithEdits(baseData, edits);
    currentDetailNodeId = id;
    cy.elements().removeClass('highlight');
    node.addClass('highlight');
    node.neighborhood().addClass('highlight');
    const pic = NODE_PICTOGRAM[id];
    if (pic?.material) {
      detailIcon.innerHTML = `<span class="material-symbols-outlined detail-material-icon" aria-hidden="true">${pic.material}</span>`;
    } else {
      detailIcon.textContent = data.icon || '•';
    }
    detailTitle.textContent = data.label;
    detailBody.textContent = data.description || '—';
    if (detailLabel) detailLabel.value = data.label ?? baseData.label ?? '';
    if (detailDesc) detailDesc.value = data.description ?? '';
    if (detailNotes) detailNotes.value = data.presentationNotes ?? '';
    detailPanel.classList.remove('hidden');
    const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL;
    const SUPABASE_ANON = import.meta.env?.VITE_SUPABASE_ANON_KEY;
    if (SUPABASE_URL && SUPABASE_ANON) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
        const { data: row } = await supabase
          .from('mind_map_nodes')
          .select('description')
          .eq('id', id)
          .single();
        if (row?.description) {
          detailBody.textContent = row.description;
          if (detailDesc) detailDesc.value = row.description;
        }
      } catch (_) {}
    }
  }

  async function saveNodeEdit() {
    if (!currentDetailNodeId || !detailDesc || !detailNotes) return;
    const node = cy.getElementById(currentDetailNodeId);
    const baseData = nodesById.get(currentDetailNodeId);
    const newLabel = (detailLabel?.value?.trim() || baseData?.label || '').trim();
    await setNodeEdit(currentDetailNodeId, {
      label: newLabel || undefined,
      description: detailDesc.value.trim() || undefined,
      presentationNotes: detailNotes.value.trim() || undefined,
    });
    if (node && newLabel) {
      node.data('label', newLabel);
    }
    detailBody.textContent = detailDesc.value.trim() || '—';
    const toast = document.createElement('span');
    toast.className = 'detail-toast';
    toast.textContent = 'Zapisano';
    detailPanel.querySelector('.detail-content')?.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  async function resetNodeEdit() {
    if (!currentDetailNodeId) return;
    const baseData = nodesById.get(currentDetailNodeId);
    if (!baseData) return;
    await removeNodeEdit(currentDetailNodeId);
    const node = cy.getElementById(currentDetailNodeId);
    if (detailLabel) detailLabel.value = baseData.label ?? '';
    if (node && !node.empty()) node.data('label', baseData.label ?? '');
    detailDesc.value = baseData.description ?? '';
    detailNotes.value = '';
    detailBody.textContent = baseData.description || '—';
    const toast = document.createElement('span');
    toast.className = 'detail-toast';
    toast.textContent = 'Przywrócono domyślne';
    detailPanel.querySelector('.detail-content')?.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  if (detailSave) detailSave.addEventListener('click', saveNodeEdit);
  if (detailReset) detailReset.addEventListener('click', resetNodeEdit);

  cy.on('tap', 'node', (evt) => showNodeDetail(evt.target));

  cy.on('tap', (evt) => {
    if (evt.target === cy) {
      cy.elements().removeClass('highlight');
      detailPanel.classList.add('hidden');
    }
  });

  detailClose.addEventListener('click', () => {
    cy.elements().removeClass('highlight');
    detailPanel.classList.add('hidden');
  });
}

async function startMindmap() {
  await preloadMaterialIconsForNodes(MINDMAP_DATA.nodes);
  initCy();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(startMindmap, 50));
} else {
  setTimeout(startMindmap, 50);
}
