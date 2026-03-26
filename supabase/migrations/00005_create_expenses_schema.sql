-- ============================================
-- Migration: Expenses, Splits & Exchange Rates
-- ============================================

-- Tabla de gastos
create table public.expenses (
  id             uuid primary key default gen_random_uuid(),
  trip_id        uuid not null references public.trips(id) on delete cascade,
  paid_by        uuid not null references auth.users(id) on delete cascade,
  title          text not null,
  amount         numeric(12,2) not null check (amount > 0),
  currency       text not null default 'USD',
  exchange_rate  numeric(14,6) not null default 1.0,
  base_amount    numeric(12,2) not null,
  category       text not null default 'other'
                 check (category in (
                   'food','transport','lodging','activity',
                   'shopping','health','communication','other'
                 )),
  description    text,
  expense_date   date not null default current_date,
  receipt_url    text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Tabla de divisiones por usuario
create table public.expense_splits (
  id           uuid primary key default gen_random_uuid(),
  expense_id   uuid not null references public.expenses(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  amount_owed  numeric(12,2) not null check (amount_owed >= 0),
  is_settled   boolean not null default false,
  created_at   timestamptz not null default now(),

  unique(expense_id, user_id)
);

-- Caché server-side de tasas de cambio
create table public.exchange_rates (
  id              uuid primary key default gen_random_uuid(),
  base_currency   text not null,
  target_currency text not null,
  rate            numeric(14,6) not null,
  fetched_at      timestamptz not null default now(),

  unique(base_currency, target_currency)
);

-- ============================================
-- RLS: expenses
-- ============================================
alter table public.expenses enable row level security;

create policy "Trip members can view expenses"
  on public.expenses for select using (
    is_trip_member(trip_id, auth.uid())
  );

create policy "Trip members can create expenses"
  on public.expenses for insert
  with check (
    is_trip_member(trip_id, auth.uid())
  );

create policy "Trip members can update expenses"
  on public.expenses for update using (
    is_trip_member(trip_id, auth.uid())
  );

create policy "Trip members can delete expenses"
  on public.expenses for delete using (
    is_trip_member(trip_id, auth.uid())
  );

-- ============================================
-- RLS: expense_splits
-- ============================================
alter table public.expense_splits enable row level security;

create policy "Members can view splits"
  on public.expense_splits for select using (
    exists (
      select 1 from public.expenses e
      where e.id = expense_id
        and is_trip_member(e.trip_id, auth.uid())
    )
  );

create policy "Members can create splits"
  on public.expense_splits for insert
  with check (
    exists (
      select 1 from public.expenses e
      where e.id = expense_id
        and is_trip_member(e.trip_id, auth.uid())
    )
  );

-- ============================================
-- RLS: exchange_rates (lectura pública autenticada)
-- ============================================
alter table public.exchange_rates enable row level security;

create policy "Authenticated users can view rates"
  on public.exchange_rates for select
  using (auth.uid() is not null);

create policy "Authenticated users can upsert rates"
  on public.exchange_rates for insert
  with check (auth.uid() is not null);

create policy "Authenticated users can update rates"
  on public.exchange_rates for update
  using (auth.uid() is not null);

-- ============================================
-- RPC: Creación atómica de gasto + splits
-- ============================================
create or replace function public.create_expense_with_splits(
  p_trip_id        uuid,
  p_title          text,
  p_amount         numeric,
  p_currency       text,
  p_exchange_rate  numeric,
  p_base_amount    numeric,
  p_category       text,
  p_description    text default null,
  p_expense_date   date default current_date,
  p_receipt_url    text default null,
  p_splits         jsonb default '[]'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_expense_id uuid;
  v_split      jsonb;
begin
  insert into expenses (
    trip_id, paid_by, title, amount, currency,
    exchange_rate, base_amount, category,
    description, expense_date, receipt_url
  ) values (
    p_trip_id, auth.uid(), p_title, p_amount, p_currency,
    p_exchange_rate, p_base_amount, p_category,
    p_description, p_expense_date, p_receipt_url
  ) returning id into v_expense_id;

  for v_split in select * from jsonb_array_elements(p_splits)
  loop
    insert into expense_splits (expense_id, user_id, amount_owed)
    values (
      v_expense_id,
      (v_split->>'user_id')::uuid,
      (v_split->>'amount_owed')::numeric
    );
  end loop;

  return v_expense_id;
end;
$$;

-- Triggers
create trigger handle_expenses_updated_at
  before update on public.expenses
  for each row execute function handle_updated_at();

-- Índices
create index idx_expenses_trip_date
  on public.expenses (trip_id, expense_date);

create index idx_splits_expense
  on public.expense_splits (expense_id);

create index idx_splits_user
  on public.expense_splits (user_id);

create index idx_exchange_rates_pair
  on public.exchange_rates (base_currency, target_currency);
