-- ============================================
-- Migration: Itinerary Items
-- ============================================

create table public.itinerary_items (
  id              uuid primary key default gen_random_uuid(),
  trip_id         uuid not null references public.trips(id) on delete cascade,
  title           text not null,
  type            text not null default 'activity'
                  check (type in ('flight', 'hotel', 'food', 'activity')),
  start_time      timestamptz not null,
  end_time        timestamptz,
  location_name   text,
  location_lat    double precision,
  location_lng    double precision,
  notes           text,
  is_completed    boolean not null default false,
  created_by      uuid not null references auth.users(id) on delete cascade,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ============================================
-- RLS: Solo miembros del viaje
-- ============================================
alter table public.itinerary_items enable row level security;

create policy "Trip members can view itinerary"
  on public.itinerary_items for select using (
    is_trip_member(trip_id, auth.uid())
  );

create policy "Trip members can create items"
  on public.itinerary_items for insert
  with check (
    is_trip_member(trip_id, auth.uid())
  );

create policy "Trip members can update items"
  on public.itinerary_items for update using (
    is_trip_member(trip_id, auth.uid())
  );

create policy "Trip members can delete items"
  on public.itinerary_items for delete using (
    is_trip_member(trip_id, auth.uid())
  );

-- Trigger: updated_at
create trigger handle_itinerary_updated_at
  before update on public.itinerary_items
  for each row execute function handle_updated_at();

-- Índice para consultas por viaje y fecha
create index idx_itinerary_trip_time
  on public.itinerary_items (trip_id, start_time);
