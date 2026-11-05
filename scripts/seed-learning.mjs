import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { neon } from '@neondatabase/serverless';
const env = parseEnv(readFileSync('.env', 'utf8'));
const sql = neon(env.DATABASE_URL);
const items = [
	{
		slug: 'web-foundations',
		kind: 'courses',
		title: 'Your first useful web page',
		description:
			'Turn a small business brief into a clear, accessible page with HTML and CSS. Three practical lessons to get you building.',
		track: 'Web development',
		body: `Start with a problem, not a framework. A neighbourhood café needs a page that tells visitors what it offers, where it is, and how to get in touch. Your goal is to make that information easy to find on a phone.

You need a text editor and a browser. Create a folder with index.html and styles.css. No paid tools, video, or account with another service is required.

By the end, you will have a page with a clear structure, a responsive layout, and a short explanation of the decisions you made. Take your time. You can read without an account; sign in to save completed lessons.`,
		lessons: [
			{
				title: 'Give your page a useful structure',
				body: `Start by listing the three questions your visitor has: What do you offer? Where are you? How do I contact you? These become the backbone of your page.

Create index.html with a doctype, html lang="en", head and body. In the head add a descriptive title and a viewport meta tag with width=device-width, initial-scale=1. Link styles.css.

Inside the body add a header with the café name and a short navigation list. Add one main element. Inside main, write a single h1 that describes the café, a short introduction, a menu section, and a contact section. Use h2 for section headings. Finish with a footer.

Use real links for navigation and buttons only for actions. A phone link can use tel: and an email link can use mailto:. Do not make text look clickable unless it is a link or button.

Practice: write the page using text only. Put the most useful information first. Read it aloud: would someone unfamiliar with the café understand what to do next?

Done when: there is one clear h1, each section has a useful heading, and the location and contact details are easy to find. Use fictional contact details for this exercise, labelled as examples.`
			},
			{
				title: 'Make it work on a small screen',
				body: `A layout should serve the content, not force it into a fixed box. Start with the narrowest screen you expect someone to use.

In styles.css set * { box-sizing: border-box; }. Give body a margin of 0, a readable system font, and line-height around 1.6. Give main a width of min(100% - 2rem, 64rem) and margin-inline: auto. Avoid fixed heights for text sections.

Lay out the menu in one column first. At a wider breakpoint, use display: grid and grid-template-columns: repeat(2, minmax(0, 1fr)). Give the grid a gap instead of adding margins to individual cards.

If you add an image, set max-width: 100% and height: auto. Write useful alt text for informative images and empty alt text for decoration. Use a visible focus outline on links and buttons.

Practice: open browser developer tools and test at 360px, 768px, and 1280px. Increase the browser zoom to 200%. Check that you can read the page without horizontal scrolling and that text does not overlap.

Done when: the menu reads in a sensible order at every width, links have visible focus, and content can grow without being clipped.`
			},
			{
				title: 'Test it, then tell the story',
				body: `A working page is only part of the project. Explaining the problem and your decisions makes the work useful to someone else.

First test the page using only a keyboard. Press Tab to move between links. Check that the focus indicator is visible and the order follows the content. Press Enter on each link. Check your phone and email links, even if they use fictional example details.

Ask someone to find the opening hours, location, and contact details without giving hints. Note where they hesitate. Change one thing based on what you learn and test it again.

Write a short project story with four parts: the problem, your approach, what you tested, and what you would improve next. Include screenshots and a live link or public repository if you have one. Do not include passwords, API keys, real customer details, or private feedback.

Practice: publish your project in the CoLearnSpace showcase. Ask for feedback on one specific thing, such as the mobile navigation or information order.

Done when: your links work, the page is readable on a phone, and your project story explains at least one decision and one lesson learned.`
			}
		]
	},
	{
		slug: 'data-first-insights',
		kind: 'courses',
		title: 'Find a useful story in a spreadsheet',
		description:
			'Clean a small dataset, ask a focused question, and turn the answer into a decision someone can use.',
		track: 'Data & analytics',
		body: `You do not need a huge dataset to practise good analysis. Use this fictional shop data in a spreadsheet:

Date,Product,Units,UnitPrice
2026-10-01,Tea,12,15
2026-10-01,Coffee,20,25
2026-10-02,Tea,9,15
2026-10-02,Coffee,24,25
2026-10-03,Tea,14,15
2026-10-03,Coffee,18,25

This is a learning dataset, not evidence about a real business. Use Excel, LibreOffice Calc, or a spreadsheet tool you already have.`,
		lessons: [
			{
				title: 'Check the data before trusting it',
				body: `Copy the sample into a spreadsheet, separating columns at commas. Keep a Raw sheet unchanged and make a Working copy. This gives you a simple way to compare your changes.

Check that each row represents a product sold on one day. Confirm the column types: Date should be a date, Product text, Units a whole number, and UnitPrice a number. Do not treat missing values as zero without a reason.

Trim extra spaces in product names. Look for inconsistent spellings, duplicate rows and negative quantities. Record what you checked and what you changed in a Notes sheet. With this small sample, no changes should be necessary.

Practice: deliberately add a duplicate row to the working copy, then explain how you detected and removed it. Restore the six original rows before continuing.

Done when: your working copy has six rows, clear headers, sensible types, and a short cleaning log. The raw copy must remain unchanged.`
			},
			{
				title: 'Ask one question and calculate carefully',
				body: `Ask: which product generated more revenue in this sample, and by how much? Revenue is units multiplied by unit price; it is not profit.

Add a Revenue column. If Units is column C and UnitPrice is D, enter =C2*D2 in E2 and copy it down. The six row totals should be 180, 500, 135, 600, 210, and 450. The grand total is 2,075.

Use SUMIF or a pivot table to group revenue by Product. Tea totals 525 and Coffee totals 1,550. Check these by adding the row totals manually. Coffee generated 1,025 more revenue than Tea in the three-day sample.

Now ask what you cannot conclude. You do not know costs, stock shortages, customer counts, or whether these three days are typical. Higher revenue does not prove a higher profit margin.

Practice: calculate total units for each product and explain why the revenue comparison differs from the units comparison.

Done when: your formulas reconcile to the grand total and your answer separates observation from speculation.`
			},
			{
				title: 'Make the result easy to act on',
				body: `Create a simple bar chart of revenue by product. Label the axis clearly, start the numerical axis at zero, and give the chart a title that says what it measures. Avoid 3D effects and decorative clutter.

Write a three-sentence finding: Coffee contributed 1,550 of 2,075 total revenue in this fictional three-day sample. That is higher than Tea, but costs and demand outside the sample are unknown. A useful next step would be to collect more days of sales and product costs before changing purchasing decisions.

This is better than saying Coffee is the best product, because the data does not justify that broad conclusion.

Practice: publish your chart and a short project story. Include the question, cleaning checks, calculation method, result, limitations, and next step. Clearly label the data as fictional practice data.

Done when: another person can reproduce your totals and understand both the finding and its limits.`
			}
		]
	},
	{
		slug: 'design-a-booking-flow',
		kind: 'courses',
		title: 'Design a booking flow that makes sense',
		description:
			'Map a customer task, sketch a simple mobile journey, and test the idea before polishing the pixels.',
		track: 'UI/UX design',
		body: `A local barber wants clients to book a haircut without a long message exchange. Your job is to design the booking journey, not an entire business platform.

You can use paper, slides, or a design tool you already know. No paid software is required. Work with fictional names and appointment details.`,
		lessons: [
			{
				title: 'Define the task and the constraints',
				body: `Write the user goal in one sentence: I want to choose a service and a suitable time, know what it costs, and confirm my booking.

List the information needed for that task: available services, duration, price, available times, contact details, and the confirmation. Keep optional information separate from information needed to complete the booking.

Map a short flow: choose service, choose time, enter contact details, review, confirm. Consider an alternative for fully booked days. What happens when the customer makes a mistake or wants to go back?

Practice: write down three assumptions you are making. For example, you may assume clients prefer mobile bookings, that prices are fixed, or that appointments can be cancelled. These are assumptions to test, not research findings.

Done when: you can explain the user goal, the minimum information required, and at least one failure case.`
			},
			{
				title: 'Sketch a clear, accessible journey',
				body: `Draw one mobile screen for each step. Use plain labels such as Choose a service, Available times, and Confirm booking. The button label should describe the action.

Show price and duration before someone selects a service. For available times, use readable text and an obvious selected state. Do not rely only on colour. Use visible labels above inputs instead of using placeholders as the only instruction.

Add a review screen that lets the customer check the service, date, time and price before confirming. Include an easy way to change an earlier choice.

Design the empty state too: if there are no times, show the next available date or another useful action. For an invalid phone number, explain how to fix it without clearing everything else.

Practice: trace the happy path and one error path with your finger. Remove any step that collects information you do not need.

Done when: each screen has a clear next action, a way to go back, and useful feedback for errors.`
			},
			{
				title: 'Test the task and share what changed',
				body: `Ask a willing tester to book a fictional haircut for a particular day. Explain that you are testing the design, not them. Ask them to think aloud and avoid telling them which button to press.

Observe whether they find the price, understand the selected time, and know whether the booking is confirmed. Record task success and specific moments of confusion. A single test is useful feedback, not proof that every user will have the same experience.

Change one or two things based on what you observed. Test again if you can. Do not invent user quotes or present assumptions as research.

Practice: write a case study with the problem, constraints, initial flow, test task, observations, changes, and remaining questions. Use fictional data in screenshots and ask permission before sharing anything about a tester.

Done when: your case study explains a change with evidence and acknowledges what you still need to learn.`
			}
		]
	},
	{
		slug: 'corner-cafe-challenge',
		kind: 'challenges',
		title: 'Build a home for the corner café',
		description:
			'Create a responsive café website that helps someone find the menu, opening hours, and contact details in seconds.',
		track: 'Web development',
		body: `The brief
A fictional neighbourhood café needs a simple website that works well on a phone. Build one page with a clear introduction, a short menu, opening hours, an address, and a contact action.

Requirements
Use semantic HTML, readable contrast, visible keyboard focus, and a layout that does not scroll horizontally at 360px. Make every navigation link work. Use fictional example details and images you have permission to use. A contact action may use a clearly labelled example mailto link; do not pretend a form sends messages if it does not.

What to submit
Share a public demo or repository link. Explain who the page serves, two design decisions, how you tested mobile and keyboard access, and what you would improve next.

Stretch idea
Add a filterable menu or theme toggle, ensuring the core information still works without JavaScript.

No deadline, prizes or ranking promise. Build at your own pace.`,
		lessons: []
	},
	{
		slug: 'sales-story-challenge',
		kind: 'challenges',
		title: 'Turn a small dataset into a useful decision',
		description:
			'Use the fictional shop sample from our data course to build a clear chart and explain what the numbers do and do not tell you.',
		track: 'Data & analytics',
		body: `The brief
A shop owner wants to understand product revenue in a small fictional sample. Use the sample data from Find a useful story in a spreadsheet, or choose a public dataset you have permission to share.

Requirements
Keep a raw data copy. Document cleaning checks. Calculate and reconcile totals. Create one readable chart and write a finding that separates revenue from profit. Explicitly state the sample size, time period, and limitations.

What to submit
Share a public spreadsheet, report, or repository. Include the question you asked, your method, a chart, your finding, and one sensible next step. Clearly label fictional data and do not upload personal customer information.

Stretch idea
Repeat the analysis in SQL and compare the result to your spreadsheet.

Feedback focus
Can someone reproduce your totals? Is the proposed decision supported by the data?`,
		lessons: []
	},
	{
		slug: 'booking-flow-challenge',
		kind: 'challenges',
		title: 'Make a neighbourhood booking feel effortless',
		description:
			'Design and test a mobile booking flow for a fictional barber, salon, or other local service.',
		track: 'UI/UX design',
		body: `The brief
Create a short mobile journey from choosing a service to receiving a clear booking confirmation. Use a fictional business and example customer details.

Requirements
Show service prices and duration before selection. Make availability easy to scan. Include a review step, a way to go back, an empty availability state, and a useful input error. Keep labels visible and do not rely on colour alone.

What to submit
Share a public prototype, PDF, or case study link. Explain the user goal, your assumptions, what you tested, what changed, and what remains uncertain. Do not invent research participants, quotes, or success metrics.

Stretch idea
Test your prototype with a willing person using one realistic task. Ask permission before sharing any feedback, and remove identifying details.

Feedback focus
Does each step make the next action clear? Can someone recover from an error without starting again?`,
		lessons: []
	}
];
for (const item of items)
	await sql`INSERT INTO colearn.content(slug,kind,title,description,body,track,lessons) VALUES (${item.slug},${item.kind},${item.title},${item.description},${item.body},${item.track},${JSON.stringify(item.lessons)}::jsonb) ON CONFLICT(slug) DO NOTHING`;
console.log(
	'Three original free courses and three challenge briefs are ready. No invented community projects added.'
);
