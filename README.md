# BeeSecure – mapa myśli (Warunki satysfakcji)

Interaktywna mapa **BeeSecure** w Cytoscape.js: przesuwanie, zoom, panel szczegółów. Struktura i treść odpowiadają projektowi Canva **DAHFE0q3JOk** („Warunki satysfakcji”): węzły z piktogramami (emoji), kwadraty, kolory gałęzi.

## Zawartość mapy

- **BeeSecure** (środek) → **Warunki satysfakcji** · **Harmonogram** (4 fazy) · **Produkty** · **Zasoby** · **Zagrożenia** · **Zakres**
- Podwęzły z opisami zgodnymi z treścią z Canva (koszty, self check-in, skalowanie, klucze, bezpieczeństwo, konkurencyjność; fazy 1–24 mies.; zamek, gateway, aplikacja, algorytm; budżet/czas/zespół/partner/zaplecze; ryzyka; zakres prac).

Dane: `public/data/beesecure-mindmap-data.js`.  
Logo (lockup z Canvy): `public/assets/beesecure-logo-canva.png`.

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

## Supabase (opcjonalnie)

Stare migracje/seedy pod TMS mogą nie pasować do nowych id węzłów BeeSecure. Jeśli używasz bazy, dostosuj seed lub tabelę `mind_map_nodes` do struktury z `beesecure-mindmap-data.js`.

## Deploy

`npm run build`, serwuj `dist` (np. Vercel / Netlify).

---

**Canva:** [design DAHFE0q3JOk](https://www.canva.com/design/DAHFE0q3JOk/_jUqA0k0TH48RstHZMmI4A/edit) – mapa w aplikacji odwzorowuje tę treść; układ graficzny Canvy (układ strony) różni się od układu concentric w Cytoscape – eksport `export.html` + zrzut ekranu ułatwia dopasowanie slajdu 1:1.
