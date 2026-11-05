import { error, redirect } from '@sveltejs/kit';
export const load = ({ params, locals }) => {
	if (!['login', 'register'].includes(params.mode)) error(404);
	if (locals.user) redirect(303, '/dashboard');
	return { mode: params.mode };
};
