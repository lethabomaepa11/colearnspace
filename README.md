
# CoLearnSpace

A modern web application built with [SvelteKit](https://kit.svelte.dev), Supabase, and a modular feature-first architecture. This app is designed to scale, with a strong focus on shared logic, clean data handling, and good developer experience😅😓.

---
## Features
- Challenges: Create/host a tech challenge, have users battle it out to showcase their skills as they solve a problem you created💀I'm kidding... but for real
- Courses: Create courses using videos under 50mb or use your youtube videos, can be embedded into your modules easily, just copy and paste the video link
- Not sure if its a feature☠️ But you don't have to create an account to use the features here, "ghost" has got your back😅just don't abuse him🥺he's already working overtime.
## What to expect as a Dev?

- Feature-based folder structure (`/challenges`, `/courses`, etc.)
- Shared business logic in `/lib/server/[feature]/`
- API routes in `/routes/api/`
- SSR-powered data fetching using `+page.server.ts`
- Supabase for authentication, storage, and database
- Supports both authenticated and anonymous users

---

## 🗂️ Project Structure

```

/
├── lib/
│   └── server/
│       └── challenges/
│           ├── core.ts         # Main logic: fetching challenges, etc.
│           ├── submissions.ts  # Submission logic
│           └── community.ts    # Community topics logic
│
├── routes/
│   ├── challenge/
│   │   └── \[slug]/
│   │       ├── +page.svelte
│   │       ├── +page.server.ts  # Uses logic from lib/server/challenges
│   │       └── community/
│   │       └── submissions/
│   └── api/
│       └── challenge/
│           ├── +server.ts            # POST: Create challenge
│           └── \[slug]/
│               ├── +server.ts        # GET: Fetch specific challenge
│               └── submissions/
│                   └── +server.ts    # GET: Submissions for a challenge
│
└── README.md

````

---

## 🧠 Data Layer Philosophy

We use shared logic in `lib/server` to prevent code duplication. If a feature needs data fetching, validation, or transformation:

- Create a folder for it in `lib/server/[feature]`
- Place all logic functions in meaningful files (`core.ts`, `submissions.ts`, etc.)
- Reuse these functions in both:
  - `+page.server.ts` (for SSR)
  - `+server.ts` (for APIs)

---

## 💡 Example: How to Fetch Challenge Submissions

```ts
// lib/server/challenges/submissions.ts
export async function getSubmissionsForChallenge(slug: string) {
  // Supabase logic here
}

// routes/api/challenge/[slug]/submissions/+server.ts
import { getSubmissionsForChallenge } from '$lib/server/challenges/submissions';

export async function GET({ params }) {
  const submissions = await getSubmissionsForChallenge(params.slug);
  return json(submissions);
}
````

---

## Running Locally
Lets get into business now

### You just have to...
```bash
npm install
npm run dev
```
### To spin up your backend, make sure you have Docker installed and running
Run the following command
```bash
npx supabase start
```

It will download the supabase docker image for you to use locally
When its done running, you will have to copy the supabase url and the anon key and create a .env file in the root of your project


Then set up your `.env` with Supabase keys, for example:

```env
PUBLIC_SUPABASE_URL=...
PUBLIC_SUPABASE_ANON_KEY=...
```
#### If you are having trouble with the previous step, go to this link https://supabase.com/docs/guides/local-development
---

## 🌱 Contributing

If you're adding a new feature:

* Create a new folder in `lib/server/[feature]`
* Add functions for handling server logic there
* Use those in `+server.ts` or `+page.server.ts` as needed
* Keep your files short and single-responsibility

---

## 🔐 Security Notes

We support both authenticated and anonymous access. For anonymous users, progress tracking is done using the client IP address (non-invasive, limited use). Avoid storing any sensitive data.

---

## 📦 Tech Stack

* SvelteKit
* Docker
* Supabase (PostgreSQL, Storage, Auth)
* TypeScript
* Lucide Icons (via `lucide-svelte`)
* TailwindCSS 


