/**
 * BeeSecure mind map – graphic-only render for PNG/PDF export and Canva.
 * Ikony: Material Symbols (Iconify), tak jak panel Canva / legenda.
 */
import cytoscape from 'cytoscape';
import { BEESECURE_MINDMAP_DATA, BEESECURE_BRANCH_COLORS as BRANCH_COLORS } from './data/beesecure-mindmap-data.js';
import { NODE_PICTOGRAM } from './data/bee-pictograms.js';
import { preloadMaterialIconsForNodes, getCachedMaterialDataUrl } from './data/material-iconify.js';

const iconCache = {};
function getIconDataUrl(emoji, size = 128) {
  const key = `${emoji}-${size}`;
  if (iconCache[key]) return iconCache[key];
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${Math.round(size * 0.6)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
  ctx.fillText(emoji || '•', size / 2, size / 2);
  iconCache[key] = canvas.toDataURL('image/png');
  return iconCache[key];
}

(async function runExport() {
  await preloadMaterialIconsForNodes(BEESECURE_MINDMAP_DATA.nodes);

  const elements = [
    ...BEESECURE_MINDMAP_DATA.nodes.map((n) => {
      const pic = NODE_PICTOGRAM[n.id];
      const iconBg =
        (pic?.material && getCachedMaterialDataUrl(pic.material)) || getIconDataUrl(n.icon);
      return {
        group: 'nodes',
        data: { id: n.id, label: n.label, branch: n.branch, iconBg },
      };
    }),
    ...BEESECURE_MINDMAP_DATA.edges.map((e) => ({
      group: 'edges',
      data: { source: e.source, target: e.target },
    })),
  ];

  const cy = cytoscape({
    container: document.getElementById('cy'),
    elements,
    style: [
      {
        selector: 'node',
        style: {
          label: 'data(label)',
          'text-valign': 'bottom',
          'text-halign': 'center',
          'text-margin-y': 14,
          'font-size': '10px',
          'font-family': 'Outfit, sans-serif',
          color: '#e6edf3',
          'text-max-width': '132px',
          'text-wrap': 'wrap',
          'text-background-color': 'rgba(15, 20, 25, 0.95)',
          'text-background-padding': '3px 5px',
          'text-background-shape': 'roundrectangle',
          'text-outline-width': 1,
          'text-outline-color': '#020617',
          'background-color': '#1e293b',
          'background-image': 'data(iconBg)',
          'background-fit': 'contain',
          'background-opacity': 1,
          width: 44,
          height: 44,
          shape: 'rectangle',
          'border-width': 2,
          'border-color': (el) => BRANCH_COLORS[el.data('branch')] || '#6b7280',
          'border-opacity': 0.85,
        },
      },
      {
        selector: 'node[branch="root"]',
        style: { width: 64, height: 64, 'font-size': '12px' },
      },
      {
        selector: 'edge',
        style: {
          width: 1.5,
          'line-color': (el) => {
            const src = cy.getElementById(el.data('source'));
            return BRANCH_COLORS[src.data('branch')] || '#6b7280';
          },
          'target-arrow-color': (el) => {
            const src = cy.getElementById(el.data('source'));
            return BRANCH_COLORS[src.data('branch')] || '#6b7280';
          },
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          opacity: 0.7,
        },
      },
    ],
    layout: {
      name: 'breadthfirst',
      directed: true,
      roots: ['#root'],
      padding: 40,
      spacingFactor: 1.4,
    },
  });

  cy.on('layoutstop', () => {
    cy.fit(40);
  });
})();
