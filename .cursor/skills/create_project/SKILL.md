---
name: create_project
description: Sets up the BeeSecure mind map project on localhost (no Supabase). Use when the user asks to create or run the project locally, run on localhost, or set up the BeeSecure Warunki satysfakcji map from Canva without Supabase. Supabase can be added later when license is extended.
---

# Create Project – BeeSecure Mind Map (localhost)

Sets up the **BeeSecure** mind map project (Warunki satysfakcji / Canva-aligned content) **on localhost, without Supabase**. Supabase can be added later after extending the license.

## Purpose

- **Mind map:** BeeSecure (project overview, satisfaction conditions, schedule, products, resources, risks, scope).
- **Content:** `public/data/beesecure-mindmap-data.js` (aligned with Canva design DAHFE0q3JOk).
- **Backend:** local API (saves edits to a file) or localStorage only.

## When to use

- User asks to run the project on localhost, without Supabase.
- User mentions BeeSecure, Warunki satysfakcji, or Canva mind map.

## Steps – run on localhost

### 1. Frontend (map)

```bash
npm install
npm run dev
```

- App: **http://localhost:5173**
- Node edits use **localStorage** by default (`beesecure_node_edits`).

### 2. Optional: local API (save to file)

To persist edits to `data/node-edits.json`:

1. `npm run server` → **http://localhost:3001**
2. In `.env` (from `env.example`): `VITE_LOCAL_API_URL=http://localhost:3001`
3. Second terminal: `npm run dev`

### 3. Verify

- Open http://localhost:5173, click a node → panel → **Zapisz**.
- With API: `data/node-edits.json` updates.

## Files

| File | Description |
|------|-------------|
| `server/local-api.mjs` | Local API (GET/POST edits), port 3001. |
| `data/node-edits.json` | Stored edits (created on first save via API). |
| `public/data/beesecure-mindmap-data.js` | Map data (BeeSecure / Canva structure). |
| `env.example` | Template: `VITE_LOCAL_API_URL`, Supabase optional. |

## Supabase (later)

Legacy TMS seeds (`supabase/seed/seed_danxils_three_ways.sql`) may not match BeeSecure node ids; update seed/migrations if you enable Supabase.
