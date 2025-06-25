import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	const next = url.searchParams.get('next') ?? '/dashboard'; // 
	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			// Auth successful — redirect to the intended page
			throw redirect(303, next);
		}
	}

	// Auth failed or no code — redirect to login
	throw redirect(303, '/auth/callback');
};
