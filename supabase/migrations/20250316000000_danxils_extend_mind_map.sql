-- DANXILS: rozszerzenie mind_map_nodes (notatki do prezentacji CEO/CTO, branże pod 3 ścieżki TMS + route-optimization)
alter table public.mind_map_nodes
  add column if not exists presentation_notes text;

comment on column public.mind_map_nodes.presentation_notes is 'Notatki do prezentacji (CEO/CTO) – punkty, decyzje, rozwój systemowy.';

-- Usuń stary check branch (BeeSecure), dodaj szerszy (DANXILS: strategia, operacje, technologia, ryzyka, stakeholderzy, kpi, path1–3, route_opt)
alter table public.mind_map_nodes
  drop constraint if exists mind_map_nodes_branch_check;

alter table public.mind_map_nodes
  add constraint mind_map_nodes_branch_check check (
    branch in (
      'root',
      'o-nas', 'klient', 'architektura', 'geneza',
      'strategia', 'operacje', 'technologia', 'ryzyka', 'stakeholderzy', 'kpi',
      'path1', 'path2', 'path3', 'route_opt'
    )
  );
