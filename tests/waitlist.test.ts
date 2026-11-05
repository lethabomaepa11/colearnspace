import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateWaitlist } from '../src/lib/server/launch/validation.ts';
function entry(overrides: Record<string, string | undefined> = {}) {
	const form = new FormData();
	for (const [k, v] of Object.entries({
		email: '  LEARNER@example.com ',
		name: 'Lebo',
		track: 'Web development',
		plan: 'pro',
		consent: 'on',
		...overrides
	}))
		form.set(k, v ?? '');
	return form;
}
test('normalises email and captures explicit price-plan interest', () => {
	const result = validateWaitlist(entry());
	assert.equal(result.error, undefined);
	assert.equal(result.values.email, 'learner@example.com');
	assert.equal(result.values.plan, 'pro');
});
test('rejects missing consent, invalid email, unknown tracks and manipulated plans', () => {
	for (const value of [
		{ consent: '' },
		{ email: 'bad' },
		{ track: 'injected' },
		{ plan: 'paid' },
		{ name: '<script>' },
		{ email: 'x'.repeat(260) + '@example.com' }
	])
		assert.ok(validateWaitlist(entry(value)).error);
});
