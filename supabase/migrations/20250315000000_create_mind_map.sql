-- BeeSecure Mind Map – tabela węzłów (szczegóły po zbliżeniu / kliknięciu)
create table if not exists public.mind_map_nodes (
  id text primary key,
  parent_id text references public.mind_map_nodes(id) on delete set null,
  label text not null,
  description text,
  icon text,
  branch text not null check (branch in ('root','o-nas','klient','architektura','geneza')),
  "order" int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.mind_map_nodes is 'Węzły mapy myśli BeeSecure – dane do panelu szczegółów (Supabase).';

-- RLS: odczyt publiczny
alter table public.mind_map_nodes enable row level security;

create policy "mind_map_nodes_select"
  on public.mind_map_nodes for select
  using (true);

-- Opcjonalnie: tylko zalogowani mogą edytować
create policy "mind_map_nodes_all_authenticated"
  on public.mind_map_nodes for all
  using (auth.role() = 'authenticated');
