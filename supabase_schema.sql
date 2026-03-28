-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text not null,
  avatar_url text,
  company text,
  email text not null,
  notify_email boolean default false,
  notify_browser boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Elevate Row Level Security (RLS) on profiles
alter table public.profiles enable row level security;

-- Create policies for profiles
create policy "Users can view own profile." on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile." on profiles
  for insert with check (auth.uid() = id);

-- Create orders table
create type public.order_status as enum ('pending', 'in_progress', 'review', 'completed');
create type public.content_type as enum ('blog_post', 'article', 'social_media', 'email', 'landing_page', 'product_description', 'other');

create table public.orders (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content_type public.content_type not null,
  status public.order_status default 'pending' not null,
  word_count integer not null default 500,
  brief text not null,
  due_date timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Elevate Row Level Security (RLS) on orders
alter table public.orders enable row level security;

-- Create policies for orders
create policy "Users can view own orders." on orders
  for select using (auth.uid() = client_id);

create policy "Users can update own orders." on orders
  for update using (auth.uid() = client_id);

create policy "Users can insert own orders." on orders
  for insert with check (auth.uid() = client_id);

create policy "Users can delete own orders." on orders
  for delete using (auth.uid() = client_id);

-- Create function to handle new user signups and auto-create profile
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'User'), 
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call handle_new_user on auth.users insert
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
