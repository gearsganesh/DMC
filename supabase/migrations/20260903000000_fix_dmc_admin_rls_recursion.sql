-- DMC: fix recursive RLS on public.admins.
-- The previous admin policies queried public.admins from policies on
-- public.admins, which makes PostgreSQL recursively evaluate the same
-- policy and raises 42P17 / "infinite recursion detected".
--
-- This migration is intentionally idempotent so it can be applied safely
-- to the existing production project.

create schema if not exists private;

create or replace function private.is_dmc_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admins
    where lower(email) = lower((select auth.jwt() ->> 'email'))
      and lower(coalesce(role, 'admin')) = 'admin'
  );
$$;

revoke all on function private.is_dmc_admin() from public;
grant execute on function private.is_dmc_admin() to authenticated;

-- Remove every existing policy on admins. This avoids having an older
-- recursive policy survive alongside the repaired policy.
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

create policy "Admins can read own admin record"
on public.admins
for select
to authenticated
using (
  lower(email) = lower((select auth.jwt() ->> 'email'))
);

-- Rebuild dependent admin policies so they use the SECURITY DEFINER check
-- rather than querying admins through RLS.
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

-- Keep the Data API grants explicit.
grant select on public.admins to authenticated;
grant select, insert, update, delete on public.vehicles to authenticated;
grant select, insert, update, delete on public.vehicle_images to authenticated;
grant select on public.enquiries to authenticated;
