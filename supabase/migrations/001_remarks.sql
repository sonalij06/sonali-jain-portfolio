-- Visitor remarks (reviews) shown at the end of the portfolio, moderated
-- from /admin before they go public.
create table if not exists public.remarks (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  rating smallint not null check (rating between 1 and 5),
  remark text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.remarks enable row level security;

-- Anyone can read approved remarks.
create policy "Public can read approved remarks"
  on public.remarks
  for select
  using (approved = true);

-- Anyone can submit a remark; it lands as approved = false until an admin
-- publishes it from /admin.
create policy "Public can submit remarks"
  on public.remarks
  for insert
  with check (
    char_length(name) between 2 and 60
    and position('@' in email) > 1
    and char_length(remark) between 10 and 500
    and rating between 1 and 5
  );

-- Column-level privileges: the public (anon) role must never be able to
-- read a submitter's email, and can never set approved/id/created_at
-- itself — those always come from the column defaults above.
revoke all on public.remarks from anon;
grant select (id, name, rating, remark, created_at) on public.remarks to anon;
grant insert (name, email, rating, remark) on public.remarks to anon;

create index if not exists remarks_created_at_idx on public.remarks (created_at desc);
