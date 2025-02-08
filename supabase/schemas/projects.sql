create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,  -- Optional, kann auch NULL sein
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table projects enable row level security;

create policy "User can view own projects" on projects
  for select
  using (user_id = auth.uid());

create policy "User can insert own projects" on projects
  for insert
  with check (user_id = auth.uid());

create policy "User can update own projects" on projects
  for update
  using (user_id = auth.uid());

create policy "User can delete own projects" on projects
  for delete
  using (user_id = auth.uid());