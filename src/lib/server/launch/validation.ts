export const tracks = ['Web development', 'Data & analytics', 'UI/UX design', 'Still exploring'];
export function validateWaitlist(data: FormData) {
	const email = String(data.get('email') ?? '')
		.trim()
		.toLowerCase();
	const name = String(data.get('name') ?? '').trim();
	const track = String(data.get('track') ?? '');
	const plan = String(data.get('plan') ?? '');
	const values = { email, name, track, plan };
	if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
		return { error: 'Please enter a valid email address.', values };
	// Reject control characters in display names.
	// eslint-disable-next-line no-control-regex
	if (name.length > 60 || /[<>\x00-\x1f]/.test(name))
		return { error: 'Please use a first name of up to 60 characters.', values };
	if (!tracks.includes(track) || !['free', 'pro', 'unsure'].includes(plan))
		return { error: 'Please choose a learning path and a plan.', values };
	if (data.get('consent') !== 'on')
		return {
			error: 'Please agree to the waitlist emails so we can contact you about early access.',
			values
		};
	return { values };
}
