/**
 * Pictogramy spójne z panelem „Canva” (Material Symbols) + klucz SVG dla mapy.
 * Nazwy Material: https://fonts.google.com/icons
 */
export const NODE_PICTOGRAM = {
  root: { material: 'hive', svgKey: 'sparkles' },
  warunki: { material: 'task_alt', svgKey: 'check' },
  'war-koszty': { material: 'savings', svgKey: 'banknotes' },
  'war-self': { material: 'hotel', svgKey: 'building' },
  'war-skal': { material: 'hub', svgKey: 'squares' },
  'war-zero': { material: 'key_off', svgKey: 'key' },
  'war-bezp': { material: 'shield', svgKey: 'shield' },
  'war-konk': { material: 'military_tech', svgKey: 'trophy' },
  cele: { material: 'flag', svgKey: 'check' },
  'cele-glowny': { material: 'emoji_events', svgKey: 'trophy' },
  'cele-koszty': { material: 'savings', svgKey: 'banknotes' },
  'cele-1000': { material: 'hub', svgKey: 'squares' },
  'cele-zero': { material: 'key_off', svgKey: 'key' },
  'cele-self': { material: 'hotel', svgKey: 'building' },
  'cele-bezp': { material: 'fact_check', svgKey: 'check' },
  'cele-wizer': { material: 'auto_awesome', svgKey: 'sparkles' },
  harmonogram: { material: 'calendar_month', svgKey: 'calendar' },
  'harm-f1': { material: 'looks_one', svgKey: 'calendar' },
  'harm-f2': { material: 'looks_two', svgKey: 'calendar' },
  'harm-f3': { material: 'looks_3', svgKey: 'calendar' },
  'harm-f4': { material: 'looks_4', svgKey: 'calendar' },
  produkty: { material: 'category', svgKey: 'puzzle' },
  'prod-zamek': { material: 'lock', svgKey: 'lock' },
  'prod-gateway': { material: 'router', svgKey: 'wifi' },
  'prod-app': { material: 'web', svgKey: 'globe' },
  'prod-alg': { material: 'pin', svgKey: 'hashtag' },
  zasoby: { material: 'inventory_2', svgKey: 'cube' },
  'zas-budzet': { material: 'account_balance', svgKey: 'wallet' },
  'zas-czas': { material: 'schedule', svgKey: 'clock' },
  'zas-zespol': { material: 'groups', svgKey: 'users' },
  'zas-partner': { material: 'handshake', svgKey: 'arrowsSwap' },
  'zas-it': { material: 'memory', svgKey: 'cpu' },
  zagrozenia: { material: 'warning', svgKey: 'alert' },
  'zag-testy': { material: 'science', svgKey: 'flask' },
  'zag-hw': { material: 'precision_manufacturing', svgKey: 'squares' },
  'zag-ceny': { material: 'trending_up', svgKey: 'chart' },
  'zag-lancuch': { material: 'local_shipping', svgKey: 'truck' },
  'zag-montaz': { material: 'door_front', svgKey: 'door' },
  'zag-sync': { material: 'sync_problem', svgKey: 'sync' },
  zakres: { material: 'design_services', svgKey: 'ruler' },
  'zak-app': { material: 'monitor', svgKey: 'monitor' },
  'zak-alg': { material: 'password', svgKey: 'lock' },
  'zak-hw': { material: 'bolt', svgKey: 'bolt' },
  'zak-testy': { material: 'fact_check', svgKey: 'check' },
  'zak-zigbee': { material: 'sensors', svgKey: 'wifi' },
};

/** Ścieżki SVG (Heroicons-style outline, stroke złoty) viewBox 0 0 24 24 */
export const SVG_PATHS = {
  sparkles:
    'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09zM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456zM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423z',
  check: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  banknotes: 'M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m0-12.75h7.5m-7.5 3H12m-3.75 3.375h18M7.5 19.5h3.375c.621 0 1.125-.504 1.125-1.125V17.25m-4.5 3.75h7.5',
  building: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008H17.25v-.008zm0 3.75h.008v.008H17.25v-.008zm0 3.75h.008v.008H17.25v-.008z',
  squares: 'M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25z',
  key: 'M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25z',
  shield: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  trophy: 'M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52a6.003 6.003 0 0 1-5.395 4.972m0 0a6.003 6.003 0 0 0 5.395-4.972M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228M18.75 4.236V2.721C16.544 2.41 14.29 2.25 12 2.25c-2.291 0-4.545.16-6.75.47v1.516',
  calendar: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5',
  puzzle: 'M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 0 0-3.586-.006l-.006.006a2.548 2.548 0 0 0-.006 3.586l5.653 4.655',
  lock: 'M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z',
  cpu: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 16.5V21m3.75-18v1.5m0 16.5V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z',
  globe: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418',
  hashtag: 'M5.25 8.25h15m-16.5 7.5h15m-13.5-3.75L8.25 5.25m3.75 9.75 3-7.5 3.75 9.75',
  cube: 'M21 7.5l-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9',
  wallet: 'M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9v3',
  clock: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  users: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
  arrowsSwap: 'M7.5 21 3 16.5m0 0 4.5-4.5M3 16.5h13.5m0-13.5 4.5 4.5m0 0-4.5 4.5M21 7.5H7.5',
  alert: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
  flask: 'M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.532.074a53.63 53.63 0 0 1-15.348 0l-.532-.074c-1.717-.293-2.303-2.379-1.067-3.61L5 14.5',
  chart: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125z',
  truck: 'M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
  door: 'M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  sync: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99',
  ruler: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5M5.25 3.75h1.5m-1.5 9h1.5m-1.5 5.25h1.5m3.75-16.5h1.5m-1.5 9h1.5m-1.5 5.25h1.5m3.75-16.5h1.5m-1.5 9h1.5m-1.5 5.25h1.5m3.75-16.5h1.5m-1.5 9h1.5m-1.5 5.25h1.5',
  monitor: 'M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z',
  bolt: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  wifi: 'M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l.53.53-.53.53-.53-.53.53-.53z',
};

const svgUrlCache = {};

export function svgPathToGoldDataUrl(pathKey, size = 128) {
  if (svgUrlCache[pathKey]) return svgUrlCache[pathKey];
  const d = SVG_PATHS[pathKey];
  if (!d) return null;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}"><path fill="none" stroke="%23d4af37" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="${d}"/></svg>`;
  const url = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  svgUrlCache[pathKey] = url;
  return url;
}

export function getNodeIconBackgroundUrl(nodeId) {
  const p = NODE_PICTOGRAM[nodeId];
  if (!p?.svgKey || !SVG_PATHS[p.svgKey]) return null;
  return svgPathToGoldDataUrl(p.svgKey);
}
