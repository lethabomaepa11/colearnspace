import { defineEnvVars } from '@sveltejs/kit/env';
const optional = { schema: (value: string | undefined) => value || '' };
export const variables = defineEnvVars({
	DATABASE_URL: optional,
	BETTER_AUTH_SECRET: optional,
	BETTER_AUTH_URL: optional,
	BREVO_API_KEY: optional,
	BREVO_SENDER_EMAIL: optional,
	CONTACT_EMAIL: optional,
	GROQ_API_KEY: optional,
	GROQ_MODEL: optional,
	RATE_LIMIT_SECRET: optional,
	ADMIN_PASSWORD: optional,
	CRON_SECRET: optional,
	BILLING_ENABLED: optional,
	PAYSTACK_SECRET_KEY: optional,
	PAYSTACK_PLAN_CODE: optional
});
