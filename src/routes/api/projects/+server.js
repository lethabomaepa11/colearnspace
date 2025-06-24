import { createproject, getProjects } from '$lib/server/projects/main.js';
import { ratelimit, redis } from '$lib/server/rateLimiter.js';
import { json } from '@sveltejs/kit';




export const POST = async ({ locals: { supabase }, request, getClientAddress }) => {
    const ip = getClientAddress();
    const {success} = await ratelimit.limit(ip);
    if(!success){
        return json({success: false, message: "Rate limit exceeded", status: 429});
    }
	const { project } = await request.json();
	const data = await createproject(supabase, project);

  // optional: clear all cached pages after creating a project
	await redis.del('projects:10:0'); 

	return json({ success: true, data: data.project });
};

export const GET = async ({ locals: { supabase }, url, getClientAddress }) => {
	const ip = getClientAddress();

	// Apply rate limiting
	const { success } = await ratelimit.limit(ip);
	if (!success) {
		return json({ success: false, message: 'Rate limit exceeded', status: 429 });
	}

	// Handle pagination
	const limit = Number(url.searchParams.get('limit')) || 10;
	const offset = Number(url.searchParams.get('offset')) || 0;
	const cacheKey = `projects:${limit}:${offset}`;

	// Check Upstash Redis cache
	const cached = await redis.get(cacheKey);
	if (cached) {
		return json({ success: true, data: cached });
	}

	// Fetch fresh data from Supabase
	const data = await getProjects(supabase, { limit, offset });

	// Store in Redis for 5 minutes
	await redis.set(cacheKey, data.projects, { ex: 300 }); // 300 seconds = 5 minutes

	return json({ success: true, data: data.projects });
};
