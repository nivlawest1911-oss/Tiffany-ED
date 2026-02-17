-- ==========================================
-- 🛡️ SOVEREIGN SECURITY PATCH: SEARCH PATH HARDENING
-- Remediation for 'function_search_path_mutable' Lints
-- ==========================================
-- 1. Fix `public.set_updated_at`
-- Secure the search path to prevent mapped object injection
ALTER FUNCTION public.set_updated_at()
SET search_path = public,
    extensions;
-- 2. Fix `public.set_updated_at_metadata`
-- Secure the search path for metadata updates
ALTER FUNCTION public.set_updated_at_metadata()
SET search_path = public,
    extensions;
-- NOTE:
-- For 'auth_leaked_password_protection', this must be enabled in the Dashboard:
-- Go to Authentication > Providers > Password > "Enable leaked password protection"