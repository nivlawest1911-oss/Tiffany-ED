-- ==========================================
-- 🛡️ SOVEREIGN SECURITY HARDENING PROTOCOL
-- Audit Fixes for Database Security & Performance
-- ==========================================
-- 1. FIX: Security Definer View (Critical)
-- Recreating view with security_invoker to ensure it honors RLS of the user
DROP VIEW IF EXISTS public.command_report;
CREATE VIEW public.command_report WITH (security_invoker = true) AS
SELECT tier_name,
    COUNT(*) as active_nodes,
    COUNT(*) FILTER (
        WHERE trial_end < NOW() + INTERVAL '48 hours'
    ) as critical_nodes
FROM public.subscriptions
WHERE status = 'active'
GROUP BY tier_name;
-- 2. FIX: Function Search Path Mutable (Prevent Injection)
-- Hardening set_trial_duration
CREATE OR REPLACE FUNCTION public.set_trial_duration() RETURNS TRIGGER LANGUAGE plpgsql
SET search_path = public -- Hardened search path
    AS $$ BEGIN IF NEW.tier_name = 'Sovereign Initiate' THEN NEW.trial_end := NOW() + INTERVAL '14 days';
ELSE NEW.trial_end := NOW() + INTERVAL '30 days';
END IF;
RETURN NEW;
END;
$$;
-- Fixing or Creating handle_new_user_setup
CREATE OR REPLACE FUNCTION public.handle_new_user_setup() RETURNS TRIGGER LANGUAGE plpgsql
SET search_path = public -- Hardened search path
    AS $$ BEGIN
INSERT INTO public.profiles (id, full_name, avatar_url)
VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
INSERT INTO public.subscriptions (user_id, tier_name, trial_end)
VALUES (
        NEW.id,
        'Sovereign Initiate',
        NOW() + INTERVAL '14 days'
    );
RETURN NEW;
END;
$$;
-- 3. FIX: Auth RLS Initialization Plan (Ensure Privacy)
-- Setup profiles table if not exists
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
    full_name text,
    avatar_url text,
    updated_at timestamp with time zone DEFAULT now()
);
-- Enable RLS on all critical tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;
-- Profiles Policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR
SELECT TO authenticated USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR
UPDATE TO authenticated WITH CHECK (auth.uid() = id);
-- Subscriptions Policies
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscriptions;
CREATE POLICY "Users can view their own subscription" ON public.subscriptions FOR
SELECT TO authenticated USING (auth.uid() = user_id);
-- 4. FIX: Unindexed Foreign Keys (Performance Optimization)
-- Ensure fast joins and prevent table locks
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON public.usage_logs(user_id);
-- 5. TRIGGER SETUP (Wiring the hardened logic)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_setup();
-- NOTE: "Leaked Password Protection" must be enabled manually in 
-- Supabase Dashboard -> Auth -> User Management -> Password Strength.
DO $$ BEGIN RAISE NOTICE '🛡️ Sovereign Security Hardening Complete.';
RAISE NOTICE '✅ command_report view secured with security_invoker.';
RAISE NOTICE '✅ Functions path hardened (search_path = public).';
RAISE NOTICE '✅ RLS Initialization Plan active for profiles, subscriptions, usage_logs.';
RAISE NOTICE '✅ Foreign key indexes deployed for performance.';
END $$;