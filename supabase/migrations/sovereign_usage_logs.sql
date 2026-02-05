CREATE TABLE public.usage_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users,
    action_type text NOT NULL,
    -- e.g., 'InVideo_Generation', 'Canva_Design'
    details jsonb DEFAULT '{}',
    created_at timestamp with time zone DEFAULT now()
);
-- RLS Policies
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert their own usage logs" ON public.usage_logs FOR
INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all usage logs" ON public.usage_logs FOR
SELECT TO authenticated USING (
        -- Assuming a simple admin check or based on tier. 
        -- For now, letting users see their own logs is safe, admins tracked via other means or direct DB access
        auth.uid() = user_id
        OR EXISTS (
            SELECT 1
            FROM subscriptions
            WHERE user_id = auth.uid()
                AND tier_name = 'Director Pack'
        ) -- Example admin logic
    );