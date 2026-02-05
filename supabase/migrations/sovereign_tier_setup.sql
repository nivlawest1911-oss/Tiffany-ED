-- Create a clean, subscription-only table for EdIntel
CREATE TABLE IF NOT EXISTS public.subscriptions (
    user_id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
    tier_name text NOT NULL,
    -- e.g., 'Site Command', 'Sovereign Initiate'
    status text DEFAULT 'active',
    trial_end timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);
-- SQL Logic to set trial days based on the tier
CREATE OR REPLACE FUNCTION set_trial_duration() RETURNS TRIGGER AS $$ BEGIN -- If it's the Initiate ($0/Signup), set to 14 days. Others get 30.
    IF NEW.tier_name = 'Sovereign Initiate' THEN NEW.trial_end := NOW() + INTERVAL '14 days';
ELSE NEW.trial_end := NOW() + INTERVAL '30 days';
END IF;
RETURN NEW;
END;
$$ LANGUAGE pl_pgsql;
DROP TRIGGER IF EXISTS on_subscription_created ON public.subscriptions;
CREATE TRIGGER on_subscription_created BEFORE
INSERT ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION set_trial_duration();