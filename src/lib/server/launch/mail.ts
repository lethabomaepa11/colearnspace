import { env } from '#lib/server/env.js';

export async function sendConfirmation(email: string, token: string) {
	if (!env.BREVO_API_KEY || !env.BREVO_SENDER_EMAIL) return false;

	const leaveUrl = `https://colearn.mosaictalent.co.za/waitlist/leave?token=${token}`;

	try {
		const response = await fetch('https://api.brevo.com/v3/smtp/email', {
			method: 'POST',
			signal: AbortSignal.timeout(10000),

			headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json' },

			body: JSON.stringify({
				sender: { email: env.BREVO_SENDER_EMAIL, name: 'CoLearnSpace' },
				to: [{ email }],
				subject: 'You’re on the CoLearnSpace waitlist',

				htmlContent: `<html><body style="font-family:Arial,sans-serif;color:#171717;max-width:560px;margin:40px auto;padding:24px"><p>COLEARNSPACE</p><h1>A little progress.<br>A world of possibility.</h1><p>You’re on the list. Thanks for helping shape a space for guided projects, useful feedback and learning together.</p><p>We’ll email you when early access is ready. No payment or subscription has been started. Any prices and features are proposed and will be confirmed before launch.</p><p>Changed your mind? <a href="${leaveUrl}">Leave the waitlist</a>.</p><p>Questions? Reply to this email.</p></body></html>`,

				textContent: `You’re on the CoLearnSpace waitlist. We’ll email when early access is ready. No payment or subscription has started. Leave the waitlist: ${leaveUrl}`,

				replyTo: { email: env.CONTACT_EMAIL || 'lethabomaepa11@gmail.com', name: 'CoLearnSpace' }
			})
		});

		if (!response.ok) console.error('Brevo confirmation failed with status', response.status);

		return response.ok;
	} catch {
		console.error('Brevo confirmation unavailable');
		return false;
	}
}
