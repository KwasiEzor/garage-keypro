-- ═══════════════════════════════════════════════════════════════════════
--  KEYPRO SERVICE CENTER — schéma complet de la base
--
--  Ce fichier décrit la STRUCTURE seulement : tables, index, fonctions,
--  déclencheurs et règles de sécurité. Il ne contient AUCUNE donnée
--  client — celles-ci ne doivent jamais entrer dans le dépôt git.
--
--  Pour recréer la base à zéro sur un nouveau projet Supabase :
--    1. Coller ce fichier dans l'éditeur SQL et exécuter
--    2. npm run db:seed          → importe le contenu du site
--    3. npm run db:admin -- …    → crée le premier compte
--
--  Voir docs/TABLEAU-DE-BORD.md pour le détail.
-- ═══════════════════════════════════════════════════════════════════════


-- ═══════════════════════════ FONCTIONS ═══════════════════════════

-- Horodatage automatique de la colonne updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- L'utilisateur courant est-il administrateur ?
--
-- ⚠️ SECURITY DEFINER est indispensable : cette fonction est appelée par
-- les politiques posées sur admin_users. Sans elle, une politique qui
-- interrogerait admin_users directement provoquerait une récursion infinie.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admin_users where id = auth.uid());
$$;

-- L'utilisateur courant est-il responsable ? (même raison)
create or replace function public.is_owner()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.admin_users where id = auth.uid() and role = 'owner'
  );
$$;

-- Référence lisible des interventions : KP-2026-0001
create sequence if not exists public.job_reference_seq;

create or replace function public.set_job_reference()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.reference is null then
    new.reference := 'KP-' || to_char(now(), 'YYYY') || '-' ||
                     lpad(nextval('public.job_reference_seq')::text, 4, '0');
  end if;
  return new;
end;
$$;


-- ═══════════════════════ CONTENU DU SITE ═══════════════════════

-- Paramètres généraux — une seule ligne
create table if not exists public.settings (
  id            boolean primary key default true,
  business_name text        not null default 'KEYPRO SERVICE CENTER',
  email         text        not null,
  country_code  text        not null default '+228',
  phones        text[]      not null default '{}',
  whatsapp      text        not null,
  address       jsonb       not null default '{}'::jsonb,
  geo           jsonb       not null default '{"lat":6.2094,"lng":1.2069,"zoom":14}'::jsonb,
  hours         jsonb       not null default '{}'::jsonb,
  social        jsonb       not null default '{}'::jsonb,
  currency      text        not null default 'FCFA',
  updated_at    timestamptz not null default now(),
  constraint settings_singleton check (id)
);

create table if not exists public.coverage_zones (
  id        uuid primary key default gen_random_uuid(),
  name      text    not null unique,
  position  integer not null default 0,
  published boolean not null default true
);

-- Titres et paragraphes, adressés par clé (ex. home.heroSubtitle)
create table if not exists public.page_texts (
  key        text primary key,
  fr         text not null default '',
  en         text not null default '',
  note       text,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id           uuid primary key default gen_random_uuid(),
  slug         text    not null unique,
  icon         text    not null default 'key',
  position     integer not null default 0,
  published    boolean not null default true,
  title_fr     text not null,          title_en   text not null,
  short_fr     text not null default '', short_en text not null default '',
  details_fr   text[] not null default '{}', details_en text[] not null default '{}',
  image_url    text,
  image_alt_fr text default '',        image_alt_en text default '',
  updated_at   timestamptz not null default now()
);

create table if not exists public.brand_regions (
  id           uuid primary key default gen_random_uuid(),
  position     integer not null default 0,
  published    boolean not null default true,
  name_fr      text not null, name_en text not null,
  image_url    text,
  image_alt_fr text default '', image_alt_en text default ''
);

create table if not exists public.brands (
  id        uuid primary key default gen_random_uuid(),
  region_id uuid not null references public.brand_regions(id) on delete cascade,
  name      text    not null,
  position  integer not null default 0,
  published boolean not null default true
);
create index if not exists brands_region_idx on public.brands(region_id, position);

create table if not exists public.process_steps (
  id           uuid primary key default gen_random_uuid(),
  position     integer not null default 0,
  published    boolean not null default true,
  title_fr     text not null,          title_en text not null,
  text_fr      text not null default '', text_en text not null default '',
  image_url    text,
  image_alt_fr text default '',        image_alt_en text default ''
);

create table if not exists public.advantages (
  id           uuid primary key default gen_random_uuid(),
  position     integer not null default 0,
  published    boolean not null default true,
  icon         text not null default 'bolt',
  title_fr     text not null,          title_en text not null,
  text_fr      text not null default '', text_en text not null default '',
  image_url    text,
  image_alt_fr text default '',        image_alt_en text default ''
);

create table if not exists public.testimonials (
  id         uuid primary key default gen_random_uuid(),
  position   integer not null default 0,
  published  boolean not null default true,
  author     text not null,
  role_fr    text default '', role_en text default '',
  quote_fr   text not null,   quote_en text not null,
  rating     smallint not null default 5 check (rating between 1 and 5),
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id         uuid primary key default gen_random_uuid(),
  position   integer not null default 0,
  published  boolean not null default true,
  image_url  text not null,
  caption_fr text not null default '', caption_en text not null default '',
  credit     text
);

create table if not exists public.chatbot_answers (
  id        uuid primary key default gen_random_uuid(),
  position  integer not null default 0,
  published boolean not null default true,
  keys_fr   text[] not null default '{}', text_fr text not null default '',
  keys_en   text[] not null default '{}', text_en text not null default ''
);

-- Visuels uniques : héros, bandeaux de page, collage « À propos »
create table if not exists public.media_slots (
  slot       text primary key,
  image_url  text not null,
  alt_fr     text default '', alt_en text default '',
  credit     text,
  updated_at timestamptz not null default now()
);


-- ══════════════════════ EXPLOITATION ATELIER ══════════════════════

-- Personnes autorisées à ouvrir le tableau de bord
create table if not exists public.admin_users (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  role       text not null default 'staff' check (role in ('owner','staff')),
  created_at timestamptz not null default now()
);

create table if not exists public.quote_requests (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  name           text not null,
  phone          text not null,
  email          text,
  vehicle        text,
  service        text,
  mode           text,
  preferred_date date,
  message        text not null,
  locale         text not null default 'fr',
  source         text not null default 'site'
                 check (source in ('site','whatsapp','telephone','visite')),
  status         text not null default 'nouvelle'
                 check (status in ('nouvelle','en_cours','devis_envoye','acceptee','refusee','close')),
  internal_note  text,
  handled_by     uuid references public.admin_users(id) on delete set null,
  handled_at     timestamptz,
  -- RGPD : consentement au traitement des données, coché sur le formulaire
  consent        boolean not null default false,
  -- Bornes de saisie : limitent l'abus depuis le formulaire public
  constraint quote_name_len    check (char_length(name)    between 2 and 120),
  constraint quote_phone_len   check (char_length(phone)   between 6 and 40),
  constraint quote_message_len check (char_length(message) between 3 and 4000),
  constraint quote_email_len   check (email   is null or char_length(email)   <= 200),
  constraint quote_vehicle_len check (vehicle is null or char_length(vehicle) <= 200),
  constraint quote_service_len check (service is null or char_length(service) <= 200),
  constraint quote_mode_len    check (mode    is null or char_length(mode)    <= 80),
  constraint quote_locale_ok   check (locale in ('fr','en'))
);
create index if not exists quote_requests_status_idx       on public.quote_requests(status, created_at desc);
create index if not exists quote_requests_created_idx      on public.quote_requests(created_at desc);
create index if not exists quote_requests_phone_recent_idx on public.quote_requests(phone, created_at desc);

create table if not exists public.customers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  email      text,
  address    text,
  note       text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists customers_phone_idx on public.customers(phone);
create index if not exists customers_name_idx  on public.customers(lower(name));

create table if not exists public.vehicles (
  id          uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  make        text not null,
  model       text,
  year        smallint check (year between 1950 and 2100),
  plate       text,
  vin         text,
  key_type    text check (key_type in ('mecanique','transpondeur','smart_key','telecommande','inconnu')),
  note        text,
  created_at  timestamptz not null default now()
);
create index if not exists vehicles_customer_idx on public.vehicles(customer_id);
create index if not exists vehicles_plate_idx    on public.vehicles(upper(plate));

create table if not exists public.jobs (
  id               uuid primary key default gen_random_uuid(),
  reference        text unique,
  customer_id      uuid references public.customers(id) on delete set null,
  vehicle_id       uuid references public.vehicles(id) on delete set null,
  quote_request_id uuid references public.quote_requests(id) on delete set null,
  service_slug     text,
  title            text not null,
  description      text,
  location         text,
  is_mobile        boolean not null default false,
  status           text not null default 'planifiee'
                   check (status in ('planifiee','en_cours','terminee','facturee','annulee')),
  amount_fcfa      integer check (amount_fcfa >= 0),
  paid             boolean not null default false,
  technician       text,
  scheduled_at     timestamptz,
  completed_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists jobs_status_idx   on public.jobs(status, created_at desc);
create index if not exists jobs_customer_idx on public.jobs(customer_id);
create index if not exists jobs_vehicle_idx  on public.jobs(vehicle_id);


-- ═══════════════ ANTI-SPAM DU FORMULAIRE PUBLIC ═══════════════

create or replace function public.limiter_debit_devis()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  memes_coordonnees integer;
  total_recent      integer;
begin
  -- Les demandes saisies par l'équipe ne sont pas concernées
  if new.source <> 'site' then
    return new;
  end if;

  select count(*) into memes_coordonnees
  from public.quote_requests
  where phone = new.phone and created_at > now() - interval '1 hour';

  if memes_coordonnees >= 3 then
    raise exception 'Trop de demandes envoyées depuis ce numéro. Réessayez dans une heure ou appelez-nous.'
      using errcode = 'check_violation';
  end if;

  select count(*) into total_recent
  from public.quote_requests
  where created_at > now() - interval '10 minutes';

  if total_recent >= 20 then
    raise exception 'Trop de demandes reçues en ce moment. Réessayez dans quelques minutes.'
      using errcode = 'check_violation';
  end if;

  return new;
end;
$$;


-- ═══════════════════════ DÉCLENCHEURS ═══════════════════════

drop trigger if exists settings_touch    on public.settings;
drop trigger if exists page_texts_touch  on public.page_texts;
drop trigger if exists services_touch    on public.services;
drop trigger if exists media_slots_touch on public.media_slots;
drop trigger if exists customers_touch   on public.customers;
drop trigger if exists jobs_touch        on public.jobs;
drop trigger if exists jobs_reference    on public.jobs;
drop trigger if exists quote_requests_debit on public.quote_requests;

create trigger settings_touch    before update on public.settings    for each row execute function public.touch_updated_at();
create trigger page_texts_touch  before update on public.page_texts  for each row execute function public.touch_updated_at();
create trigger services_touch    before update on public.services    for each row execute function public.touch_updated_at();
create trigger media_slots_touch before update on public.media_slots for each row execute function public.touch_updated_at();
create trigger customers_touch   before update on public.customers   for each row execute function public.touch_updated_at();
create trigger jobs_touch        before update on public.jobs        for each row execute function public.touch_updated_at();
create trigger jobs_reference    before insert on public.jobs        for each row execute function public.set_job_reference();
create trigger quote_requests_debit before insert on public.quote_requests for each row execute function public.limiter_debit_devis();


-- ═════════════════ DROITS SUR LES FONCTIONS ═════════════════
--
-- Les fonctions de déclencheur sont invoquées par le moteur, jamais par
-- l'API : personne n'a besoin du droit d'exécution.

revoke all on function public.touch_updated_at()     from public, anon, authenticated;
revoke all on function public.set_job_reference()    from public, anon, authenticated;
revoke all on function public.limiter_debit_devis()  from public, anon, authenticated;

-- is_admin() et is_owner() sont évaluées par les politiques des comptes
-- connectés. Les visiteurs anonymes n'en ont jamais besoin.
revoke all on function public.is_admin() from public, anon;
revoke all on function public.is_owner() from public, anon;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_owner() to authenticated;


-- ═══════════ SÉCURITÉ AU NIVEAU DES LIGNES (RLS) ═══════════
--
--  · le contenu publié est lisible par tout le monde (le site est public)
--  · seuls les administrateurs peuvent écrire
--  · un visiteur peut déposer une demande de devis, jamais la relire
--  · les données clients ne sont jamais exposées publiquement

alter table public.settings        enable row level security;
alter table public.coverage_zones  enable row level security;
alter table public.page_texts      enable row level security;
alter table public.services        enable row level security;
alter table public.brand_regions   enable row level security;
alter table public.brands          enable row level security;
alter table public.process_steps   enable row level security;
alter table public.advantages      enable row level security;
alter table public.testimonials    enable row level security;
alter table public.gallery_items   enable row level security;
alter table public.chatbot_answers enable row level security;
alter table public.media_slots     enable row level security;
alter table public.admin_users     enable row level security;
alter table public.quote_requests  enable row level security;
alter table public.customers       enable row level security;
alter table public.vehicles        enable row level security;
alter table public.jobs            enable row level security;

-- ─── Contenu : lecture publique ───
create policy "lecture publique" on public.settings       for select to anon, authenticated using (true);
create policy "lecture publique" on public.page_texts     for select to anon, authenticated using (true);
create policy "lecture publique" on public.media_slots    for select to anon, authenticated using (true);
create policy "lecture publique" on public.coverage_zones  for select to anon, authenticated using (published);
create policy "lecture publique" on public.services        for select to anon, authenticated using (published);
create policy "lecture publique" on public.brand_regions   for select to anon, authenticated using (published);
create policy "lecture publique" on public.brands          for select to anon, authenticated using (published);
create policy "lecture publique" on public.process_steps   for select to anon, authenticated using (published);
create policy "lecture publique" on public.advantages      for select to anon, authenticated using (published);
create policy "lecture publique" on public.testimonials    for select to anon, authenticated using (published);
create policy "lecture publique" on public.gallery_items   for select to anon, authenticated using (published);
create policy "lecture publique" on public.chatbot_answers for select to anon, authenticated using (published);

-- ─── Contenu : écriture réservée aux administrateurs ───
create policy "ecriture admin" on public.settings        for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "ecriture admin" on public.coverage_zones  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "ecriture admin" on public.page_texts      for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "ecriture admin" on public.services        for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "ecriture admin" on public.brand_regions   for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "ecriture admin" on public.brands          for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "ecriture admin" on public.process_steps   for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "ecriture admin" on public.advantages      for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "ecriture admin" on public.testimonials    for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "ecriture admin" on public.gallery_items   for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "ecriture admin" on public.chatbot_answers for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "ecriture admin" on public.media_slots     for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- ─── Demandes de devis ───
-- Le visiteur ne choisit ni son statut, ni son affectation, ni la note interne.
-- RGPD : le consentement (case cochée sur le formulaire) est obligatoire.
create policy "depot public borne" on public.quote_requests
  for insert to anon, authenticated
  with check (
    status = 'nouvelle'
    and source = 'site'
    and handled_by    is null
    and handled_at    is null
    and internal_note is null
    and consent = true
  );

create policy "lecture admin"     on public.quote_requests for select to authenticated using ((select public.is_admin()));
create policy "maj admin"         on public.quote_requests for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "suppression admin" on public.quote_requests for delete to authenticated using ((select public.is_admin()));

-- ─── Données clients : administrateurs uniquement ───
create policy "admin seulement" on public.customers for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "admin seulement" on public.vehicles  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "admin seulement" on public.jobs      for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- ─── Comptes d'administration ───
--
-- ⚠️ Lecture et écriture SÉPARÉES, et jamais de sous-requête directe sur
-- admin_users : ce serait une récursion infinie. On passe par is_admin()
-- et is_owner(), qui sont SECURITY DEFINER.
create policy "lecture des profils" on public.admin_users
  for select to authenticated
  using ((select auth.uid()) = id or (select public.is_admin()));

create policy "ajout par le responsable" on public.admin_users
  for insert to authenticated with check ((select public.is_owner()));

create policy "modification par le responsable" on public.admin_users
  for update to authenticated using ((select public.is_owner())) with check ((select public.is_owner()));

create policy "suppression par le responsable" on public.admin_users
  for delete to authenticated using ((select public.is_owner()));
