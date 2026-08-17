-- ═══ Behind the Sun — initial schema ═══════════════════════════════
-- Every table is owner-scoped through RLS. Nothing is readable across users.

create extension if not exists "pgcrypto";

-- ── profiles ──────────────────────────────────────────────────────
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale       text not null default 'fa',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── saved birth data + computed chart ─────────────────────────────
create table public.charts (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  label         text not null default 'چارت من',

  -- input, kept verbatim so a chart can always be recomputed
  calendar      text not null check (calendar in ('shamsi','miladi')),
  birth_year    int  not null,
  birth_month   int  not null check (birth_month between 1 and 12),
  birth_day     int  not null check (birth_day   between 1 and 31),
  birth_hour    int  check (birth_hour   between 0 and 23),
  birth_minute  int  check (birth_minute between 0 and 59),
  time_known    boolean not null default true,
  city_fa       text not null,
  lat           double precision not null check (lat between -90 and 90),
  lon           double precision not null check (lon between -180 and 180),
  tz            text not null,
  house_system  text not null default 'whole' check (house_system in ('whole','placidus')),

  -- computed output, cached
  computed      jsonb,
  computed_at   timestamptz,
  engine_version text not null default '1',

  is_primary    boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index charts_user_idx on public.charts(user_id, created_at desc);
create unique index charts_one_primary on public.charts(user_id) where is_primary;

-- ── interpretation cache ──────────────────────────────────────────
-- Placement text is identical for everyone, so it is cached globally and
-- carries no user_id. This is what keeps the model bill flat as we grow.
create table public.interpretations (
  id         uuid primary key default gen_random_uuid(),
  cache_key  text not null unique,       -- e.g. "p:mars:سنبله:3:R"
  kind       text not null check (kind in ('placement','overview')),
  body_key   text,
  sign_fa    text,
  house      int,
  retrograde boolean,
  text       text not null,
  model      text not null,
  created_at timestamptz not null default now()
);
create index interpretations_key_idx on public.interpretations(cache_key);

-- ── daily reading log (streaks, "one per day" rules) ──────────────
create table public.readings (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  kind       text not null check (kind in ('hafez','tarot','numerology','transit')),
  payload    jsonb not null,
  local_date date not null,
  created_at timestamptz not null default now()
);
create index readings_user_idx on public.readings(user_id, created_at desc);
create unique index readings_one_per_day on public.readings(user_id, kind, local_date);

-- ── waitlist (pre-launch, no auth required) ───────────────────────
create table public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  source     text,
  created_at timestamptz not null default now()
);

-- ═══ Row Level Security ════════════════════════════════════════════
alter table public.profiles        enable row level security;
alter table public.charts          enable row level security;
alter table public.readings        enable row level security;
alter table public.interpretations enable row level security;
alter table public.waitlist        enable row level security;

create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "own charts" on public.charts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own readings" on public.readings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Interpretations are shared reference text: readable by anyone signed in,
-- writable only by the service role (the API route).
create policy "read interpretations" on public.interpretations
  for select to authenticated using (true);

-- Waitlist: anyone may add themselves, nobody may read the list back.
create policy "join waitlist" on public.waitlist
  for insert to anon, authenticated with check (true);

-- ═══ Triggers ══════════════════════════════════════════════════════
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();
create trigger charts_touch before update on public.charts
  for each row execute function public.touch_updated_at();

-- Create a profile row automatically on sign-up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', null))
  on conflict (id) do nothing;
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
