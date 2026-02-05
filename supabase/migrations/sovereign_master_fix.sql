-- ==========================================
-- SUPER FIX SCRIPT: RUN THIS ENTIRE FILE
-- ==========================================
-- 1. FIX THE SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.subscriptions (
    user_id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
    status text DEFAULT 'active',
    created_at timestamp with time zone DEFAULT now()
);
-- Safely add columns if missing
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'subscriptions'
        AND column_name = 'tier_name'
) THEN
ALTER TABLE public.subscriptions
ADD COLUMN tier_name text DEFAULT 'Sovereign Initiate';
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'subscriptions'
        AND column_name = 'trial_end'
) THEN
ALTER TABLE public.subscriptions
ADD COLUMN trial_end timestamp with time zone DEFAULT (now() + interval '14 days');
END IF;
END $$;
-- 2. CREATE THE REPORTING VIEW
DROP VIEW IF EXISTS public.command_report;
CREATE VIEW public.command_report AS
SELECT tier_name,
    COUNT(*) as active_nodes,
    COUNT(*) FILTER (
        WHERE trial_end < NOW() + INTERVAL '48 hours'
    ) as critical_nodes
FROM public.subscriptions
WHERE status = 'active'
GROUP BY tier_name;
-- 3. FIX THE TRIGGER FUNCTION (Using correct language 'plpgsql')
CREATE OR REPLACE FUNCTION set_trial_duration() RETURNS TRIGGER AS $$ BEGIN IF NEW.tier_name = 'Sovereign Initiate' THEN NEW.trial_end := NOW() + INTERVAL '14 days';
ELSE NEW.trial_end := NOW() + INTERVAL '30 days';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS on_subscription_created ON public.subscriptions;
CREATE TRIGGER on_subscription_created BEFORE
INSERT ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION set_trial_duration();
-- 4. CREATE USAGE LOGS TABLE (If not exists)
CREATE TABLE IF NOT EXISTS public.usage_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users,
    action_type text NOT NULL,
    details jsonb DEFAULT '{}',
    created_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;
-- Drop policies to avoid 'policy already exists' errors if re-running
DROP POLICY IF EXISTS "Users can insert their own usage logs" ON public.usage_logs;
DROP POLICY IF EXISTS "Admins can view all usage logs" ON public.usage_logs;
CREATE POLICY "Users can insert their own usage logs" ON public.usage_logs FOR
INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all usage logs" ON public.usage_logs FOR
SELECT TO authenticated USING (
        auth.uid() = user_id
        OR EXISTS (
            SELECT 1
            FROM subscriptions
            WHERE user_id = auth.uid()
                AND tier_name = 'Director Pack'
        )
    );