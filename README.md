# BeeSecure – mapa myśli (Warunki satysfakcji)

Interaktywna mapa **BeeSecure** w Cytoscape.js: przesuwanie, zoom, panel szczegółów. Struktura i treść odpowiadają projektowi Canva **DAHFE0q3JOk** („Warunki satysfakcji”): węzły z piktogramami (emoji), kwadraty, kolory gałęzi.

## Zawartość mapy

- **BeeSecure** (środek) → **Warunki satysfakcji** · **Cele** (cel główny + cele szczegółowe) · **Harmonogram** (4 fazy) · **Produkty** · **Zasoby** · **Zagrożenia** · **Zakres**
- Podwęzły z opisami zgodnymi z treścią z Canva (koszty, self check-in, skalowanie, klucze, bezpieczeństwo, konkurencyjność; fazy 1–24 mies.; zamek, gateway, aplikacja, algorytm; budżet/czas/zespół/partner/zaplecze; ryzyka; zakres prac).

Dane: `public/data/beesecure-mindmap-data.js`.  
Logo (lockup z Canvy): `public/assets/beesecure-logo-canva.png`.  
Wspólne menu z logo i linkami (Mind map · WBS · Diagram · Eksport): `public/site-chrome.css`.

### Układ dwukolumnowy

- **Lewo:** referencja slajdu Canvy — po dodaniu `public/assets/canva-slide-full.png` (eksport PNG całego slajdu) wyświetla się **1:1**; bez pliku budowany jest panel HTML z tą samą treścią i **Material Symbols** (jak typowe piktogramy w Canvie).
- **Prawo:** interaktywna mapa Cytoscape (te same znaczenia — ikony SVG złote w węzłach + legenda Material).

Piktogramy: `public/data/bee-pictograms.js` (`NODE_PICTOGRAM` — nazwy Material Symbols).  
Mapa ładuje te same ikony przez `public/data/material-iconify.js` (SVG z Iconify `material-symbols`, kolor złoty jak w legendzie).

## Uruchomienie (localhost, bez Supabase)

```bash
npm install
npm run dev
```

- **Mapa:** http://localhost:5173/  
- **WBS / harmonogram / diagram blokowy (dwie zakładki + ustawienia):** http://localhost:5173/wbs.html — *Harmonogram & WBS lista* oraz *Diagram blokowy WBS*; link w pasku do pełnego diagramu.  
- **Diagram blokowy WBS (pełna szerokość, jak `beesecure_wbs_diagram_1.html`):** http://localhost:5173/diagram.html  
- **Eksport graficzny (Canva / PDF):** http://localhost:5173/export.html  

Edycje węzłów domyślnie w **localStorage** (`beesecure_node_edits`). Opcjonalnie API zapisujące do pliku:

```bash
# Terminal 1
npm run server

# W .env: VITE_LOCAL_API_URL=http://localhost:3001

# Terminal 2
npm run dev
```

Zapis trafia do `data/node-edits.json`. Supabase można dodać później.

### Edycja treści węzłów

Po kliknięciu węzła: tytuł pod kwadratem, opis, notatki do prezentacji. **Zapis** / **Przywróć domyślne**.

## Wygląd

Ciemne tło, kwadratowe węzły z ikoną w środku, obramowania w kolorze gałęzi (`BEESECURE_BRANCH_COLORS`).

## Supabase — czy „wrzucić projekt”?

**Supabase nie hostuje frontu** w stylu „wrzuć folder i masz stronę”. To **PostgreSQL + API + Auth + Storage**. Typowy układ:

1. **Frontend (ta aplikacja Vite):** zbuduj `npm run build` i wdróż **`dist/`** na **Vercel**, **Netlify**, **Cloudflare Pages** (lub innym hostingu statycznym). W panelu hosta ustaw zmienne środowiskowe: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (i ewentualnie `VITE_LOCAL_API_URL` jeśli używasz własnego API).
2. **Backend / dane:** w projekcie Supabase (**SQL Editor** lub `supabase db push`) uruchom migracje z `supabase/migrations/`. Migracja `20260329120000_beesecure_branch_check.sql` dopuszcza gałęzie BeeSecure (`warunki`, `harmonogram`, …) w kolumnie `branch`.
3. **Wypełnienie tabeli:** dodaj wiersze do `mind_map_nodes` (id jak w `beesecure-mindmap-data.js`: `root`, `warunki`, `war-koszty`, …). Stare seedy TMS (`seed_danxils_three_ways.sql`) nie odpowiadają tej mapie — zrób własny seed lub import z SQL.

**Co robi aplikacja z Supabase dziś:** przy otwarciu węzła, jeśli są ustawione `VITE_SUPABASE_*`, odczytuje **`description`** z `mind_map_nodes` i może nim nadpisać tekst w panelu. **Zapis z panelu** idzie nadal do **localStorage** / **lokalnego API** (`node-edits.json`), nie do `upsert` w Supabase — pełna synchronizacja zapisu wymagałaby dopisania wywołań `supabase.from('mind_map_nodes').upsert(...)` (np. po zalogowaniu + RLS).

**Storage Supabase** teoretycznie może serwować pliki z `dist/`, ale to nietypowe i gorsze niż dedykowany hosting SPA (routing, nagłówki, CDN). **Edge Functions** nie zastąpią wygodnie całego Vite — sensowniej trzymać front osobno.

## Deploy (frontend)

`npm run build`, serwuj **`dist/`** (Vercel / Netlify / Cloudflare Pages) + zmienne `VITE_SUPABASE_*` jeśli używasz bazy.

### GitHub Pages (darmowy link do udostępnienia)

1. Wypchnij repo na GitHub (np. nazwa repozytorium `beesecure-mindmap`).
2. **Settings → Pages → Build and deployment**  
   - **Source** musi być **GitHub Actions** (wybierz z listy i zapisz).  
   - Jeśli jest **None** albo **Deploy from a branch**, krok **deploy** w workflow zwróci **404** (*Failed to create deployment*).  
   - Po zmianie na **GitHub Actions** uruchom workflow ponownie: **Actions** → **Deploy to GitHub Pages** → **Re-run all jobs**.
3. Pierwszy raz możesz zobaczyć prośbę o zatwierdzenie środowiska **`github-pages`** (Settings → Environments) — zaakceptuj wdrożenie.
4. Po pushu na `main` (lub `master`) workflow zbuduje stronę z `VITE_BASE_PATH` = **nazwa repozytorium** (np. repo `beesecure` → ścieżka `/beesecure/`).
5. Link publiczny: **`https://<twoj-login>.github.io/<nazwa-repo>/`**  
   Eksport graficzny: **`.../<nazwa-repo>/export.html`**

**Prywatne repozytorium:** na darmowym koncie GitHub Pages z Actions jest ograniczone; jeśli nadal 404, sprawdź [dokumentację](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) albo ustaw repo na **public**.

Podgląd jak na GitHub Pages (z prefiksem `/nazwa-repo/`):  
`VITE_BASE_PATH=nazwa-repo npm run build && VITE_BASE_PATH=nazwa-repo npx vite preview` → w terminalu zobaczysz URL (np. http://localhost:4173/nazwa-repo/).

Zmienne `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` możesz dodać w **Settings → Secrets and variables → Actions** jako zaszyfrowane i przekazać do kroku `Build` w workflow (wtedy dopisz `env:` w jobie — domyślnie workflow ich nie ustawia).

---

**Canva:** [design DAHFE0q3JOk](https://www.canva.com/design/DAHFE0q3JOk/_jUqA0k0TH48RstHZMmI4A/edit) – mapa w aplikacji odwzorowuje tę treść; układ graficzny Canvy (układ strony) różni się od układu concentric w Cytoscape – eksport `export.html` + zrzut ekranu ułatwia dopasowanie slajdu 1:1.
