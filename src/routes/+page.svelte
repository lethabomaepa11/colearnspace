<script lang="ts">
	import AppHeader from '#lib/components/AppHeader.svelte';

	import { ArrowUpRight, ArrowRight, Check, Code2, Layers, Sparkles, Users } from '@lucide/svelte';

	let track = $state('Web development');

	const tracks = ['Web development', 'Data & analytics', 'UI/UX design'];
	const projects: Record<
		string,
		{ title: string; description: string; tools: string; tasks: string[] }
	> = {
		'Web development': {
			title: 'Build a local business website',
			description:
				'Turn a real-world brief into a responsive site a small business could actually use.',
			tools: 'HTML · CSS · JavaScript',
			tasks: [
				'Understand the customer and sketch a solution',
				'Build a responsive page with a working contact form',
				'Get feedback and publish your project story'
			]
		},
		'Data & analytics': {
			title: 'Find the story in a sales dataset',
			description:
				'Explore a sample local shop dataset and turn your findings into a useful decision.',
			tools: 'Spreadsheets · SQL · Visualisation',
			tasks: [
				'Clean a small, messy sales dataset',
				'Find patterns and explain what matters',
				'Publish a dashboard with your recommendations'
			]
		},
		'UI/UX design': {
			title: 'Make a booking flow feel effortless',
			description: 'Design a clearer mobile booking experience for a neighbourhood service.',
			tools: 'Research · Figma · Prototyping',
			tasks: [
				'Map the problem and the customer journey',
				'Prototype a simple mobile booking flow',
				'Test your idea and write up what changed'
			]
		}
	};
	const faqs = [
		[
			'Can I use CoLearnSpace today?',
			'Yes. Browse free courses, complete practical challenges, and explore community projects. Reading is open without an account. Create a free account to save progress, publish your work, submit to challenges and leave feedback.'
		],
		[
			'What is on the waitlist?',
			'Only Builder Pro. The free app is available now. Pro is a proposed R79/month upgrade for additional AI guidance and learning support; joining its waitlist starts no subscription.'
		],
		[
			'Do I need a degree?',
			'No. Start with a beginner course and a practical brief. You can use tools you already have and learn at your own pace.'
		],
		[
			'Will this help me get a job?',
			'Projects can help you practise and explain your work. We do not promise a job, internship, accreditation or recognised qualification.'
		],
		[
			'Can I use it offline?',
			'Install CoLearnSpace as an app. Previously opened public learning pages can be read offline; saving progress, signing in and sharing work require a connection. Videos require internet access.'
		],
		[
			'Can I share my own knowledge?',
			'Yes. A free account lets you publish courses, challenges and projects. Share only content you have permission to publish, and leave out personal or sensitive information.'
		]
	];
</script>

<svelte:head>
	<title>CoLearnSpace — Less watching. More making.</title>
	<meta
		name="description"
		content="A clearer path from learning to a portfolio you can be proud of. Guided projects, feedback and a community to build with. Explore free courses, challenges and projects."
	/>
	<link rel="canonical" href="https://colearn.mosaictalent.co.za/" />
	<meta property="og:title" content="CoLearnSpace — Less watching. More making." />
	<meta
		property="og:description"
		content="Turn what you learn into work you can show. Explore the free app."
	/>
	<meta property="og:image" content="https://colearn.mosaictalent.co.za/banner.png" />
	<meta property="og:url" content="https://colearn.mosaictalent.co.za/" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="launch-site">
	<a class="skip-link" href="#main">Skip to content</a>
	<div class="announcement">
		<span class="status-dot"></span> Your next chapter is open.
		<a href="/portal">Explore the free app <ArrowRight size={13} /></a>
	</div>
	<AppHeader />
	<main id="main">
		<section class="hero wrap">
			<div class="hero-copy">
				<p class="eyebrow">
					<span class="mini-line"></span> FOR THE CURIOUS. THE BUILDERS. THE NOT-YET-SURE.
				</p>
				<h1>
					Less watching.<br />More <span class="italic-word">making.</span><span
						class="orange-period">*</span
					>
				</h1>
				<p class="hero-description">
					You don’t need another saved tutorial.<br class="desktop-break" /> You need a next step, people
					in your corner, and something to show for it.
				</p>
				<div class="hero-actions">
					<a class="button" href="/portal">Start building for free <ArrowUpRight size={18} /></a><a
						class="text-link"
						href="#paths">Take a look around <ArrowRight size={16} /></a
					>
				</div>
				<p class="microcopy">
					<Check size={14} /> Free courses, challenges and showcases. No card.
				</p>
				<div class="hero-footnote">
					<span class="hand-arrow">↳</span>
					<p>*Small steps. Real projects.<br />A little less figuring it out alone.</p>
				</div>
			</div>
			<div class="workspace" aria-label="Illustrative preview of a CoLearnSpace project path">
				<div class="workspace-top">
					<span class="window-dots"><i></i><i></i><i></i></span><span>YOUR NEXT CHAPTER</span><span
						class="preview-label">YOUR LEARNING JOURNEY</span
					>
				</div>
				<div class="workspace-body">
					<div class="workspace-heading">
						<span class="tiny-tag"><span class="status-dot"></span> YOUR LEARNING SPACE</span><span
							class="workspace-avatar">Y</span
						>
					</div>
					<h2>A little progress.<br />A lot of possibility.</h2>
					<p>One project. One step at a time.</p>
					<div class="project-preview">
						<div class="project-icon"><Code2 size={24} /></div>
						<div>
							<span class="eyebrow">WEB DEVELOPMENT · STARTER PROJECT</span>
							<h3>A website for the corner café</h3>
						</div>
						<ArrowUpRight size={18} />
					</div>
					<div class="task-row">
						<span class="task-check"><Check size={13} /></span><span>Meet the brief</span><span
							class="task-time">10 min</span
						>
					</div>
					<div class="task-row current">
						<span class="task-number">2</span><span>Make your first version</span><ArrowRight
							size={15}
						/>
					</div>
					<div class="task-row muted">
						<span class="task-number">3</span><span>Share it. Make it better.</span><Users
							size={15}
						/>
					</div>
					<div class="workspace-bottom">
						<div class="avatar-stack"><span>K</span><span>T</span><span>M</span></div>
						<p>Better with a few people<br /><strong>building alongside you.</strong></p>
						<span class="spark">✳</span>
					</div>
				</div>
				<div class="floating-note">
					<span>✦</span> From “I’m learning”<br /><strong>to “I made this.”</strong>
				</div>
			</div>
		</section>
		<div class="belief-strip">
			<div class="wrap">
				<span>LESS OVERWHELM</span><span class="strip-star">✳</span><span
					>MORE REAL-WORLD PRACTICE</span
				><span class="strip-star">✳</span><span>YOUR PEOPLE, YOUR PACE</span><span
					class="strip-star">✳</span
				><span>PROOF OF WHAT YOU CAN DO</span>
			</div>
		</div>
		<section id="how-it-works" class="section wrap">
			<div class="section-heading">
				<div>
					<p class="eyebrow">SOUND FAMILIAR?</p>
					<h2>So many tabs open.<br />Still not sure <em>what’s next?</em></h2>
				</div>
				<p>
					Learning on your own shouldn’t mean<br />figuring out everything on your own.<br />We’re
					building a better way forward.
				</p>
			</div>
			<div class="pain-grid">
				<article>
					<span class="card-number">01 / FIND YOUR DIRECTION</span>
					<div class="feature-icon"><Layers /></div>
					<h3>Trade the rabbit hole<br />for a clear next step.</h3>
					<p>
						Follow a focused project path. Know what to practise, why it matters, and what you’re
						working towards.
					</p>
					<span class="card-bottom">A plan you can actually follow <ArrowUpRight size={15} /></span>
				</article>
				<article>
					<span class="card-number">02 / PUT IT INTO PRACTICE</span>
					<div class="feature-icon"><Code2 /></div>
					<h3>Make something.<br />Then make it yours.</h3>
					<p>
						Work through practical briefs and build a portfolio story that shows your decisions,
						your process, and your growth.
					</p>
					<span class="card-bottom">Work you can talk about <ArrowUpRight size={15} /></span>
				</article>
				<article>
					<span class="card-number">03 / GROW TOGETHER</span>
					<div class="feature-icon"><Users /></div>
					<h3>Get unstuck.<br />Keep your momentum.</h3>
					<p>
						Ask questions, share a work in progress, and learn from a small community. Feedback is
						part of the journey.
					</p>
					<span class="card-bottom">People in your corner <ArrowUpRight size={15} /></span>
				</article>
			</div>
			<p class="section-note">
				Courses, challenges, project publishing and community feedback are available free. Pro
				extras are coming soon.
			</p>
		</section>
		<section id="paths" class="paths-section">
			<div class="wrap section">
				<div class="section-heading">
					<div>
						<p class="eyebrow">PICK A STARTING POINT</p>
						<h2>Your curiosity.<br /><em>Meet a little structure.</em></h2>
					</div>
					<p>
						You don’t have to know the whole journey.<br />Start with something you want to make.
					</p>
				</div>
				<div class="path-tabs" role="group" aria-label="Preview a learning path">
					{#each tracks as item (item)}<button
							class:active={track === item}
							aria-pressed={track === item}
							onclick={() => (track = item)}
							>{item}{#if track === item}<ArrowUpRight size={16} />{/if}</button
						>{/each}
				</div>
				<div class="path-preview">
					<div class="path-art" aria-hidden="true">
						<div class="art-browser">
							<div class="art-browser-bar">
								<span>● ● ●</span><span
									>{track === 'Web development'
										? 'THE CORNER CAFÉ'
										: track === 'Data & analytics'
											? 'A LITTLE CLARITY'
											: 'GOOD THINGS, SIMPLY'}</span
								>
							</div>
							<div class="art-browser-content">
								<span class="art-overline">A REAL-WORLD STARTING POINT</span><strong
									>{track === 'Web development'
										? `Good coffee.\nGreat company.`
										: track === 'Data & analytics'
											? `Numbers,\nmeet meaning.`
											: `Less friction.\nMore flow.`}</strong
								>
								<div class="art-shapes"><span></span><span></span><span></span></div>
								<span class="art-cta">Made by you ↗</span>
							</div>
						</div>
						<span class="art-sticker">MAKE IT<br /><em>happen.</em></span>
					</div>
					<div class="path-detail">
						<span class="tiny-tag">FREE PRACTICE · AVAILABLE NOW</span>
						<h3>{projects[track].title}</h3>
						<p>{projects[track].description}</p>
						<span class="tools">{projects[track].tools}</span>
						<ol>
							{#each projects[track].tasks as task, i (task)}<li>
									<span>0{i + 1}</span>{task}
								</li>{/each}
						</ol>
						<a class="text-link" href="/portal"
							>This sounds like my kind of learning <ArrowUpRight size={17} /></a
						>
					</div>
				</div>
			</div>
		</section>
		<section class="manifesto wrap">
			<span class="giant-star">✳</span>
			<div>
				<p class="eyebrow">BUILT WITH SOUTH AFRICA IN MIND. OPEN TO YOUR AMBITION.</p>
				<h2>Big dreams.<br />Real-life schedules.<br /><em>Room for both.</em></h2>
			</div>
			<div class="manifesto-copy">
				<p>
					For the student finding their feet. The career switcher starting again. The self-taught
					builder ready to show their work.
				</p>
				<p>
					We’re designing for small pockets of time, text-first guidance, and progress that fits
					around life. No mandatory live sessions. No pretending everyone starts in the same place.
				</p>
				<a class="text-link" href="/portal">Help shape what comes next <ArrowUpRight size={17} /></a
				>
			</div>
		</section>
		<section id="plans" class="plans-section section wrap">
			<div class="section-heading">
				<div>
					<p class="eyebrow">START SMALL. GROW FROM THERE.</p>
					<h2>A little investment.<br /><em>A lot to build towards.</em></h2>
				</div>
				<p>
					The free app is open now.<br />Only Pro is coming soon. No checkout yet.
				</p>
			</div>
			<div class="plans-grid">
				<article class="plan-card">
					<span class="eyebrow">THE FIRST STEP</span>
					<h3>Explorer</h3>
					<div class="price">Free<span>forever</span></div>
					<p>Learn, build and share your progress.</p>
					<ul>
						<li><Check size={16} /> Free courses and project briefs</li>
						<li><Check size={16} /> Community feedback and challenges</li>
						<li><Check size={16} /> Publish your project showcase</li>
					</ul>
					<a class="button secondary" href="/portal"
						>Explore free features <ArrowUpRight size={17} /></a
					>
				</article>
				<article class="plan-card pro">
					<div class="plan-top">
						<span class="eyebrow">A LITTLE MORE MOMENTUM</span><span class="tiny-tag"
							>COMING SOON</span
						>
					</div>
					<h3>Builder Pro <Sparkles size={19} /></h3>
					<div class="price">R79<span>/ month · proposed</span></div>
					<p>More structure. More support. More making.</p>
					<ul>
						<li><Check size={16} /> Additional guided project paths</li>
						<li><Check size={16} /> Additional learning-circle tools</li>
						<li><Check size={16} /> AI guidance when you get stuck</li>
						<li><Check size={16} /> A richer project portfolio</li>
					</ul>
					<a class="button" href="/pro">Join the Pro waitlist <ArrowUpRight size={17} /></a>
					<p class="plan-fine">No payment now. Future subscriptions through Paystack.</p>
				</article>
			</div>
		</section>
		<section class="waitlist-section">
			<div class="wrap">
				<p class="eyebrow">YOUR NEXT CHAPTER STARTS NOW</p>
				<h2 style="margin:20px 0">Less watching.<br /><em>More making.</em></h2>
				<p style="margin-bottom:25px">
					Explore free courses, tackle a challenge, and share what you build.
				</p>
				<a class="button" href="/portal">Open the free app <ArrowUpRight size={18} /></a><a
					class="pro-secondary-link"
					href="/pro">Builder Pro · coming soon ↗</a
				>
			</div>
		</section>
		<section class="faq-section section wrap">
			<div>
				<p class="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</p>
				<h2>Good questions.<br /><em>Honest answers.</em></h2>
				<p>
					Something else on your mind?<br /><a href="mailto:lethabomaepa11@gmail.com"
						>Say hello <ArrowUpRight size={14} /></a
					>
				</p>
			</div>
			<div class="faq-list">
				{#each faqs as [question, answer] (question)}<details>
						<summary>{question}<span>+</span></summary>
						<p>{answer}</p>
					</details>{/each}
			</div>
		</section>
	</main>
	<footer class="site-footer wrap">
		<a class="brand" href="/" aria-label="CoLearnSpace home"
			><img src="/site/branding/colearn-logo.png" alt="CoLearnSpace" width="150" height="65" /></a
		>
		<p>A little progress. A world of possibility.</p>
		<div><a href="/privacy">Privacy</a><a href="/portal">Open the free app ↗</a></div>
		<span class="copyright"
			>© {new Date().getFullYear()} CoLearnSpace · A Mosaic Talent project</span
		>
	</footer>
</div>
