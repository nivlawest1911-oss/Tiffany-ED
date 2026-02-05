-- 1. Ensure the subscriptions table is up to spec
-- This handles legacy tables by adding the column if it's missing
CREATE TABLE IF NOT EXISTS public.subscriptions (
    user_id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
    status text DEFAULT 'active',
    created_at timestamp with time zone DEFAULT now()
);
-- Safely add columns if they don't exist (Idempotent)
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
-- 2. Drop and Recreate the View to ensure it matches the schema
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
-- 3. Verify Trigger Logic
CREATE OR REPLACE FUNCTION set_trial_duration() RETURNS TRIGGER AS $$ BEGIN IF NEW.tier_name = 'Sovereign Initiate' THEN NEW.trial_end := NOW() + INTERVAL '14 days';
ELSE NEW.trial_end := NOW() + INTERVAL '30 days';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS on_subscription_created ON public.subscriptions;
CREATE TRIGGER on_subscription_created BEFORE
INSERT ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION set_trial_duration();