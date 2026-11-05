# CoLearnSpace

Live at https://colearn.mosaictalent.co.za on Vercel. Free courses, lessons, progress tracking, challenges, submissions, community feedback and project showcases. Only Builder Pro has a waitlist at `/pro`; it proposes R79/month and does not charge. `/portal` is the free app, `/dashboard` the personal space.

## Stack

SvelteKit 3, Svelte 5, Vite 8, TypeScript 6, Tailwind 4, Better Auth 1.7, Neon PostgreSQL and the Vercel Node 24 adapter. The original Supabase prototype is preserved in `archive/prototype`, excluded from builds. It is reference code, not the active implementation. No Supabase data has been imported or deleted. Existing prototype credentials/accounts are not automatically migrated.

## Local setup

Copy `.env.example` to `.env`, set a Neon database and a new random `BETTER_AUTH_SECRET`, and set `BETTER_AUTH_URL` to your local origin. Run `npm install`, `npm run db:migrate`, `npm run db:platform`, `node scripts/seed-learning.mjs`, then `npm run dev`. The platform tables and authentication tables live only in the `colearn` schema; other apps are untouched. Starter courses and challenges are original practice content, not claims about accredited education or employment.

Run `npm run check`, `npm test`, `npm run lint`, and `npm run build`. On Windows the Vercel adapter packaging step needs symlink privileges; application and service worker compilation still complete. The production build is verified on Vercel Linux.

## Accounts and content

Reading is open. Publishing, feedback, votes, submissions and progress require a free email/password account. Better Auth provides hashed credentials, persistent sessions, CSRF protection and database rate limits. Contributions use additional persistent hourly limits and server-side ownership checks. Text is rendered as escaped plain text; outbound links accept HTTP(S) only. Videos use validated optional YouTube links and are not automatically downloaded.

Account settings support name updates and password-confirmed deletion. Public learning resources remain anonymised after account deletion; users can remove their own work before deleting the account. Password recovery/transactional email delivery still needs the existing Brevo key, which is sensitive in the Compete Vercel project and cannot be downloaded. Support contact is available in the meantime. No payment or paid entitlement logic is active.

## Paid upgrade only

`/pro` accepts only Pro interest at proposed ZAR 7900/month, regardless of submitted plan values. One entry per normalised email, explicit consent, duplicate-safe insertion, abuse controls and private hashed-token withdrawal. Existing free-interest records from the first iteration are retained, but excluded from paid metrics.

`/admin` uses HTTP Basic: username `owner`, password `ADMIN_PASSWORD`. It exposes aggregate paid-interest counts, not member emails. Brevo confirmation is best effort: missing email delivery never loses saved interest. No mailing-list contacts are automatically created.

Paystack is the intended future billing provider. Checkout is not implemented or enabled in this release. Before enabling billing, create a dedicated ZAR monthly plan, authenticated checkout, verified callbacks and webhook entitlements, cancellation/refund flows and provider sandbox checks. Do not reuse another product’s plan IDs. Groq credentials are server-only, reserved for upcoming Pro guidance and unused by free account or waitlist flows.

## PWA and original branding

Uses the supplied CoLearnSpace logo and original #FC6519 orange identity. `node scripts/icons.mjs` resizes the supplied logo for normal/maskable icons and Apple touch icons. `node scripts/banner.mjs` creates the share banner using the exact logo, never an AI-generated replacement mark.

The manifest launches `/portal` in standalone mode. The versioned service worker caches immutable app assets and up to 60 opened anonymous public pages. Signed-in responses, account pages, Pro pages, private withdrawal tokens and API requests are excluded. Online-first navigation falls back to an opened page or a clear offline screen. Writes are never queued or falsely reported as saved. Optional videos require internet access. Install guidance and a safe update prompt appear in the app.

## Verification scripts

`CHECK_ORIGIN=http://localhost:PORT node scripts/check-platform.mjs` verifies anonymous learning, signup, sessions, progress, publishing, feedback, votes, challenge submissions, course authoring, Pro separation, sign-out/sign-in and mobile navigation. Disposable content and accounts are removed. `check-launch.mjs` checks Pro interest and withdrawal. `check-ownership.mjs` tests cross-account access and password-confirmed account deletion. `check-pwa.mjs` requires a production build/preview or live HTTPS deployment and verifies the manifest, logo icons, offline lessons, fallback and private-cache exclusions.

## Operations

`node scripts/configure-vercel.mjs` copies explicit local `.env` names to production without printing values. Daily authenticated Vercel cron cleans abuse limits and expired waitlist interest; `scripts/cleanup.mjs` is the manual equivalent. Secrets are ignored by Git. Deployed under the owner’s existing Vercel team and custom domain.

## Research

[Afrobarometer](https://www.afrobarometer.org/articles/south-african-youth-see-job-creation-as-priority-area-for-additional-investment-look-to-government-for-work/) identifies experience and training gaps. [World Bank](https://www.worldbank.org/en/news/feature/2026/08/14/from-demand-to-delivery-strengthening-south-africas-digital-skills) recommends practical experience aligned to demand. [Frontiers](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1820563/full) discusses connectivity barriers. Product response: clear text-first courses, concrete briefs, feedback, portfolio stories, flexible learning and offline public reading. These choices do not imply employment guarantees.
