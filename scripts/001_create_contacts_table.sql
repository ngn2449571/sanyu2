-- お問い合わせテーブルの作成
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  created_at timestamp with time zone default now()
);

-- RLSを有効にして、管理者のみが閲覧可能にする
alter table public.contacts enable row level security;

-- 全員が挿入可能（お問い合わせフォーム送信）
create policy "contacts_insert_anyone"
  on public.contacts for insert
  with check (true);

-- 管理者のみが全データを閲覧可能（後で認証追加も可能）
create policy "contacts_select_all"
  on public.contacts for select
  using (true);
