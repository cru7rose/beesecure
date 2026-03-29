/**
 * User edits for BeeSecure mind map nodes.
 * Localhost: localStorage OR local API (VITE_LOCAL_API_URL) – writes to data/node-edits.json.
 * No Supabase.
 */
const STORAGE_KEY = 'beesecure_node_edits';
const API_BASE = typeof import.meta !== 'undefined' && import.meta.env?.VITE_LOCAL_API_URL;

/**
 * @typedef {Object} NodeEdit
 * @property {string} [label] - Node label (overrides base)
 * @property {string} [description] - Node description (overrides base)
 * @property {string} [presentationNotes] - Presentation notes / CEO/CTO talking points
 * @property {string} [updatedAt] - ISO date of last edit
 */

function getNodeEditsSync() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Returns all stored node edits (localStorage or local API).
 * @returns {Promise<Record<string, NodeEdit>>}
 */
export async function getNodeEdits() {
  if (API_BASE) {
    try {
      const r = await fetch(`${API_BASE}/api/edits`);
      if (r.ok) return await r.json();
    } catch (_) {}
    return {};
  }
  return getNodeEditsSync();
}

/**
 * Saves edit for one node.
 * @param {string} nodeId
 * @param {NodeEdit} edit
 * @returns {Promise<void>}
 */
export async function setNodeEdit(nodeId, edit) {
  if (API_BASE) {
    try {
      await fetch(`${API_BASE}/api/edits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodeId,
          label: edit.label,
          description: edit.description,
          presentationNotes: edit.presentationNotes,
        }),
      });
    } catch (_) {}
    return;
  }
  const all = getNodeEditsSync();
  all[nodeId] = {
    ...all[nodeId],
    ...edit,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

/**
 * Merges base node data with stored user edits.
 * @param {Object} baseNode - node from beesecure-mindmap-data
 * @param {Record<string, NodeEdit>} [edits]
 * @returns {Object} node with edits applied
 */
export function mergeNodeWithEdits(baseNode, edits = {}) {
  const e = edits[baseNode.id];
  if (!e) return baseNode;
  return {
    ...baseNode,
    label: e.label !== undefined ? e.label : baseNode.label,
    description: e.description !== undefined ? e.description : baseNode.description,
    presentationNotes: e.presentationNotes ?? baseNode.presentationNotes ?? '',
    updatedAt: e.updatedAt,
  };
}

/**
 * Exports all edits as JSON (backup / transfer). Async when using API.
 * @returns {Promise<string>}
 */
export async function exportEdits() {
  const edits = await getNodeEdits();
  return JSON.stringify(edits, null, 2);
}

/**
 * Removes edits for one node (restores base description and notes).
 * @param {string} nodeId
 * @returns {Promise<void>}
 */
export async function removeNodeEdit(nodeId) {
  if (API_BASE) {
    try {
      await fetch(`${API_BASE}/api/edits/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodeId }),
      });
    } catch (_) {}
    return;
  }
  const all = getNodeEditsSync();
  delete all[nodeId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

/**
 * Clears all stored edits (restores base).
 */
export function clearEdits() {
  localStorage.removeItem(STORAGE_KEY);
}
