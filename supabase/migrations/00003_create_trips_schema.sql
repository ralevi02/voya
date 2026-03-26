-- ============================================
-- Migration: Trips & Trip Members
-- ============================================

-- Tabla de viajes
create table public.trips (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  description  text,
  destination  text not null,
  start_date   date not null,
  end_date     date not null,
  base_currency text not null default 'USD',
  cover_image  text,
  created_by   uuid not null references auth.users(id) on delete cascade,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  constraint trips_dates_check check (end_date >= start_date)
);

-- Tabla de miembros
create table public.trip_members (
  id        uuid primary key default gen_random_uuid(),
  trip_id   uuid not null references public.trips(id) on delete cascade,
  user_id   uuid not null references auth.users(id) on delete cascade,
  role      text not null default 'admin'
            check (role in ('admin', 'editor', 'viewer')),
  joined_at timestamptz not null default now(),

  unique(trip_id, user_id)
);

-- ============================================
-- Helper: security definer para evitar recursión en RLS
-- ============================================
create or replace function public.is_trip_member(
  p_trip_id uuid, p_user_id uuid
)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from trip_members
    where trip_id = p_trip_id and user_id = p_user_id
  );
$$;

-- ============================================
-- RLS: trips
-- ============================================
alter table public.trips enable row level security;

create policy "Members can view their trips"
  on public.trips for select using (
    is_trip_member(id, auth.uid())
  );

create policy "Authenticated users can create trips"
  on public.trips for insert
  with check (auth.uid() = created_by);

create policy "Admins and editors can update trips"
  on public.trips for update using (
    is_trip_member(id, auth.uid())
  );

create policy "Only admins can delete trips"
  on public.trips for delete using (
    is_trip_member(id, auth.uid())
  );

-- ============================================
-- RLS: trip_members
-- ============================================
alter table public.trip_members enable row level security;

create policy "Members can view trip members"
  on public.trip_members for select using (
    is_trip_member(trip_id, auth.uid())
  );

create policy "Admins can add members"
  on public.trip_members for insert
  with check (
    is_trip_member(trip_id, auth.uid())
  );

-- ============================================
-- RPC: Creación atómica de viaje + miembro
-- ============================================
create or replace function public.create_trip_with_member(
  p_name         text,
  p_destination  text,
  p_start_date   date,
  p_end_date     date,
  p_description  text default null,
  p_base_currency text default 'USD',
  p_cover_image  text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_trip_id uuid;
begin
  insert into trips (name, destination, start_date, end_date,
    description, base_currency, cover_image, created_by)
  values (p_name, p_destination, p_start_date, p_end_date,
    p_description, p_base_currency, p_cover_image, auth.uid())
  returning id into v_trip_id;

  insert into trip_members (trip_id, user_id, role)
  values (v_trip_id, auth.uid(), 'admin');

  return v_trip_id;
end;
$$;

-- Trigger: updated_at (reutiliza la función existente)
create trigger handle_trips_updated_at
  before update on public.trips
  for each row execute function handle_updated_at();
