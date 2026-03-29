#!/usr/bin/env node
/**
 * MCP serwer „Canvas” – projekt czysto graficzny BeeSecure.
 * Narzędzia: eksport URL, tokeny designu (kolory gałęzi), dane do Canva.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const BRANCH_COLORS = {
  root: '#fbbf24',
  'o-nas': '#f59e0b',
  klient: '#3b82f6',
  architektura: '#10b981',
  geneza: '#ef4444',
};

const NODES_FOR_CANVAS = [
  { id: 'root', label: 'BeeSecure', branch: 'root', icon: '🐝' },
  { id: 'o-nas', label: 'O nas', branch: 'o-nas', icon: '👥' },
  { id: 'klient', label: 'Klient & grupa docelowa', branch: 'klient', icon: '🎯' },
  { id: 'architektura', label: 'Architektura systemu', branch: 'architektura', icon: '🏗️' },
  { id: 'geneza', label: 'Geneza problemu', branch: 'geneza', icon: '💡' },
  { id: 'klient-uzytkownicy', label: 'Użytkownicy systemu', branch: 'klient', icon: '👤' },
  { id: 'zamek', label: 'Zamek elektroniczny', branch: 'architektura', icon: '🔐' },
  { id: 'gateway', label: 'Gateway', branch: 'architektura', icon: '📡' },
  { id: 'aplikacja', label: 'Aplikacja webowa', branch: 'architektura', icon: '🌐' },
  { id: 'geneza-bariery', label: 'Bariery rynkowe', branch: 'geneza', icon: '⚠️' },
  { id: 'zamek-pinpad', label: 'Zintegrowany pinpad', branch: 'architektura', icon: '⌨️' },
  { id: 'zamek-zigbee', label: 'Moduł ZigBee', branch: 'architektura', icon: '📶' },
  { id: 'zamek-kody', label: 'Kody czasowe', branch: 'architektura', icon: '⏱️' },
  { id: 'zamek-bateria', label: 'Zasilanie bateryjne', branch: 'architektura', icon: '🔋' },
  { id: 'zamek-klucz', label: 'Awaryjny klucz fizyczny', branch: 'architektura', icon: '🔑' },
  { id: 'gw-sync', label: 'Komunikacja serwer–urządzenie', branch: 'architektura', icon: '🔄' },
  { id: 'gw-zigbee', label: 'Integracja ZigBee', branch: 'architektura', icon: '📡' },
  { id: 'gw-lan', label: 'Lokalna sieć domowa', branch: 'architektura', icon: '🏠' },
  { id: 'app-kody', label: 'Generowanie kodów dostępu', branch: 'architektura', icon: '🔢' },
  { id: 'app-doba', label: 'Definiowanie doby hotelowej', branch: 'architektura', icon: '📅' },
  { id: 'app-serwis', label: 'Zarządzanie serwisantami', branch: 'architektura', icon: '🔧' },
  { id: 'app-admin', label: 'Zdalne administrowanie', branch: 'architektura', icon: '🖥️' },
  { id: 'gen-noc', label: 'Nocne zameldowania', branch: 'geneza', icon: '🌙' },
  { id: 'gen-koszty', label: 'Koszty personelu', branch: 'geneza', icon: '💰' },
  { id: 'gen-obecnosc', label: 'Konieczność obecności', branch: 'geneza', icon: '📍' },
  { id: 'gen-zagubione', label: 'Zagubione klucze', branch: 'geneza', icon: '❌' },
  { id: 'gen-kontrola', label: 'Brak kontroli nad dostępem', branch: 'geneza', icon: '🔒' },
  { id: 'gen-zdalnie', label: 'Zdalne zarządzanie', branch: 'geneza', icon: '🌍' },
];

const server = new McpServer({
  name: 'beesecure-canvas-mcp',
  version: '1.0.0',
});

server.registerTool('get_mindmap_design_tokens', {
  description: 'Zwraca tokeny designu mapy myśli BeeSecure (kolory gałęzi, legenda) do zachowania spójności z projektem Canva.',
  inputSchema: {},
}, async () => ({
  content: [
    {
      type: 'text',
      text: JSON.stringify({
        branchColors: BRANCH_COLORS,
        legend: [
          { branch: 'o-nas', label: 'O nas', color: BRANCH_COLORS['o-nas'] },
          { branch: 'klient', label: 'Klient', color: BRANCH_COLORS.klient },
          { branch: 'architektura', label: 'Architektura', color: BRANCH_COLORS.architektura },
          { branch: 'geneza', label: 'Geneza problemu', color: BRANCH_COLORS.geneza },
        ],
      }, null, 2),
    },
  ],
}));

server.registerTool('get_export_page_url', {
  description: 'Zwraca ścieżkę/URL strony eksportu graficznego (export.html) – czysto graficzna wersja do zrzutu ekranu lub Canva.',
  inputSchema: {},
}, async () => ({
  content: [
    {
      type: 'text',
      text: 'W projekcie uruchom `npm run dev` i otwórz: http://localhost:5173/export.html — strona tylko graficzna, bez panelu szczegółów. Użyj zrzutu ekranu lub „Drukuj → Zapisz jako PDF” i wgraj do Canva.',
    },
  ],
}));

server.registerTool('get_mindmap_nodes_for_canvas', {
  description: 'Zwraca listę węzłów mapy (id, label, branch, icon) do odtworzenia infografiki w Canva.',
  inputSchema: {},
}, async () => ({
  content: [{ type: 'text', text: JSON.stringify(NODES_FOR_CANVAS, null, 2) }],
}));

const transport = new StdioServerTransport();
await server.connect(transport);
