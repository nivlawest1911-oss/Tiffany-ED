-- 0. Prerequisites & Base Config
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 1. Create Profiles Table (The Foundation)
-- This table mirrors the auth.users table and holds public user data
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Enable RLS on Profiles immediately
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
-- Basic Profiles Policies (Idempotent)
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE policyname = 'Public profiles are viewable by everyone.'
) THEN CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR
SELECT USING (true);
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE policyname = 'Users can insert their own profile.'
) THEN CREATE POLICY "Users can insert their own profile." ON public.profiles FOR
INSERT WITH CHECK (auth.uid() = id);
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE policyname = 'Users can update own profile.'
) THEN CREATE POLICY "Users can update own profile." ON public.profiles FOR
UPDATE USING (auth.uid() = id);
END IF;
END $$;
-- 2. Create a specialized Type for your Sovereign Tiers
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'edintel_tier'
) THEN CREATE TYPE edintel_tier AS ENUM (
    'Sovereign Initiate',
    'Standard Pack',
    'Sovereign Pack',
    'Practitioner',
    'Director Pack',
    'Site Command'
);
END IF;
END $$;
-- 3. Enhance the Profiles table with your pricing logic
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS subscription_tier edintel_tier DEFAULT 'Sovereign Initiate',
    ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
    ADD COLUMN IF NOT EXISTS trial_active BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS trial_end_date TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS usage_tokens INTEGER DEFAULT 0;
-- 4. Create a Subscriptions log for history
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users NOT NULL,
    tier edintel_tier NOT NULL,
    status TEXT NOT NULL,
    stripe_price_id TEXT,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 5. Sovereign Row Level Security (RLS) for Subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE policyname = 'Users can view own subscription'
) THEN CREATE POLICY "Users can view own subscription" ON subscriptions FOR
SELECT USING (auth.uid() = user_id);
END IF;
END $$;
-- 6. Trigger to grant initial "Sovereign Initiate" status
CREATE OR REPLACE FUNCTION public.handle_new_user_setup() RETURNS trigger AS $$ BEGIN
INSERT INTO public.profiles (
        id,
        email,
        subscription_tier,
        full_name,
        avatar_url
    )
VALUES (
        new.id,
        new.email,
        'Sovereign Initiate',
        new.raw_user_meta_data->>'full_name',
        new.raw_user_meta_data->>'avatar_url'
    );
RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Safely attach the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_setup();