import type { Dict } from './fr';

export const en: Dict = {
	meta: {
		home: {
			title: 'TypeToDeploy — update your website by sending a message',
			description:
				"TypeToDeploy lets a non-technical person edit a professional website's content from a Telegram conversation, with automatic verification before publishing.",
		},
		demo: {
			title: 'Demo — TypeToDeploy',
			description:
				'See TypeToDeploy in action: a message sent, the change automatically verified, then the website updated. Video, screenshots and a real commit as proof.',
		},
	},
	skipLink: 'Skip to content',
	nav: {
		demo: 'Demo',
	},
	footer: {
		liveSite: 'Agent-driven site',
	},
	home: {
		hero: {
			eyebrow: 'Work in progress — a working prototype in production',
			h1: 'Update your website by sending a message.',
			lead: 'TypeToDeploy lets a non-technical person edit the content of a professional website from a Telegram conversation. Each change is automatically checked, committed to the source code, and published.',
			ctaPrimary: 'Watch the demo',
			ctaSecondary: 'See the agent-driven site',
			evidence: [
				{ title: 'One user', text: 'non-technical, on her own professional site' },
				{ title: 'One production site', text: 'live, edited by the agent' },
				{ title: 'Every change', text: 'produces a verifiable commit on GitHub' },
			],
		},
		problem: {
			h2: 'The problem',
			paragraphs: [
				'A modern website is fast, well-indexed and cheap to host because it is built as code rather than in an editing tool.',
				'The trade-off is direct: its owner cannot change it. Updating a price, a date or a photo means going back to a developer.',
				'In practice these sites stop being updated, the information becomes wrong, and the site stops doing its job.',
			],
			origin: {
				h3: 'This project came from a problem we had',
				paragraphs: [
					'Lisa is a coach and trainer. Her site presents her work, her services and her prices. She could not change it herself: every update went through Taras.',
					'We built the missing tool. Lisa is now the first user of TypeToDeploy, on a site that is really live.',
				],
			},
		},
		solution: {
			h2: 'The solution',
			lead: 'No interface to learn, no account to create, no dashboard. The tool sits in a channel the person already uses.',
			steps: [
				{ title: 'You write', text: 'A message in plain words: “change the group class price to €45”.' },
				{ title: 'The agent prepares the change', text: 'The model finds the field concerned in the site content and prepares the exact change to apply.' },
				{ title: 'The change is verified', text: 'An automatic check compares the declared scope with the change actually produced. Anything outside that scope is refused before it is written.' },
				{ title: 'The site is updated', text: 'The change is committed to the code repository, the site is rebuilt and published. A confirmation comes back in the conversation.' },
			],
		},
		demoPreview: {
			h2: 'See the system work',
			lead: 'A full demo: a message sent, the change verified, the site updated.',
			posterAlt: 'The Telegram conversation on the left, the taras-and-lisa.com site on the right, during a change.',
			cta: 'Watch the full demo',
		},
		status: {
			h2: 'What is built today',
			lead: 'Each item below carries its real state. Nothing is shown as finished if it is not.',
			caption: 'The real state of each part of the system.',
			colItem: 'Item',
			colState: 'State',
			rows: [
				{ label: 'Receiving and interpreting plain-language messages', status: 'fonctionnel', statusLabel: 'Working' },
				{ label: 'Editing site content (structured fields)', status: 'fonctionnel', statusLabel: 'Working' },
				{ label: 'Automatic scope check on every change', status: 'fonctionnel', statusLabel: 'Working' },
				{ label: 'Commit to the code repository and automatic deployment', status: 'fonctionnel', statusLabel: 'Working' },
				{ label: 'Confirmation message and undo of a change', status: 'fonctionnel', statusLabel: 'Working' },
				{ label: 'Full traceability of model calls', status: 'fonctionnel', statusLabel: 'Working' },
				{ label: 'Use by a non-technical person on a production site', status: 'teste', statusLabel: 'Tested' },
				{ label: 'Use by several people outside the project', status: 'a-valider', statusLabel: 'To validate' },
				{ label: 'Editing site structure and layout', status: 'phase-2', statusLabel: 'Phase 2' },
				{ label: 'Business model', status: 'a-valider', statusLabel: 'To validate' },
			],
		},
		technical: {
			h2: 'The core technical point: stopping the agent from changing what it was not asked to change',
			paragraphs: [
				'A language model writing directly into the source code of a live site is a real risk.',
				'In the first trials, instructions in the prompt were not enough: the model changed fields outside the request, and justified the decision in its reply.',
				'The answer is not a better instruction but a deterministic check. Before anything is written, the system compares the fields actually changed with the scope the agent declared. If they do not match, the change is refused and nothing is written.',
				'That check is what makes the tool usable on a real site rather than in a demo.',
			],
			exampleLabel: 'Example of a change refused by the check',
			scopeLine: 'declared scope: tarif_cours_collectif',
			changedLine: 'changed fields: tarif_cours_collectif, horaires_studio',
			refusedLabel: 'refused',
		},
		hypotheses: {
			h2: 'What still needs to be validated',
			lead: 'The prototype works. The demand does not yet. These are the hypotheses we want to test, and how.',
			caption: 'Open hypotheses, how each is checked, and what counts as success.',
			colHypothesis: 'Hypothesis',
			colMethod: 'Method',
			colCriterion: 'Success criterion',
			rows: [
				{
					hypothesis: 'A non-technical person does update their site more often once the barrier is gone.',
					method: 'Tracking update frequency over 8 weeks with a first group of pilot users.',
					criterion: 'A clear, measurable increase on the previous period.',
				},
				{
					hypothesis: 'The first customer is the site owner: freelancer, small organisation or association.',
					method: 'Qualitative interviews with owners of professional sites.',
					criterion: 'A majority say they regularly give up on an update because of the effort involved.',
				},
				{
					hypothesis: 'Or the first customer is the agency or freelance developer maintaining those sites.',
					method: 'Qualitative interviews with web agencies and freelance developers.',
					criterion: 'A majority name small client changes as a frequent, barely profitable load.',
				},
				{
					hypothesis: 'The scope check is enough to allow use without technical supervision.',
					method: 'Adversarial testing: ambiguous, contradictory or out-of-scope requests.',
					criterion: 'No out-of-scope change written.',
				},
				{
					hypothesis: 'There is an acceptable price for this service.',
					method: 'Price testing with the people interviewed.',
					criterion: 'To be set after the interviews.',
				},
			],
			note: 'The two segment hypotheses are shown together on purpose. We do not know which one is right, and the interviews are there to decide.',
		},
		phase2: {
			h2: 'Phase 2 — from content editing to site editing',
			lead: 'Today the agent edits structured content. The next step is letting it edit the site itself.',
			steps: [
				{ label: 'Step 1', text: 'Extend the scope check to the source code, not only content fields.' },
				{ label: 'Step 2', text: 'Allow adding and changing sections, pages and layout, with a preview before publishing.' },
				{ label: 'Step 3', text: 'Allow connecting the tool to an existing site that was not built for it.' },
			],
			closing: 'Each step depends on the one before. Reliability comes before scope.',
		},
		impact: {
			h2: 'Who this is for',
			paragraphs: [
				'Freelancers, small organisations and associations that have a site and cannot pay a developer for a ten-minute change.',
				'And upstream, the agencies and freelance developers who maintain those sites: small client requests are frequent, hard to schedule and barely profitable.',
				'The aim is not to replace a content management system, but to make a site editable that today is not.',
			],
		},
		team: {
			h2: 'The team',
			lead: 'Two people, two distinct roles, and a project born from our own need.',
			members: [
				{
					role: 'Project lead',
					name: 'Lisa',
					linkedin: 'https://www.linkedin.com/in/yelyzaveta-machukha/',
					paragraphs: [
						'Coach and trainer. She designs and runs programmes in communication, group facilitation and outdoor practice.',
						'Her professional site is where the project started, and she uses the tool daily. She owns the user relationship, the validation interviews and business development.',
					],
				},
				{
					role: 'Technical co-founder',
					name: 'Taras',
					linkedin: 'https://www.linkedin.com/in/taras-svystun-97347723b/',
					paragraphs: [
						'Four years in software development and machine learning.',
						'He designed and built the whole system: the agent, the scope check, the repository integration and the deployment.',
					],
				},
			],
			closing: 'The tool’s user and its builder are on the same team. Every limit found in use goes straight back into development.',
		},
		support: {
			h2: 'What the Pépite programme would bring',
			lead: 'The prototype is built and works. What we lack is not technical.',
			items: [
				'Access to test users — freelancers, small organisations, associations — to check our hypotheses in real conditions rather than in-house.',
				'An outside view to decide between our two segment hypotheses and to build a business model. That is our main area of uncertainty today.',
				'A working frame and a regular review rhythm, alongside our own activities.',
				'Funding for hosting, model calls and the time spent on the pilot phase.',
			],
		},
		contact: {
			h2: 'Contact',
			email: 'Email',
			liveSite: 'Agent-driven site',
			productRepo: 'Product repository',
			siteRepo: 'This site’s repository',
			linkedin: 'LinkedIn',
		},
	},
	demo: {
		topBackLink: '← Back to home',
		h1: 'Demo',
		lead: 'A message sent in a conversation, the change verified, the site updated — recorded from start to finish.',
		video: {
			caption:
				'Real recording, unedited result: the conversation on the left, the site on the right. The video is sped up; in real conditions the update goes live in about a minute.',
		},
		verification: {
			label: 'Verification',
			heading: 'This change produced a real commit in the site’s repository.',
			commitCta: 'View the commit on GitHub',
			siteCta: 'View the live site',
			commitLine1: 'commit 5fec45d',
			commitLine2: 'taras-svystun/taras-and-lisa',
		},
		steps: {
			h2: 'Step by step',
			lead: 'A second run of the same journey, in screenshots. It reads without sound and without the video.',
			labels: {
				command: 'Command',
				request: 'Request',
				botReply: 'Bot reply',
				agentAction: 'Agent action',
				screen: 'Screen',
				whyHere: 'Why it is here',
				toObserve: 'What to look at',
				trace: 'Trace',
			},
			rows: [
				{
					num: '01',
					title: 'The conversation opens',
					image: 'bot1',
					alt: 'Telegram conversation: the /start command and the bot reply listing its commands.',
					fields: [
						{ label: 'command', value: '/start', mono: true },
						{
							label: 'botReply',
							value: 'TypeToDeploy reports that it is online and lists its commands: /status for service health, /reset to clear the conversation memory, /undo to revert the last change.',
						},
					],
				},
				{
					num: '02',
					title: 'The service answers',
					image: 'bot2',
					alt: 'Telegram conversation: the /status command and the “Bot is alive” reply with its timestamp.',
					fields: [
						{ label: 'command', value: '/status', mono: true },
						{ label: 'botReply', value: 'The bot confirms it is running and gives the time of the check.' },
						{
							label: 'whyHere',
							value: 'The person checks the service herself, without asking anyone.',
							muted: true,
						},
					],
				},
				{
					num: '03',
					title: 'The site before the request',
					image: 'siteBefore',
					alt: 'Home page of taras-and-lisa.com with no emoji in the headline or paragraph.',
					fields: [
						{ label: 'screen', value: 'The live home page of taras-and-lisa.com.' },
						{
							label: 'toObserve',
							value: 'The headline and the intro paragraph contain no emoji.',
							muted: true,
						},
					],
				},
				{
					num: '04',
					title: 'The request is written, then applied',
					image: 'bot3',
					alt: 'Telegram conversation: the request to add emojis, the changed fields, the commit link and the deployment confirmation.',
					fields: [
						{ label: 'request', value: 'Add emojis to the home page text to make it funnier', mono: true },
						{
							label: 'agentAction',
							value:
								'The agent changes three home-page fields — heroEyebrow, heroHeadline, heroSubhead — writes a commit, then reports the deployment once the site is rebuilt.',
						},
						{ label: 'trace', value: 'commit 5fec45d · taras-svystun/taras-and-lisa', muted: true },
					],
				},
				{
					num: '05',
					title: 'The site after deployment',
					image: 'siteAfter',
					alt: 'Home page of taras-and-lisa.com with emojis in the headline and paragraph.',
					fields: [
						{ label: 'screen', value: 'The same page, reloaded after publishing.' },
						{
							label: 'toObserve',
							value:
								'The emojis are in the headline and the intro paragraph. What was typed in the conversation is visible on the public site.',
							muted: true,
						},
					],
				},
				{
					num: '06',
					title: 'The change is undone',
					image: 'bot4',
					alt: 'Telegram conversation: the /undo command, the revert commit and the deployment confirmation.',
					fields: [
						{ label: 'command', value: '/undo', mono: true },
						{
							label: 'agentAction',
							value:
								'The bot finds its last change, reverts site/src/data/site.json, writes the revert commit and confirms the deployment.',
						},
						{ label: 'trace', value: 'commit 6d81bdd · taras-svystun/taras-and-lisa', muted: true },
					],
				},
				{
					num: '07',
					title: 'The site returns to its previous state',
					image: 'siteBefore',
					alt: 'Home page of taras-and-lisa.com without emojis again after the undo.',
					fields: [
						{ label: 'screen', value: 'The home page after the undo.' },
						{ label: 'toObserve', value: 'The emojis are gone. The content matches step 03.', muted: true },
					],
				},
			],
		},
		limits: {
			h2: 'Current limits of this demo',
			lead: 'What the system cannot do yet, as of this recording.',
			items: [
				'The agent edits structured content. It does not change site structure or layout.',
				'The tool works on a site built for it. Connecting an existing site is not possible yet.',
				'One person uses the tool today, on one production site.',
			],
		},
		back: {
			text: 'The rest of the project — what is built, what still needs validating — is on the home page.',
			cta: 'Back to home',
		},
	},
};
