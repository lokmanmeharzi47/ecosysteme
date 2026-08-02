-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- 1. Organizations
create table if not exists organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text check (type in ('government', 'enterprise', 'ngo', 'emergency_services')),
  contact_email text,
  contact_phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Regions
create table if not exists regions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  geom geometry(Polygon, 4326),
  organization_id uuid references organizations(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Profiles (extends auth.users)
-- Assuming profiles table exists but let's make sure it matches requirements
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  first_name text,
  last_name text,
  organization_id uuid references organizations(id) on delete set null,
  system_role text check (system_role in ('admin', 'client', 'viewer', 'responder')) default 'viewer',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Sensors
create table if not exists sensors (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text check (type in ('thermal', 'smoke', 'camera', 'weather', 'multi')),
  status text check (status in ('online', 'offline', 'maintenance', 'error')) default 'online',
  geom geometry(Point, 4326) not null,
  battery_level numeric(5,2) check (battery_level >= 0 and battery_level <= 100),
  signal_quality numeric(5,2) check (signal_quality >= 0 and signal_quality <= 100),
  last_update timestamptz default now(),
  organization_id uuid references organizations(id) on delete cascade,
  region_id uuid references regions(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. Sensor Readings
create table if not exists sensor_readings (
  id uuid primary key default uuid_generate_v4(),
  sensor_id uuid references sensors(id) on delete cascade not null,
  temperature numeric(5,2),
  humidity numeric(5,2),
  smoke_level numeric(5,2),
  co2_level numeric(5,2),
  reading_time timestamptz default now(),
  created_at timestamptz default now()
);

-- 6. Risk Zones
create table if not exists risk_zones (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  risk_level text check (risk_level in ('low', 'medium', 'high', 'critical')),
  vegetation_type text,
  population_density integer,
  last_inspection timestamptz,
  geom geometry(Polygon, 4326) not null,
  region_id uuid references regions(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 7. Fire Incidents
create table if not exists fire_incidents (
  id uuid primary key default uuid_generate_v4(),
  severity text check (severity in ('low', 'medium', 'high', 'critical')),
  status text check (status in ('detected', 'investigating', 'fighting', 'contained', 'extinguished', 'false_alarm')),
  detection_time timestamptz default now(),
  geom geometry(Point, 4326) not null,
  temperature numeric(5,2),
  humidity numeric(5,2),
  wind_speed numeric(5,2),
  wind_direction text,
  ai_confidence numeric(5,2),
  assigned_team text,
  region_id uuid references regions(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 8. Alerts
create table if not exists alerts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  severity text check (severity in ('info', 'warning', 'critical')),
  source text check (source in ('sensor', 'ai', 'manual', 'weather')),
  status text check (status in ('active', 'acknowledged', 'resolved')),
  sensor_id uuid references sensors(id) on delete set null,
  incident_id uuid references fire_incidents(id) on delete set null,
  geom geometry(Point, 4326),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 9. Notifications
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,
  alert_id uuid references alerts(id) on delete cascade,
  title text not null,
  message text not null,
  read boolean default false,
  channel text check (channel in ('dashboard', 'email', 'push')),
  created_at timestamptz default now()
);

-- 10. AI Predictions
create table if not exists ai_predictions (
  id uuid primary key default uuid_generate_v4(),
  region_id uuid references regions(id) on delete cascade,
  risk_score numeric(5,2) check (risk_score >= 0 and risk_score <= 100),
  prediction_date date not null,
  confidence numeric(5,2),
  factors jsonb,
  geom geometry(Polygon, 4326),
  created_at timestamptz default now()
);

-- 11. Weather
create table if not exists weather (
  id uuid primary key default uuid_generate_v4(),
  geom geometry(Point, 4326) not null,
  temperature numeric(5,2),
  humidity numeric(5,2),
  wind_speed numeric(5,2),
  wind_direction numeric(5,2),
  pressure numeric(6,2),
  rain numeric(5,2),
  observation_time timestamptz default now(),
  region_id uuid references regions(id) on delete set null,
  created_at timestamptz default now()
);

-- 12. Maintenance Logs
create table if not exists maintenance_logs (
  id uuid primary key default uuid_generate_v4(),
  sensor_id uuid references sensors(id) on delete cascade not null,
  performed_by uuid references profiles(id) on delete set null,
  action text not null,
  notes text,
  date timestamptz default now(),
  created_at timestamptz default now()
);

-- 13. Reports
create table if not exists reports (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  type text check (type in ('daily', 'weekly', 'monthly', 'incident', 'custom')),
  generated_by uuid references profiles(id) on delete set null,
  file_url text,
  parameters jsonb,
  created_at timestamptz default now()
);

-- 14. Audit Logs
create table if not exists audit_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id uuid,
  details jsonb,
  created_at timestamptz default now()
);

-- Create Indexes
create index if not exists idx_sensors_geom on sensors using gist (geom);
create index if not exists idx_fire_incidents_geom on fire_incidents using gist (geom);
create index if not exists idx_regions_geom on regions using gist (geom);
create index if not exists idx_risk_zones_geom on risk_zones using gist (geom);
create index if not exists idx_alerts_geom on alerts using gist (geom);
create index if not exists idx_sensor_readings_time on sensor_readings(reading_time desc);
create index if not exists idx_fire_incidents_status on fire_incidents(status);
create index if not exists idx_alerts_status on alerts(status);

-- Enable RLS
alter table organizations enable row level security;
alter table regions enable row level security;
alter table profiles enable row level security;
alter table sensors enable row level security;
alter table sensor_readings enable row level security;
alter table risk_zones enable row level security;
alter table fire_incidents enable row level security;
alter table alerts enable row level security;
alter table notifications enable row level security;
alter table ai_predictions enable row level security;
alter table weather enable row level security;
alter table maintenance_logs enable row level security;
alter table reports enable row level security;
alter table audit_logs enable row level security;

-- Setup RLS Policies (Example: Admin sees all, Client sees own org data)

-- Profiles
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Sensors
create policy "Admins see all sensors" on sensors for all using (
  exists (select 1 from profiles where id = auth.uid() and system_role = 'admin')
);
create policy "Clients see org sensors" on sensors for select using (
  organization_id in (select organization_id from profiles where id = auth.uid())
);

-- Incidents
create policy "Admins see all incidents" on fire_incidents for all using (
  exists (select 1 from profiles where id = auth.uid() and system_role = 'admin')
);
create policy "Clients see all incidents (public safety)" on fire_incidents for select using (true);

-- Alerts
create policy "Admins see all alerts" on alerts for all using (
  exists (select 1 from profiles where id = auth.uid() and system_role = 'admin')
);
create policy "Clients see all alerts" on alerts for select using (true);

-- Setup Realtime
alter publication supabase_realtime add table sensors;
alter publication supabase_realtime add table fire_incidents;
alter publication supabase_realtime add table alerts;
alter publication supabase_realtime add table weather;
alter publication supabase_realtime add table notifications;

-- Updated_at triggers
create or replace function update_modified_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_organizations_modtime before update on organizations for each row execute procedure update_modified_column();
create trigger update_regions_modtime before update on regions for each row execute procedure update_modified_column();
create trigger update_profiles_modtime before update on profiles for each row execute procedure update_modified_column();
create trigger update_sensors_modtime before update on sensors for each row execute procedure update_modified_column();
create trigger update_risk_zones_modtime before update on risk_zones for each row execute procedure update_modified_column();
create trigger update_fire_incidents_modtime before update on fire_incidents for each row execute procedure update_modified_column();
create trigger update_alerts_modtime before update on alerts for each row execute procedure update_modified_column();
