CREATE VIEW public.command_report AS
SELECT tier_name,
    COUNT(*) as active_nodes,
    COUNT(*) FILTER (
        WHERE trial_end < NOW() + INTERVAL '48 hours'
    ) as critical_nodes
FROM public.subscriptions
WHERE status = 'active'
GROUP BY tier_name;