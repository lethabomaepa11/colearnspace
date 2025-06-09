## Shared Server Logic

We use **shared logic** for data fetching and most server-side operations to keep our codebase DRY and maintainable.

- Each **feature** in the app has its own folder under `src/lib/server/`
- When adding a new feature that interacts with the backend, **create a new file or folder there** for its server-side logic

---

### Example Directory Structure

src/
├── lib/
│ └── server/
│ ├── challenges/
│ │ ├── community.ts // logic for community topics
│ │ ├── submissions.ts // logic for submission handling
│ │ └── index.ts // optional: re-exports
│ └── users/
│ └── auth.ts
├── routes/
│ └── challenge/
│ └── [slug]/
│ ├── +page.server.ts // SSR using shared logic
│ ├── +server.ts // API route using same shared logic

---

### How to Use Shared Logic

#### Shared Function Example

<pre><code>// src/lib/server/challenges/community.ts
export async function getCommunityTopics(challengeSlug: string) {
  return await db.communityTopic.findMany({
    where: { challengeSlug },
    orderBy: { createdAt: 'desc' }
  });
}
</code></pre>

#### In a page load function

<pre><code>// src/routes/challenge/[slug]/+page.server.ts
import { getCommunityTopics } from '$lib/server/challenges/community';

export async function load({ params }) {
  const topics = await getCommunityTopics(params.slug);
  return { topics };
}
</code></pre>

#### In an API endpoint

<pre><code>// src/routes/api/challenge/[slug]/community/+server.ts
import { getCommunityTopics } from '$lib/server/challenges/community';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
  const topics = await getCommunityTopics(params.slug);
  return json(topics);
}
</code></pre>

---

### Performance Note

Use `+page.server.ts` when:

- You want data to be available immediately on page load (SSR)
- You don’t need the same data to be fetched client-side

Use API routes (`+server.ts`) when:

- You need client-side fetches (e.g., infinite scroll, filtering)
- You want the logic reusable by other clients (mobile, external apps)
