CREATE SCHEMA IF NOT EXISTS colearn;
CREATE TABLE IF NOT EXISTS colearn.waitlist (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email text NOT NULL UNIQUE,
 name text NOT NULL DEFAULT '', track text NOT NULL, plan text NOT NULL CHECK (plan IN ('free','pro','unsure')),
 price_cents integer NOT NULL DEFAULT 7900, consent_version text NOT NULL DEFAULT '2026-11-05',
 leave_token_hash text NOT NULL UNIQUE, created_at timestamptz NOT NULL DEFAULT now(),
 email_sent_at timestamptz
);
CREATE TABLE IF NOT EXISTS colearn.rate_limits (key text PRIMARY KEY, hits integer NOT NULL DEFAULT 1, expires_at timestamptz NOT NULL);
