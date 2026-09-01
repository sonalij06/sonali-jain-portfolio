-- Email is now optional on the public remark form.
alter table public.remarks alter column email drop not null;
alter table public.remarks alter column email set default '';

drop policy if exists "Public can submit remarks" on public.remarks;
create policy "Public can submit remarks"
  on public.remarks
  for insert
  with check (
    char_length(name) between 2 and 60
    and (email is null or email = '' or position('@' in email) > 1)
    and char_length(remark) between 10 and 500
    and rating between 1 and 5
  );
