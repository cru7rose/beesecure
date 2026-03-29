-- BeeSecure: gałęzie mapy (warunki, harmonogram, …) + zachowanie starych wartości TMS / legacy
alter table public.mind_map_nodes
  drop constraint if exists mind_map_nodes_branch_check;

alter table public.mind_map_nodes
  add constraint mind_map_nodes_branch_check check (
    branch in (
      'root',
      'warunki',
      'harmonogram',
      'produkty',
      'zasoby',
      'zagrozenia',
      'zakres',
      'o-nas',
      'klient',
      'architektura',
      'geneza',
      'strategia',
      'operacje',
      'technologia',
      'ryzyka',
      'stakeholderzy',
      'kpi',
      'path1',
      'path2',
      'path3',
      'route_opt'
    )
  );
