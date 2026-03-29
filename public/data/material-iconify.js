/**
 * Te same piktogramy co po lewej (Material Symbols): SVG z Iconify material-symbols.
 * Cytoscape stabilniej rysuje te grafiki niż własne data-URL z path „d”.
 */
import { NODE_PICTOGRAM } from './bee-pictograms.js';

const dataUrlCache = new Map();

export function materialNameToIconifySlug(name) {
  return String(name).replace(/_/g, '-');
}

function rasterizeMaterialOnCanvas(materialName) {
  try {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#d4af37';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `400 ${Math.round(size * 0.58)}px "Material Symbols Outlined", sans-serif`;
    ctx.fillText(materialName, size / 2, size / 2);
    return canvas.toDataURL('image/png');
  } catch {
    return null;
  }
}

/**
 * @param {string} materialName - np. task_alt (jak w NODE_PICTOGRAM)
 */
export async function fetchMaterialSymbolAsDataUrl(materialName) {
  if (!materialName) return null;
  if (dataUrlCache.has(materialName)) return dataUrlCache.get(materialName);
  const slug = materialNameToIconifySlug(materialName);
  const href = `https://api.iconify.design/material-symbols/${slug}.svg?color=%23d4af37&width=128&height=128`;
  try {
    const res = await fetch(href);
    if (!res.ok) throw new Error(String(res.status));
    const svg = await res.text();
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    dataUrlCache.set(materialName, dataUrl);
    return dataUrl;
  } catch {
    const fb = rasterizeMaterialOnCanvas(materialName);
    if (fb) dataUrlCache.set(materialName, fb);
    return fb;
  }
}

/** Po preload — synchronicznie dla buildCyElements */
export function getCachedMaterialDataUrl(materialName) {
  return dataUrlCache.get(materialName) ?? null;
}

export async function preloadMaterialIconsForNodes(nodes) {
  const names = new Set();
  for (const n of nodes) {
    const p = NODE_PICTOGRAM[n.id];
    if (p?.material) names.add(p.material);
  }
  await document.fonts.ready;
  await Promise.all([...names].map((m) => fetchMaterialSymbolAsDataUrl(m)));
}
