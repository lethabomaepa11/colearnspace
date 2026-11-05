<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import { ArrowUpRight, Check, Plus, Heart, Trash2 } from '@lucide/svelte';
	let { data, form } = $props();
	let lessonCount = $state(1);
	let deleting = $state(false);
	const singular: Record<string, string> = {
		courses: 'course',
		challenges: 'challenge',
		projects: 'project'
	};
	function videoId(value: string) {
		return value.match(/(?:v=|youtu.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
	}
</script>

<svelte:head
	><title>{data.item?.title || 'Create a ' + singular[data.section]} | CoLearnSpace</title
	></svelte:head
>
<main id="app-main" class="app-main">
	<a class="back-link" href={'/portal/' + data.section}>← All {data.section}</a>
	{#if !data.item}<div class="editor-heading">
			<p class="eyebrow">ADD SOMETHING USEFUL TO THE COMMUNITY</p>
			<h1>Create a {singular[data.section]}.</h1>
			<p>
				{data.section === 'courses'
					? 'Share what you know in small, practical lessons.'
					: data.section === 'challenges'
						? 'Give someone a clear problem to practise solving.'
						: 'Show your work, explain your thinking, and invite feedback.'}
			</p>
		</div>
		<form
			class="editor-form"
			method="POST"
			action="?/create"
			use:enhance={() =>
				async ({ update }) => {
					await update({ reset: false });
				}}
		>
			<p class="field-help">
				Everything you publish here is public. Use your own work and content you have permission to
				share.
			</p>
			{#if form?.message}<p class="form-error" role="alert">{form.message}</p>{/if}<label
				for="title">Give it a clear title</label
			><input
				id="title"
				name="title"
				required
				minlength="3"
				maxlength="120"
				placeholder={data.section === 'projects'
					? 'A booking app for a neighbourhood barber'
					: 'What will someone learn or build?'}
			/><label for="description">One-paragraph summary</label><textarea
				id="description"
				name="description"
				required
				minlength="20"
				maxlength="400"
				rows="3"
				placeholder="Who is this for, and what will they get out of it?"></textarea>
			<div class="form-columns">
				<div>
					<label for="track">Track</label><select id="track" name="track"
						><option>Web development</option><option>Data &amp; analytics</option><option
							>UI/UX design</option
						><option>Other</option></select
					>
				</div>
				<div>
					<label for="level">Level</label><select id="level" name="level"
						><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select
					>
				</div>
			</div>
			<label for="body"
				>{data.section === 'projects'
					? 'The story behind your project'
					: data.section === 'challenges'
						? 'The brief and success criteria'
						: 'Course introduction'}</label
			><textarea
				id="body"
				name="body"
				required
				minlength="50"
				maxlength="20000"
				rows="9"
				placeholder={data.section === 'projects'
					? 'What problem did you solve? What did you try? What did you learn?'
					: data.section === 'challenges'
						? 'Describe the problem, requirements, constraints, and what a good submission should include.'
						: 'Explain the goal, what people need before starting, and what they will be able to do afterwards.'}
			></textarea><label for="link"
				>{data.section === 'projects'
					? 'Live project or repository link'
					: 'Optional reference link'}</label
			><input
				id="link"
				name="link"
				type="url"
				placeholder="https://"
			/>{#if data.section === 'courses'}<div class="lesson-editor">
					<h2>Build your lessons</h2>
					<p class="field-help">Write useful guidance first. A YouTube video is optional.</p>
					{#each Array.from({ length: lessonCount }, (_, index) => index) as i (i)}<fieldset>
							<legend>Lesson {i + 1}</legend><label for={'lesson-title-' + i}>Lesson title</label
							><input
								id={'lesson-title-' + i}
								name={'lessonTitle' + i}
								required
								minlength="3"
								maxlength="120"
							/><label for={'lesson-body-' + i}>Guidance and practice task</label><textarea
								id={'lesson-body-' + i}
								name={'lessonBody' + i}
								required
								minlength="30"
								maxlength="15000"
								rows="7"></textarea><label for={'lesson-video-' + i}>YouTube link (optional)</label
							><input
								id={'lesson-video-' + i}
								name={'lessonVideo' + i}
								type="url"
								placeholder="https://www.youtube.com/watch?v=…"
							/>
						</fieldset>{/each}
					<div class="inline-actions">
						<button
							class="button secondary"
							type="button"
							disabled={lessonCount >= 12}
							onclick={() => lessonCount++}><Plus size={16} />Add lesson</button
						>{#if lessonCount > 1}<button
								class="text-link"
								type="button"
								onclick={() => lessonCount--}>Remove last lesson</button
							>{/if}
					</div>
				</div>{/if}<button class="button"
				>Publish {singular[data.section]} <ArrowUpRight size={17} /></button
			>
		</form>
	{:else}<article>
			<header class="content-heading">
				<div class="card-meta">
					<span>{data.item.track}</span><span>{data.item.level}</span><span>Free</span>
				</div>
				<h1>{data.item.title}</h1>
				<p>{data.item.description}</p>
				<div class="content-byline">
					By {data.item.author_name}<span>·</span>{new Date(
						data.item.created_at
					).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
				</div>
			</header>
			{#if form?.message}<p class="action-message" role="status">{form.message}</p>{/if}
			<div class="reading-layout">
				<div class="reading-content">
					<section class="prose-content">
						<h2>
							{data.section === 'challenges'
								? 'Your brief'
								: data.section === 'projects'
									? 'Behind the build'
									: 'Before you begin'}
						</h2>
						<p class="preserve-lines">{data.item.body}</p>
						{#if data.item.link}<a
								class="button secondary"
								href={data.item.link}
								target="_blank"
								rel="noopener noreferrer"
								>{data.section === 'projects' ? 'Open project' : 'Open reference'}
								<ArrowUpRight size={16} /></a
							>{/if}
					</section>
					{#if data.section === 'courses' && data.item.lessons.length}<section
							class="lesson-content"
						>
							<p class="eyebrow">LESSON {data.lesson + 1} OF {data.item.lessons.length}</p>
							<h2>{data.item.lessons[data.lesson].title}</h2>
							<p class="preserve-lines">{data.item.lessons[data.lesson].body}</p>
							{#if data.item.lessons[data.lesson].video && videoId(data.item.lessons[data.lesson].video!)}<details
									class="video-detail"
								>
									<summary>Watch the optional video (uses data)</summary><iframe
										title={data.item.lessons[data.lesson].title}
										src={'https://www.youtube-nocookie.com/embed/' +
											videoId(data.item.lessons[data.lesson].video!)}
										loading="lazy"
										allowfullscreen
									></iframe>
								</details>{/if}{#if page.data.user}<form
									method="POST"
									action="?/complete"
									use:enhance
								>
									<input type="hidden" name="lesson" value={data.lesson} /><button class="button"
										>{#if data.completed.includes(data.lesson)}<Check size={16} />Completed · mark
											unfinished{:else}Mark lesson complete <Check size={16} />{/if}</button
									>
								</form>{:else}<a class="button" href="/auth/register"
									>Save my progress · join free ↗</a
								>{/if}
							<div class="lesson-pagination">
								{#if data.lesson > 0}<a href={'?lesson=' + (data.lesson - 1)}>← Previous lesson</a
									>{/if}{#if data.lesson < data.item.lessons.length - 1}<a
										href={'?lesson=' + (data.lesson + 1)}>Next lesson →</a
									>{/if}
							</div>
						</section>{/if}
					{#if data.section === 'challenges'}<section class="discussion-section">
							<h2>Show us your approach.</h2>
							<p>
								Submit a public link to your work and explain the decisions you made. Please leave
								out private information.
							</p>
							{#if page.data.user}<form
									class="editor-form compact"
									method="POST"
									action="?/submission"
									use:enhance
								>
									<label for="submission-link">Project or repository URL</label><input
										id="submission-link"
										name="link"
										type="url"
										required
									/><label for="submission-body">Your approach and what you learned</label><textarea
										id="submission-body"
										name="body"
										required
										minlength="20"
										maxlength="3000"
										rows="4"></textarea><button class="button"
										>Share my submission <ArrowUpRight size={16} /></button
									>
								</form>{:else}<a class="button" href="/auth/register"
									>Join free to submit your work ↗</a
								>{/if}
							<h3>{data.submissions.length} submissions</h3>
							{#each data.submissions as entry (entry.id)}<div class="community-post">
									<strong>{entry.name}</strong>
									<p class="preserve-lines">{entry.body}</p>
									<a class="text-link" href={entry.link} target="_blank" rel="noopener noreferrer"
										>See the work ↗</a
									>{#if entry.user_id === page.data.user?.id}<form
											method="POST"
											action="?/removeComment"
											use:enhance
										>
											<input name="id" type="hidden" value={entry.id} /><button class="quiet-button"
												>Delete my submission</button
											>
										</form>{/if}
								</div>{:else}<p class="field-help">
									No submissions yet. There’s room for your take.
								</p>{/each}
						</section>{/if}
					<section class="discussion-section">
						<h2>Questions, ideas, feedback.</h2>
						<p>Be specific, be kind, and help someone take their next step.</p>
						{#if page.data.user}<form
								class="editor-form compact"
								method="POST"
								action="?/comment"
								use:enhance
							>
								<label for="comment">What would you like to share?</label><textarea
									id="comment"
									name="body"
									required
									minlength="3"
									maxlength="3000"
									rows="3"></textarea><button class="button"
									>Post feedback <ArrowUpRight size={16} /></button
								>
							</form>{:else}<a class="text-link" href="/auth/login"
								>Sign in to join the conversation ↗</a
							>{/if}{#each data.comments as entry (entry.id)}<div class="community-post">
								<strong>{entry.name}</strong>
								<p class="preserve-lines">{entry.body}</p>
								{#if entry.user_id === page.data.user?.id}<form
										method="POST"
										action="?/removeComment"
										use:enhance
									>
										<input type="hidden" name="id" value={entry.id} /><button class="quiet-button"
											>Delete my comment</button
										>
									</form>{/if}
							</div>{:else}<p class="field-help">
								No comments yet. A thoughtful question is a great place to start.
							</p>{/each}
					</section>
				</div>
				<aside class="learning-sidebar">
					{#if data.section === 'courses'}<p class="eyebrow">YOUR LEARNING PATH</p>
						<h3>
							{page.data.user
								? data.completed.length + ' / ' + data.item.lessons.length + ' complete'
								: 'Learn at your pace'}
						</h3>
						<div class="progress-track">
							<span
								style={'width:' +
									(100 * data.completed.length) / Math.max(1, data.item.lessons.length) +
									'%'}
							></span>
						</div>
						{#each data.item.lessons as lesson, i (i)}<a
								class:current={data.lesson === i}
								class="lesson-nav"
								href={'?lesson=' + i}
								><span>{data.completed.includes(i) ? '✓' : String(i + 1).padStart(2, '0')}</span
								>{lesson.title}</a
							>{/each}{:else}<p class="eyebrow">A LITTLE ENCOURAGEMENT</p>
						<h3>{data.item.votes || 0} appreciations</h3>
						{#if page.data.user}<form method="POST" action="?/vote" use:enhance>
								<button class="button secondary"
									><Heart size={16} />{data.voted ? 'Appreciated' : 'Appreciate this'}</button
								>
							</form>{:else}<a class="text-link" href="/auth/login">Sign in to appreciate ↗</a>{/if}
						<p class="field-help">
							Notice something helpful? Let the creator know.
						</p>{/if}{#if data.item.author_id === page.data.user?.id}<div class="owner-tools">
							<button class="quiet-button" onclick={() => (deleting = !deleting)}
								><Trash2 size={13} />Delete my {singular[data.section]}</button
							>{#if deleting}<p class="field-help">
									This also deletes associated comments and progress. This cannot be undone.
								</p>
								<form method="POST" action="?/remove">
									<button class="button danger">Delete permanently</button>
								</form>
								<button class="quiet-button" onclick={() => (deleting = false)}>Keep it</button
								>{/if}
						</div>{/if}
				</aside>
			</div>
		</article>{/if}
</main>
