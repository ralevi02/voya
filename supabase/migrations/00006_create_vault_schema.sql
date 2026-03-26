-- ============================================
-- Migration: Travel Documents Vault
-- ============================================

create table public.travel_documents (
  id                          uuid primary key default gen_random_uuid(),
  trip_id                     uuid not null references public.trips(id) on delete cascade,
  owner_id                    uuid not null references auth.users(id) on delete cascade,
  name                        text not null,
  doc_type                    text not null default 'other'
                              check (doc_type in (
                                'flight','hotel','insurance','passport','other'
                              )),
  file_url                    text not null,
  file_size                   integer,
  mime_type                   text,
  associated_itinerary_item_id uuid references public.itinerary_items(id) on delete set null,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);

-- ============================================
-- RLS: travel_documents
-- ============================================
alter table public.travel_documents enable row level security;

create policy "Trip members can view documents"
  on public.travel_documents for select using (
    is_trip_member(trip_id, auth.uid())
  );

create policy "Trip members can upload documents"
  on public.travel_documents for insert
  with check (
    is_trip_member(trip_id, auth.uid())
    and auth.uid() = owner_id
  );

create policy "Owner can update documents"
  on public.travel_documents for update using (
    auth.uid() = owner_id
  );

create policy "Owner can delete documents"
  on public.travel_documents for delete using (
    auth.uid() = owner_id
  );

-- Trigger: updated_at
create trigger handle_travel_documents_updated_at
  before update on public.travel_documents
  for each row execute function handle_updated_at();

-- Índices
create index idx_documents_trip
  on public.travel_documents (trip_id);

create index idx_documents_itinerary
  on public.travel_documents (associated_itinerary_item_id)
  where associated_itinerary_item_id is not null;

-- ============================================
-- Storage: Bucket vault
-- Ejecutar manualmente en Supabase Dashboard:
--
-- 1. Ir a Storage > New bucket
-- 2. Name: "vault", Public: OFF
-- 3. Crear las siguientes policies en el bucket:
--
-- SELECT (download):
--   auth.uid() IN (
--     SELECT tm.user_id FROM trip_members tm
--     JOIN travel_documents td ON td.trip_id = tm.trip_id
--     WHERE td.file_url LIKE '%' || storage.filename(name)
--   )
--
-- INSERT (upload):
--   auth.role() = 'authenticated'
--
-- DELETE:
--   auth.uid()::text = (storage.foldername(name))[1]
-- ============================================
