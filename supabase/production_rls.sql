-- DMC production RLS repair
-- Fixes the recursive admins policy that blocks /admin login.
-- Run this in the DMC Supabase SQL Editor.

create schema if not exists private;

create or replace function private.is_dmc_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admins
    where lower(email) = lower(auth.jwt() ->> 'email')
  );
$$;

revoke all on function private.is_dmc_admin() from public;
grant execute on function private.is_dmc_admin() to authenticated;

-- Remove the old admins policies first. Any policy that queries admins
-- from the admins table itself can cause PostgreSQL infinite recursion.
do $$
declare
  p record;
begin
  for p in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'admins'
  loop
    execute format('drop policy if exists %I on public.admins', p.policyname);
  end loop;
end $$;

drop policy if exists "Admins can manage vehicles" on public.vehicles;
drop policy if exists "Admins can manage vehicle images" on public.vehicle_images;
drop policy if exists "Admins can read enquiries" on public.enquiries;

drop policy if exists "DMC admin upload vehicle images" on storage.objects;
drop policy if exists "DMC admin update vehicle images" on storage.objects;
drop policy if exists "DMC admin delete vehicle images" on storage.objects;

create policy "Admins can manage vehicles"
on public.vehicles
for all
to authenticated
using (private.is_dmc_admin())
with check (private.is_dmc_admin());

create policy "Admins can manage vehicle images"
on public.vehicle_images
for all
to authenticated
using (private.is_dmc_admin())
with check (private.is_dmc_admin());

create policy "Admins can read enquiries"
on public.enquiries
for select
to authenticated
using (private.is_dmc_admin());

-- Safe admin lookup: a signed-in user can read only their own admin row.
-- This policy does NOT query the admins table and therefore cannot recurse.
create policy "Admins can read own admin record"
on public.admins
for select
to authenticated
using (lower(email) = lower(auth.jwt() ->> 'email'));

create policy "DMC admin upload vehicle images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'vehicle-images'
  and private.is_dmc_admin()
);

create policy "DMC admin update vehicle images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'vehicle-images'
  and private.is_dmc_admin()
)
with check (
  bucket_id = 'vehicle-images'
  and private.is_dmc_admin()
);

create policy "DMC admin delete vehicle images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'vehicle-images'
  and private.is_dmc_admin()
);

-- Required Data API grants.
grant select on public.vehicles to anon;
grant select on public.vehicle_images to anon;
grant select, insert, update, delete on public.vehicles to authenticated;
grant select, insert, update, delete on public.vehicle_images to authenticated;
grant insert on public.enquiries to anon;
grant select on public.enquiries to authenticated;
grant select on public.admins to authenticated;
