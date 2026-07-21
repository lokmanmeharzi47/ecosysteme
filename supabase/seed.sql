-- ==========================================
-- seed.sql
-- Seed Data for EcoSphere Backend
-- ==========================================

DO $$
DECLARE
    org1_id UUID; org2_id UUID; org3_id UUID; org4_id UUID; org5_id UUID;
    user_id UUID;
    site_id UUID; sensor_type_id UUID; gateway_id UUID; sensor_id UUID;
    i INTEGER; j INTEGER; k INTEGER;
BEGIN
    -- 1. Create Organizations
    INSERT INTO organizations (name, slug, description, contact_email) VALUES 
    ('AgriSmart Algeria', 'agrismart-dz', 'Smart farming solutions in Biskra', 'contact@agrismart.dz') RETURNING id INTO org1_id;
    
    INSERT INTO organizations (name, slug, description, contact_email) VALUES 
    ('National Forestry Dept', 'dngf-dz', 'Direction Nationale des Forêts', 'admin@dngf.dz') RETURNING id INTO org2_id;
    
    INSERT INTO organizations (name, slug, description, contact_email) VALUES 
    ('Sonatrach Green', 'sonatrach-green', 'Environmental monitoring for industry', 'green@sonatrach.dz') RETURNING id INTO org3_id;
    
    INSERT INTO organizations (name, slug, description, contact_email) VALUES 
    ('AquaTech Oran', 'aquatech-oran', 'Water quality monitoring', 'info@aquatech.dz') RETURNING id INTO org4_id;
    
    INSERT INTO organizations (name, slug, description, contact_email) VALUES 
    ('Algiers City Council', 'algiers-city', 'Urban air quality monitoring', 'air@alger.dz') RETURNING id INTO org5_id;

    -- 2. Create Users & Profiles
    -- Note: Because profiles are created via trigger on auth.users, we simulate it here by directly 
    -- inserting into auth.users (if possible in seed) or just directly into profiles if foreign key checks are deferred.
    -- For seed data in local supabase, we can insert into auth.users.
    
    FOR i IN 1..25 LOOP
        user_id := uuid_generate_v4();
        INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
        VALUES (
            user_id, '00000000-0000-0000-0000-000000000000', 
            'user' || i || '@example.com', 
            crypt('password123', gen_salt('bf')), 
            NOW(),
            json_build_object('first_name', 'User', 'last_name', i::TEXT, 'system_role', 
                CASE 
                    WHEN i <= 5 THEN 'admin'
                    ELSE 'client'
                END
            )
        );
        
        -- Assign to random org
        INSERT INTO organization_members (organization_id, profile_id, org_role)
        VALUES (
            CASE (i % 5)
                WHEN 0 THEN org1_id WHEN 1 THEN org2_id WHEN 2 THEN org3_id WHEN 3 THEN org4_id ELSE org5_id
            END,
            user_id,
            CASE 
                WHEN i <= 5 THEN 'admin'::user_role
                ELSE 'client'::user_role
            END
        );
    END LOOP;

    -- 3. Create Hardware Catalog & Subscription Plans
    INSERT INTO hardware_catalog (sku, name, category, price_dzd, stock_quantity) VALUES
    ('GW-01', 'EcoGateway Industrial', 'gateway', 68000, 50),
    ('WS-01', 'EcoSphere Weather Pro', 'sensor', 89000, 200),
    ('AQ-01', 'AirGuard Pro AIoT', 'sensor', 76000, 150),
    ('SM-01', 'EcoSoil NPK Smart', 'sensor', 42000, 500);

    INSERT INTO plans (name, price_dzd_per_month, max_sites, max_sensors) VALUES
    ('Starter', 5000, 1, 10),
    ('Pro', 15000, 5, 50),
    ('Enterprise', 50000, 50, 1000);

    -- 4. Create Sites, Gateways, Sensors, and Readings
    -- We will create 50 sites, 500 sensors, and 100,000 readings total (approx 2000 per sensor)
    
    FOR i IN 1..50 LOOP
        -- Distribute sites across orgs
        INSERT INTO sites (organization_id, name, site_type)
        VALUES (
            CASE (i % 5)
                WHEN 0 THEN org1_id WHEN 1 THEN org2_id WHEN 2 THEN org3_id WHEN 3 THEN org4_id ELSE org5_id
            END,
            'Site ' || i,
            CASE (i % 3) WHEN 0 THEN 'forest' WHEN 1 THEN 'farm' ELSE 'factory' END
        ) RETURNING id INTO site_id;

        -- Create 1 gateway per site
        INSERT INTO gateways (organization_id, site_id, name, mac_address, status)
        VALUES (
            (SELECT organization_id FROM sites WHERE id = site_id),
            site_id,
            'GW-Site-' || i,
            '00:11:22:33:44:' || lpad(i::TEXT, 2, '0'),
            'online'
        ) RETURNING id INTO gateway_id;

        -- Create 10 sensors per site (total 500)
        FOR j IN 1..10 LOOP
            -- Create sensor type if needed, or just select a random category
            INSERT INTO sensor_types (category, name) 
            VALUES (
                (ARRAY['weather_station', 'soil_moisture', 'pm25', 'fire_detector']::sensor_type_category[])[1 + (j % 4)],
                'Sensor Type ' || j
            ) RETURNING id INTO sensor_type_id;

            INSERT INTO sensors (organization_id, sensor_type_id, gateway_id, name, status, battery_level)
            VALUES (
                (SELECT organization_id FROM sites WHERE id = site_id),
                sensor_type_id,
                gateway_id,
                'Sensor ' || i || '-' || j,
                'active',
                random() * 100
            ) RETURNING id INTO sensor_id;

            -- Generate readings (batch of 200 per sensor to reach 100,000 total)
            -- For speed in pgplsql, we use an insert select
            INSERT INTO sensor_readings (sensor_id, payload, battery_level, signal_strength, recorded_at)
            SELECT 
                sensor_id,
                jsonb_build_object('val', random() * 100),
                random() * 100,
                -50 - (random() * 50),
                NOW() - (x || ' hours')::interval
            FROM generate_series(1, 200) AS x;
            
        END LOOP;
    END LOOP;

    -- 5. Create Alerts and Maintenance
    INSERT INTO alert_rules (organization_id, name, condition, severity)
    VALUES (org1_id, 'High Temp Rule', '{"metric":"temperature", "op":">", "value":40}', 'Critical');

    FOR i IN 1..100 LOOP
        INSERT INTO alerts (organization_id, title, message, severity, status)
        VALUES (
            CASE (i % 5)
                WHEN 0 THEN org1_id WHEN 1 THEN org2_id WHEN 2 THEN org3_id WHEN 3 THEN org4_id ELSE org5_id
            END,
            'Alert ' || i,
            'Auto-generated alert for testing',
            CASE (i % 3) WHEN 0 THEN 'Info' WHEN 1 THEN 'Warning' ELSE 'Critical' END,
            'new'
        );
    END LOOP;

    FOR i IN 1..20 LOOP
        INSERT INTO maintenance_tasks (organization_id, title, status)
        VALUES (org1_id, 'Task ' || i, 'todo');
    END LOOP;
    
    FOR i IN 1..50 LOOP
        INSERT INTO reports (organization_id, title, status)
        VALUES (org1_id, 'Report ' || i, 'ready');
    END LOOP;

END $$;
