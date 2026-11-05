# Verification — 5 November 2026

Scope corrected: the free platform is live; only Builder Pro uses a waitlist. The supplied logo and original #FC6519 palette are used throughout. The banner embeds the exact supplied logo.

## Passed

- SvelteKit 3 / Svelte 5 / Vite 8 / TypeScript 6 toolchain; svelte-check has zero errors and warnings.
- ESLint and formatting checks for active source.
- Anonymous course discovery and complete lesson access without waitlist or account.
- Free registration, sessions, returning login and sign-out.
- Persisted lesson completion and dashboard progress.
- Project publishing, feedback and appreciation.
- Ownership protection against unauthenticated deletion.
- Challenge submissions and free course authoring.
- Separate Pro-only waitlist, enforced paid-interest value, duplicate prevention and explicit withdrawal.
- Mobile navigation at 390px without horizontal overflow.
- Original-logo PWA icons, standalone manifest, active service worker, offline opened-lesson reload, uncached offline fallback and private-cache exclusions.
- Password-confirmed account deletion, profile name updates, cross-account deletion denial and anonymised public bylines.
- These browser/PWA/security checks also passed against the live custom domain. All disposable test records were removed.

Audit after patched transitive overrides: five low-severity findings remain; zero moderate/high/critical. The remaining low findings propagate from the deepmerge advisory through framework integrations. Do not claim vulnerability-free dependencies.

Application and service worker compile locally. The Vercel adapter needs Windows symlink privileges for its local packaging step; production packaging is verified on Vercel Linux instead.

## External setup limits

Brevo API key remains unavailable locally: the existing Compete Vercel key is sensitive and cannot be exported. Email confirmation and automated password recovery are not verified/active. Account support is linked in the app. Signup storage and free account access work without email delivery. Paystack checkout is deliberately inactive; only the paid upgrade is coming soon. Groq is configured server-side and unused by this release.

No existing Supabase data was migrated or removed. The original prototype is preserved under archive/prototype. New accounts and active platform content use only the isolated colearn Neon schema.
