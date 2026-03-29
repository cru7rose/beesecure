-- DANXILS Mind Map: 3 ways to proceed with TMS + route-optimization tool
-- Uruchom po migracjach (np. Supabase SQL Editor lub: psql $DATABASE_URL -f supabase/seed/seed_danxils_three_ways.sql)

insert into public.mind_map_nodes (id, parent_id, label, description, icon, branch, "order", presentation_notes) values
('root', null, 'DANXILS', 'Analiza systemu TMS – przegląd strategiczny dla Board of Directors. Kluczowe obszary: strategia, operacje, technologia, ryzyka, stakeholderzy, KPI.', '📋', 'root', 0, null),

('three-ways', 'root', '3 sposoby realizacji TMS', 'Trzy ścieżki wdrożenia TMS i narzędzia optymalizacji tras – do wyboru przez CEO/CTO.', '🛤️', 'strategia', 0, 'Prezentacja: 3 opcje strategiczne; wybór zależny od budżetu, czasu, zasobów IT.'),

('path1', 'three-ways', 'Ścieżka 1: Pełna platforma TMS', 'Wdrożenie zintegrowanej platformy TMS (build lub buy) – planowanie, śledzenie, rozliczenia w jednym systemie.', '🏗️', 'path1', 0, 'CEO: jedna umowa, jeden dostawca. CTO: integracje w jednym miejscu.'),
('path2', 'three-ways', 'Ścieżka 2: Best-of-breed (TMS + narzędzia)', 'TMS jako rdzeń + dedykowane narzędzia (np. optymalizacja tras, telematyka) – łączenie najlepszych rozwiązań.', '🧩', 'path2', 1, 'Większa elastyczność; wymaga integracji i utrzymania wielu systemów.'),
('path3', 'three-ways', 'Ścieżka 3: Fazy (najpierw optymalizacja tras)', 'Start od narzędzia do optymalizacji tras; w kolejnej fazie rozbudowa do pełnego TMS.', '📈', 'path3', 2, 'Niższy koszt wejścia; szybki zwrot z optymalizacji; TMS w kolejnym budżecie.'),

('route-opt', 'root', 'Narzędzie optymalizacji tras', 'Dedykowane narzędzie do optymalizacji tras (route optimization): planowanie, ładunki, koszty, punkty dostaw.', '🗺️', 'route_opt', 1, 'Wspólny element dla wszystkich 3 ścieżek; może być modułem TMS lub osobnym produktem.')
on conflict (id) do update set
  parent_id = excluded.parent_id,
  label = excluded.label,
  description = excluded.description,
  icon = excluded.icon,
  branch = excluded.branch,
  "order" = excluded."order",
  presentation_notes = excluded.presentation_notes,
  updated_at = now();
