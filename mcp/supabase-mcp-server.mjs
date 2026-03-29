#!/usr/bin/env node
/**
 * MCP serwer „Supabase” – szczegóły mapy myśli po zbliżeniu/wybraniu węzła.
 * Wymaga: SUPABASE_URL, SUPABASE_ANON_KEY (lub SUPABASE_SERVICE_ROLE_KEY).
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;
if (SUPABASE_URL && SUPABASE_KEY) {
  const { createClient } = await import('@supabase/supabase-js');
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
}

const server = new McpServer({
  name: 'beesecure-supabase-mcp',
  version: '1.0.0',
});

server.registerTool('get_mind_map_nodes', {
  description: 'Pobiera wszystkie węzły mapy myśli BeeSecure z Supabase (id, label, parent_id, branch, icon, description).',
  inputSchema: {},
}, async () => {
  if (!supabase) {
    return {
      content: [{ type: 'text', text: 'Skonfiguruj SUPABASE_URL i SUPABASE_ANON_KEY (lub VITE_SUPABASE_*) w zmiennych środowiskowych MCP.' }],
      isError: true,
    };
  }
  const { data, error } = await supabase
    .from('mind_map_nodes')
    .select('id, parent_id, label, description, icon, branch, order')
    .order('order');
  if (error) {
    return { content: [{ type: 'text', text: `Błąd Supabase: ${error.message}` }], isError: true };
  }
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
});

server.registerTool('get_node_detail', {
  description: 'Pobiera szczegóły węzła po id – pełny opis do wyświetlenia po zbliżeniu/kliknięciu.',
  inputSchema: {
    node_id: z.string().describe('Id węzła, np. root, zamek, app-kody'),
  },
}, async ({ node_id }) => {
  if (!supabase) {
    return {
      content: [{ type: 'text', text: 'Skonfiguruj SUPABASE_URL i SUPABASE_ANON_KEY w zmiennych środowiskowych MCP.' }],
      isError: true,
    };
  }
  const { data, error } = await supabase
    .from('mind_map_nodes')
    .select('*')
    .eq('id', node_id)
    .single();
  if (error || !data) {
    return {
      content: [{ type: 'text', text: error ? `Błąd: ${error.message}` : 'Nie znaleziono węzła.' }],
      isError: true,
    };
  }
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
