-- Sovereign Authentication Hardening
-- Ensures every new user gets a default role if one isn't provided
ALTER TABLE auth.users
ALTER COLUMN raw_user_meta_data
SET DEFAULT '{"role": "teacher"}';