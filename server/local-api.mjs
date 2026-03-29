#!/usr/bin/env node
/**
 * Local API for BeeSecure mind map – read/write node edits to a JSON file.
 * Run: node server/local-api.mjs
 * Works without Supabase (localhost).
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const EDITS_FILE = path.join(ROOT, 'data', 'node-edits.json');
const PORT = Number(process.env.PORT) || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

function ensureDataDir() {
  const dir = path.dirname(EDITS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(EDITS_FILE)) fs.writeFileSync(EDITS_FILE, '{}', 'utf8');
}

function readEdits() {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(EDITS_FILE, 'utf8');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeEdits(edits) {
  ensureDataDir();
  fs.writeFileSync(EDITS_FILE, JSON.stringify(edits, null, 2), 'utf8');
}

function send(res, status, body, contentType = 'application/json') {
  res.writeHead(status, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': CORS_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let buf = '';
    req.on('data', (ch) => { buf += ch; });
    req.on('end', () => {
      try {
        resolve(buf ? JSON.parse(buf) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    send(res, 204, '');
    return;
  }

  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  const pathname = url.pathname;

  if (pathname === '/api/edits' && req.method === 'GET') {
    send(res, 200, readEdits());
    return;
  }

  if (pathname === '/api/edits' && req.method === 'POST') {
    const body = await parseBody(req);
    const { nodeId, label, description, presentationNotes } = body;
    if (!nodeId) {
      send(res, 400, { error: 'Missing nodeId' });
      return;
    }
    const edits = readEdits();
    edits[nodeId] = {
      ...edits[nodeId],
      ...(label !== undefined && { label: label || undefined }),
      ...(description !== undefined && { description: description || undefined }),
      ...(presentationNotes !== undefined && { presentationNotes: presentationNotes || undefined }),
      updatedAt: new Date().toISOString(),
    };
    writeEdits(edits);
    send(res, 200, { ok: true });
    return;
  }

  if (pathname === '/api/edits/remove' && req.method === 'POST') {
    const body = await parseBody(req);
    const { nodeId } = body;
    if (!nodeId) {
      send(res, 400, { error: 'Missing nodeId' });
      return;
    }
    const edits = readEdits();
    delete edits[nodeId];
    writeEdits(edits);
    send(res, 200, { ok: true });
    return;
  }

  send(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`BeeSecure local API: http://localhost:${PORT}`);
  console.log(`Edits saved to: ${EDITS_FILE}`);
});
