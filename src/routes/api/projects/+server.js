import { createproject, getProject, getProjects, getProjectsByUserId } from '$lib/server/projects/main.js';
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

export const GET = async ({ locals: { supabase }, url, getClientAddress, request }) => {

	//possible seaarch params to be passed on the link
	const isPublic = url.searchParams.get('is_public') === 'true';
	const id = url.searchParams.get('id');
	let limit = url.searchParams.get('limit');
	let offset = Number(url.searchParams.get('offset')) || 0;

	const authHeader = await request.headers.get("authorization") || null;//check if the authHeader exists

	limit = limit ? Number(limit) : null;// set limit to null if its not passed, so that you can return everything if its being requested by external user

	const ip = getClientAddress();//get the client ip for rate limiting
	
	const cache = url.searchParams.get('cache') || 'none';//used for setting cache header
	
	
	// Rate limit check
	const { success } = await ratelimit.limit(ip);
	if (!success) {
		return new Response(
			JSON.stringify({ success: false, message: 'Rate limit exceeded' }),
			{ status: 429, headers: { 'Content-Type': 'application/json' } }
		);
	}

	//if the request is not requesting public data and it does not have an authorization header
	if (!isPublic && !authHeader) {
		return json({ success: false, message: 'Unauthorized Access' }, { status: 401 });
	}

	//if request is from an external user
	if(authHeader){

		const apiKey = authHeader.replace('Bearer ', '').trim();
		//get the user id by matching it with the api key in the api keys table
		const { data: user } = await supabase.from('api_keys').select('user_id').eq('id', apiKey).single();
		if(user){
			let data;//the data to be returned

			//set the cache header specified by the user
			const cacheHeader = cache == "private" ? "private, max-age=60" : "no-store" ;


			//check if the user is only requesting only one project
			if(id){
				//user is requesting only one project
				data = await getProject(id, supabase);
				if(data.status === 500){
					return json({success: false, message: data.error, status: 500});
				}
				//return the project as a single object
				return new Response(JSON.stringify({data: data.project}), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': cacheHeader,
				}
				});
			}
			else{
				//user is requesting all projects
				data = await getProjectsByUserId(user.user_id, supabase, { limit, offset });
				//return the data 
				return new Response(JSON.stringify({data: data.projects}), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': cacheHeader,
				}
				});
			}
			
			
		
			//return the data 
			return new Response(JSON.stringify({data: data.projects}), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': cacheHeader,
			}
			});
			
		}
		return json({success: false, message: "Unauthorized Access, Invalid API Key",status: 401});
		


	}

	// public request
	if(isPublic){
		const cacheKey = `projects:${limit}:${offset}`;
		// Try fetching from Redis
		try {
			const cached = await redis.get(cacheKey);
			if (cached) {
				const parsed = JSON.parse(cached);
				return new Response(JSON.stringify(parsed), {
					headers: {
						'Content-Type': 'application/json',
						'Cache-Control': 'public, max-age=300, s-maxage=300'
					}
				});
			}
		} catch (e) {
			console.warn('Redis error or invalid cache:', e.message);
			// Optionally clear broken cache
			await redis.del(cacheKey);
		}

		// Fetch fresh data from Supabase
		const data = await getProjects(supabase, { limit, offset });
		
		const payload = { success: true, data: data.projects };
		const stringified = JSON.stringify(payload);

		// Store in Redis (as string)
		await redis.set(cacheKey, stringified, { ex: 300 }); // 5 mins

		return new Response(stringified, {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=300, s-maxage=300'
			}
		});
	}
	

	

	
	
};
