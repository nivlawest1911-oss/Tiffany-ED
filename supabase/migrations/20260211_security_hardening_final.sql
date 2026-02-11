-- ==========================================
-- 🛡️ SOVEREIGN SECURITY HARDENING PROTOCOL (V2)
-- AUTHOR: Dr. Alvin West, Jr. (DBA)
-- ==========================================
-- 1. CRITICAL: Security Definer View Fix
-- Explicitly using security_invoker to prevent cross-tenant leakage.
-- This ensures the view query is executed with the permissions of the user, not the creator.
DROP VIEW IF EXISTS public.command_report;
CREATE OR REPLACE VIEW public.command_report WITH (security_invoker = true) AS
SELECT tier_name,
    COUNT(*) as active_nodes,
    COUNT(*) FILTER (
        WHERE trial_end < NOW() + INTERVAL '48 hours'
    ) as critical_nodes
FROM public.subscriptions
WHERE status = 'active'
GROUP BY tier_name;
-- Hardening access to the view
REVOKE ALL ON public.command_report
FROM public;
GRANT SELECT ON public.command_report TO authenticated;
GRANT SELECT ON public.command_report TO service_role;
-- 2. CRITICAL: Mutable Function Path Protection
-- Prevents "search path shadowing" where an attacker could hijack core logic.
CREATE OR REPLACE FUNCTION public.handle_new_user_setup() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER -- Required for cross-schema triggers
SET search_path = public -- Hardened search path
    AS $$ BEGIN
INSERT INTO public.profiles (id, full_name, avatar_url)
VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.subscriptions (user_id, tier_name, trial_end)
VALUES (
        NEW.id,
        'Sovereign Initiate',
        NOW() + INTERVAL '14 days'
    ) ON CONFLICT (user_id) DO NOTHING;
RETURN NEW;
END;
$$;
CREATE OR REPLACE FUNCTION public.set_trial_duration() RETURNS TRIGGER LANGUAGE plpgsql SECURITY INVOKER -- Use invoker rights where possible
SET search_path = public -- Hardened search path
    AS $$ BEGIN IF NEW.tier_name = 'Sovereign Initiate' THEN NEW.trial_end := NOW() + INTERVAL '14 days';
ELSE NEW.trial_end := NOW() + INTERVAL '30 days';
END IF;
RETURN NEW;
END;
$$;
-- 3. RLS PROTOCOL INITIALIZATION
-- Ensure tables mentioned in audit are locked down
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
-- 4. PERFORMANCE & STABILITY
-- Indexing foreign keys to prevent sequential scans and table locks
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON public.usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON public.usage_logs(created_at);
-- 5. VERIFICATION
DO $$ BEGIN IF EXISTS (
    SELECT 1
    FROM pg_views
    WHERE schemaname = 'public'
        AND viewname = 'command_report'
        AND definition ILIKE '%security_invoker%'
) THEN RAISE NOTICE '✅ Security Invoker verified for command_report';
ELSE -- Fallback for older Postgres versions if WITH syntax differs
RAISE NOTICE '⚠️ Verification manual check required for security_invoker';
END IF;
END $$;