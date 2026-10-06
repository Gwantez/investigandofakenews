create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to service_role;
create table public.classrooms (
 id uuid primary key default gen_random_uuid(),
 class_number text not null unique check(class_number ~ '^[0-9]{1,5}$'),
 teacher_name text not null,
 teacher_invite text not null unique,
 created_at timestamptz not null default now()
);
create table public.class_teachers (
 classroom_id uuid not null references public.classrooms(id) on delete cascade,
 teacher_id uuid not null references public.profiles(id) on delete cascade,
 primary key(classroom_id,teacher_id)
);
create index class_teachers_teacher_idx on public.class_teachers(teacher_id,classroom_id);
alter table public.profiles add column full_name text, add column class_number text,
 add column classroom_id uuid references public.classrooms(id),
 add column is_admin boolean not null default false,
 add column code_login boolean not null default false;
update public.profiles set is_admin=true where is_teacher;
alter table public.progress add column classroom_id uuid references public.classrooms(id);
create index progress_classroom_idx on public.progress(classroom_id);
alter table public.classrooms enable row level security;
alter table public.class_teachers enable row level security;
revoke all on public.classrooms, public.class_teachers from anon,authenticated;
grant select(id,class_number,teacher_name) on public.classrooms to anon,authenticated;
grant select on public.class_teachers to authenticated;
create policy list_classrooms on public.classrooms for select to anon,authenticated using(true);
create policy own_teacher_membership on public.class_teachers for select to authenticated using(teacher_id=(select auth.uid()));
drop policy read_progress on public.progress;
create policy read_progress on public.progress for select to authenticated using (
 user_id=(select auth.uid()) or
 exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.is_teacher and p.is_admin) or
 classroom_id in(select m.classroom_id from public.class_teachers m where m.teacher_id=(select auth.uid()))
);
drop policy insert_own_progress on public.progress;
create policy insert_own_progress on public.progress for insert to authenticated with check (
 user_id=(select auth.uid()) and exists(select 1 from public.profiles p where p.id=(select auth.uid()) and not p.is_teacher and p.participant_code=progress.participant_code and p.classroom_id is not distinct from progress.classroom_id)
);
drop policy update_own_progress on public.progress;
create policy update_own_progress on public.progress for update to authenticated using (
 user_id=(select auth.uid()) and exists(select 1 from public.profiles p where p.id=(select auth.uid()) and not p.is_teacher)
) with check (
 user_id=(select auth.uid()) and exists(select 1 from public.profiles p where p.id=(select auth.uid()) and not p.is_teacher and p.participant_code=progress.participant_code and p.classroom_id is not distinct from progress.classroom_id)
);
create table private.access_buckets(key text primary key,hits integer not null,started_at timestamptz not null);
alter table private.access_buckets enable row level security;
grant all on private.access_buckets to service_role;
create function public.midiacheck_rate_limit(bucket_key text,max_hits integer) returns boolean
language plpgsql security invoker set search_path='' as $$
declare n integer;
begin
 delete from private.access_buckets where started_at < now()-interval '1 day';
 insert into private.access_buckets(key,hits,started_at) values(bucket_key,1,now())
 on conflict(key) do update set hits=case when private.access_buckets.started_at < now()-interval '1 minute' then 1 else private.access_buckets.hits+1 end,
 started_at=case when private.access_buckets.started_at < now()-interval '1 minute' then now() else private.access_buckets.started_at end returning hits into n;
 return n<=max_hits;
end $$;
revoke all on function public.midiacheck_rate_limit(text,integer) from public,anon,authenticated;
grant execute on function public.midiacheck_rate_limit(text,integer) to service_role;
grant all on public.profiles,public.progress,public.classrooms,public.class_teachers to service_role;
create policy backend_only_buckets on private.access_buckets for all to service_role using(true) with check(true);
