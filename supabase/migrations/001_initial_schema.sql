create extension if not exists pgcrypto;
create extension if not exists vector;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  email text,
  region text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.investigations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  question text not null,
  interpreted_question text,
  category text,
  status text not null default 'completed',
  answer_json jsonb not null default '{}'::jsonb,
  audit_json jsonb not null default '{}'::jsonb,
  source_count integer not null default 0,
  primary_evidence_count integer not null default 0,
  is_demo boolean not null default false,
  is_public boolean not null default false,
  share_slug text unique,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table public.sources (
  id uuid primary key default gen_random_uuid(),
  investigation_id uuid not null references public.investigations(id) on delete cascade,
  url text not null,
  title text not null,
  author text,
  publisher text,
  domain text,
  publication_date date,
  updated_date date,
  source_category text not null,
  incentive_category text not null,
  primary_source boolean not null default false,
  ownership_json jsonb not null default '{}'::jsonb,
  funding_json jsonb not null default '{}'::jsonb,
  study_metadata_json jsonb not null default '{}'::jsonb,
  extracted_claims_json jsonb not null default '[]'::jsonb,
  classification_reasoning_json jsonb not null default '{}'::jsonb,
  classification_confidence numeric(4,3) not null default 0,
  created_at timestamptz not null default now()
);

create table public.claim_clusters (
  id uuid primary key default gen_random_uuid(),
  investigation_id uuid not null references public.investigations(id) on delete cascade,
  canonical_claim text not null,
  repetition_count integer not null default 0,
  domain_count integer not null default 0,
  ownership_group_count integer not null default 0,
  original_evidence_count integer not null default 0,
  lineage_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text not null,
  full_description text not null,
  category text not null,
  stage text not null,
  project_url text,
  image_url text,
  operator text not null,
  tags text[] not null default '{}',
  embedding vector(1536),
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  schema_version text not null default '1.0.0',
  slug text not null unique,
  title text not null,
  short_summary text not null,
  full_description text not null,
  opportunity_type text not null,
  role_name text not null,
  problem_statement text not null,
  status text not null default 'open',
  places_total integer not null default 1,
  places_remaining integer not null default 1,
  geography_json jsonb not null default '{}'::jsonb,
  organisation_types text[] not null default '{}',
  individual_roles text[] not null default '{}',
  required_capabilities text[] not null default '{}',
  preferred_capabilities text[] not null default '{}',
  excluded_fits text[] not null default '{}',
  commitment_json jsonb not null default '{}'::jsonb,
  commercial_model_json jsonb not null default '{}'::jsonb,
  terms_json jsonb not null default '{}'::jsonb,
  risks_json jsonb not null default '[]'::jsonb,
  limitations_json jsonb not null default '[]'::jsonb,
  intellectual_property_json jsonb not null default '{}'::jsonb,
  agent_permissions_json jsonb not null default '{}'::jsonb,
  application_questions_json jsonb not null default '[]'::jsonb,
  embedding vector(1536),
  published boolean not null default false,
  opens_at timestamptz,
  closes_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint opportunity_status_check check (status in ('open', 'paused', 'filled', 'closed', 'archived')),
  constraint no_negative_places check (places_total >= 0 and places_remaining >= 0 and places_remaining <= places_total)
);

create table public.opportunity_interests (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  organisation text,
  current_role text,
  geography text not null,
  capabilities text[] not null default '{}',
  reason_for_interest text not null,
  proposed_contribution text not null,
  availability text not null,
  links_json jsonb not null default '[]'::jsonb,
  consent_to_contact boolean not null default false,
  status text not null default 'new',
  private_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint interest_status_check check (
    status in ('new', 'reviewing', 'more-info-requested', 'shortlisted', 'declined', 'accepted')
  )
);

create table public.goo_match_runs (
  id uuid primary key default gen_random_uuid(),
  authenticated_user_id uuid references auth.users(id) on delete set null,
  principal_json jsonb not null,
  candidate_count integer not null default 0,
  result_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_type text not null,
  actor_id text,
  event_type text not null,
  entity_type text not null,
  entity_id text,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger investigations_set_updated_at
before update on public.investigations
for each row execute function public.set_updated_at();

create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

create trigger opportunities_set_updated_at
before update on public.opportunities
for each row execute function public.set_updated_at();

create trigger opportunity_interests_set_updated_at
before update on public.opportunity_interests
for each row execute function public.set_updated_at();

create index investigations_user_id_idx on public.investigations(user_id, created_at desc);
create index investigations_public_idx on public.investigations(is_public, share_slug) where is_public = true;
create index sources_investigation_idx on public.sources(investigation_id);
create index claim_clusters_investigation_idx on public.claim_clusters(investigation_id);
create index projects_published_idx on public.projects(published, slug);
create index opportunities_public_idx on public.opportunities(published, status, slug);
create index opportunities_project_idx on public.opportunities(project_id);
create index opportunity_interests_user_idx on public.opportunity_interests(user_id, created_at desc);
create index opportunity_interests_opportunity_idx on public.opportunity_interests(opportunity_id, status);

alter table public.profiles enable row level security;
alter table public.investigations enable row level security;
alter table public.sources enable row level security;
alter table public.claim_clusters enable row level security;
alter table public.projects enable row level security;
alter table public.opportunities enable row level security;
alter table public.opportunity_interests enable row level security;
alter table public.goo_match_runs enable row level security;
alter table public.audit_events enable row level security;

create policy "profiles owner read" on public.profiles
for select using (auth.uid() = id or public.is_admin());

create policy "profiles owner insert" on public.profiles
for insert with check (auth.uid() = id);

create policy "profiles owner update" on public.profiles
for update using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

create policy "investigations owner or public read" on public.investigations
for select using (is_public = true or auth.uid() = user_id or public.is_admin());

create policy "investigations owner insert" on public.investigations
for insert with check (auth.uid() = user_id or user_id is null);

create policy "investigations owner update" on public.investigations
for update using (auth.uid() = user_id or public.is_admin())
with check (auth.uid() = user_id or public.is_admin());

create policy "sources readable through investigation" on public.sources
for select using (
  public.is_admin()
  or exists (
    select 1 from public.investigations i
    where i.id = sources.investigation_id
    and (i.is_public = true or i.user_id = auth.uid())
  )
);

create policy "sources owner insert" on public.sources
for insert with check (
  public.is_admin()
  or exists (
    select 1 from public.investigations i
    where i.id = sources.investigation_id
    and i.user_id = auth.uid()
  )
);

create policy "claim clusters readable through investigation" on public.claim_clusters
for select using (
  public.is_admin()
  or exists (
    select 1 from public.investigations i
    where i.id = claim_clusters.investigation_id
    and (i.is_public = true or i.user_id = auth.uid())
  )
);

create policy "claim clusters owner insert" on public.claim_clusters
for insert with check (
  public.is_admin()
  or exists (
    select 1 from public.investigations i
    where i.id = claim_clusters.investigation_id
    and i.user_id = auth.uid()
  )
);

create policy "published projects public read" on public.projects
for select using (published = true or public.is_admin());

create policy "admin manages projects" on public.projects
for all using (public.is_admin()) with check (public.is_admin());

create policy "published open opportunities public read" on public.opportunities
for select using (
  (published = true and status = 'open') or public.is_admin()
);

create policy "admin manages opportunities" on public.opportunities
for all using (public.is_admin()) with check (public.is_admin());

create policy "interest owner read" on public.opportunity_interests
for select using (auth.uid() = user_id or public.is_admin());

create policy "authenticated interest insert" on public.opportunity_interests
for insert with check (auth.uid() = user_id and consent_to_contact = true);

create policy "interest owner update limited" on public.opportunity_interests
for update using (auth.uid() = user_id or public.is_admin())
with check (auth.uid() = user_id or public.is_admin());

create policy "match runs owner read" on public.goo_match_runs
for select using (auth.uid() = authenticated_user_id or public.is_admin());

create policy "match runs owner insert" on public.goo_match_runs
for insert with check (auth.uid() = authenticated_user_id or public.is_admin());

create policy "audit admin read" on public.audit_events
for select using (public.is_admin());

create policy "audit service insert" on public.audit_events
for insert with check (public.is_admin() or actor_type in ('system', 'anonymous'));
