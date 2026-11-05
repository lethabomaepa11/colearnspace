<script>
	import AppHeader from '#lib/components/AppHeader.svelte';
	import { enhance } from '$app/forms';
	import { ArrowUpRight, Check, CheckCircle2 } from '@lucide/svelte';
	let { form } = $props();
	let busy = $state(false);
</script>

<svelte:head
	><title>Builder Pro · coming soon | CoLearnSpace</title><meta
		name="description"
		content="Join the waitlist for Builder Pro at a proposed R79/month. All existing free courses, challenges and project features remain available."
	/></svelte:head
><AppHeader />
<main id="app-main" class="app-main">
	<a class="back-link" href="/portal">← Keep exploring the free app</a>
	<div class="pro-layout">
		<section>
			<p class="eyebrow">ONLY THE UPGRADE IS ON THE WAITLIST</p>
			<h1>A little more<br /><em>momentum.</em></h1>
			<p>
				Builder Pro is coming soon at a proposed <strong>R79/month</strong>. Help us decide which
				extras to build first.
			</p>
			<ul class="pro-benefits">
				<li><Check size={18} />AI guidance when you get stuck</li>
				<li><Check size={18} />Additional structured learning paths</li>
				<li><Check size={18} />More portfolio and feedback tools</li>
			</ul>
			<p class="field-help">
				These are proposed Pro extras. Your existing free courses, challenges, publishing, feedback
				and progress tracking stay available. Future subscriptions will use Paystack.
			</p>
			<a class="text-link" href="/portal">I’ll keep learning for free <ArrowUpRight size={16} /></a>
		</section>
		<section class="signup-card pro-signup">
			{#if form?.success}<div class="success-state" role="status">
					<CheckCircle2 size={40} />
					<h2>You’re on the Pro list.</h2>
					<p>
						Your interest is saved. No payment or subscription has started. {form.emailSent
							? 'Check your email for a confirmation and leave-waitlist link.'
							: 'We’ll email when there is news. You can contact support any time to leave the list.'}
					</p>
					<a class="button" href="/portal">Back to the free app ↗</a>
				</div>{:else}<form
					method="POST"
					use:enhance={() => {
						busy = true;
						return async ({ update }) => {
							await update({ reset: false });
							busy = false;
						};
					}}
				>
					<span class="tiny-tag">COMING SOON</span>
					<h2>Interested at R79/month?</h2>
					<p class="form-intro">No card. No commitment. Just Pro updates.</p>
					{#if form?.message}<p class="form-error" role="alert">{form.message}</p>{/if}<label
						for="name">First name (optional)</label
					><input
						id="name"
						name="name"
						maxlength="60"
						autocomplete="given-name"
						value={form?.values?.name || ''}
					/><label for="email">Email address</label><input
						id="email"
						name="email"
						type="email"
						required
						autocomplete="email"
						maxlength="254"
						value={form?.values?.email || ''}
					/><label for="track">Your main learning interest</label><select id="track" name="track"
						><option>Web development</option><option>Data &amp; analytics</option><option
							>UI/UX design</option
						><option>Still exploring</option></select
					><input type="hidden" name="plan" value="pro" />
					<div class="honey" aria-hidden="true">
						<label for="company">Company</label><input
							id="company"
							name="company"
							tabindex="-1"
							autocomplete="off"
						/>
					</div>
					<label class="consent"
						><input type="checkbox" name="consent" required /><span
							>I agree to Pro waitlist and launch emails. I can leave at any time. <a
								href="/privacy">Privacy details</a
							>.</span
						></label
					><button class="button submit" disabled={busy}
						>{busy ? 'Saving your interest…' : 'Join the Pro waitlist'}<ArrowUpRight
							size={17}
						/></button
					>
					<p class="form-footer">An expression of interest, never a purchase.</p>
				</form>{/if}
		</section>
	</div>
</main>
