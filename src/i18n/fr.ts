export const fr = {
	meta: {
		home: {
			title: 'TypeToDeploy — mettre à jour son site web en envoyant un message',
			description:
				"TypeToDeploy permet de modifier le contenu d'un site professionnel depuis une conversation Telegram, sans compétence technique, avec vérification automatique.",
		},
		demo: {
			title: 'Démonstration — TypeToDeploy',
			description:
				"Démonstration de TypeToDeploy : un message envoyé, la modification vérifiée, puis le site mis à jour. Vidéo, captures d'écran et commit réel à l'appui.",
		},
	},
	skipLink: 'Aller au contenu principal',
	nav: {
		demo: 'Démonstration',
	},
	footer: {
		liveSite: 'Site piloté par l’agent',
	},
	home: {
		hero: {
			eyebrow: 'Projet en développement — prototype fonctionnel en production',
			h1: 'Mettre à jour son site web en envoyant un message.',
			lead: 'TypeToDeploy permet à une personne sans compétence technique de modifier le contenu d’un site web professionnel depuis une simple conversation Telegram. La modification est vérifiée automatiquement, enregistrée dans le code source, puis mise en ligne.',
			ctaPrimary: 'Voir la démonstration',
			ctaSecondary: 'Voir le site piloté par l’agent',
			evidence: [
				{ title: 'Une utilisatrice', text: 'non technique, sur son propre site professionnel' },
				{ title: 'Un site en production', text: 'en ligne, modifié par l’agent' },
				{ title: 'Chaque modification', text: 'produit un commit vérifiable sur GitHub' },
			],
		},
		problem: {
			h2: 'Le problème',
			paragraphs: [
				'Un site web moderne est rapide, bien référencé et peu coûteux à héberger, parce qu’il est construit comme du code plutôt que dans un outil d’édition.',
				'La contrepartie est directe : son propriétaire ne peut pas le modifier lui-même. Changer un tarif, une date, un horaire ou une photo suppose de repasser par un développeur.',
				'Dans les faits, ces sites ne sont plus mis à jour. L’information devient fausse, et le site cesse de remplir sa fonction.',
			],
			origin: {
				h3: 'Ce projet vient d’un problème que nous avions',
				paragraphs: [
					'Lisa est coach et formatrice. Son site présente son activité, ses prestations et ses tarifs. Elle ne pouvait pas le modifier elle-même : chaque changement passait par Taras.',
					'Nous avons construit l’outil qui manquait. Lisa est aujourd’hui la première utilisatrice de TypeToDeploy, sur un site réellement en ligne.',
				],
			},
		},
		solution: {
			h2: 'La solution',
			lead: 'Aucune interface à apprendre, aucun compte à créer, aucun tableau de bord. L’outil se place dans un canal que la personne utilise déjà.',
			steps: [
				{ title: 'Vous écrivez', text: 'Un message en langage courant : « change le tarif du cours collectif à 45 € ».' },
				{ title: 'L’agent prépare la modification', text: 'Le modèle identifie le champ concerné dans le contenu du site et prépare la modification exacte à appliquer.' },
				{ title: 'La modification est vérifiée', text: 'Un contrôle automatique compare le périmètre annoncé et la modification réellement produite. Toute modification hors périmètre est refusée avant tout enregistrement.' },
				{ title: 'Le site est mis à jour', text: 'La modification est enregistrée dans le dépôt de code, le site est reconstruit et publié. Une confirmation est renvoyée dans la conversation.' },
			],
		},
		demoPreview: {
			h2: 'Voir le système fonctionner',
			lead: 'Une démonstration complète : un message envoyé, la modification vérifiée, le site mis à jour.',
			posterAlt: 'La conversation Telegram à gauche, le site taras-and-lisa.com à droite, pendant une modification.',
			cta: 'Voir la démonstration complète',
		},
		status: {
			h2: 'Ce qui est construit aujourd’hui',
			lead: 'Chaque élément ci-dessous est indiqué avec son état réel. Rien n’est présenté comme terminé s’il ne l’est pas.',
			caption: 'État réel de chaque composant du système. Aucun élément n’est présenté comme terminé s’il ne l’est pas.',
			colItem: 'Élément',
			colState: 'État',
			rows: [
				{ label: 'Réception et interprétation des messages en langage naturel', status: 'fonctionnel', statusLabel: 'Fonctionnel' },
				{ label: 'Modification du contenu du site (champs structurés)', status: 'fonctionnel', statusLabel: 'Fonctionnel' },
				{ label: 'Contrôle automatique du périmètre de modification', status: 'fonctionnel', statusLabel: 'Fonctionnel' },
				{ label: 'Enregistrement dans le dépôt de code et mise en ligne automatique', status: 'fonctionnel', statusLabel: 'Fonctionnel' },
				{ label: 'Notification de confirmation et annulation d’une modification', status: 'fonctionnel', statusLabel: 'Fonctionnel' },
				{ label: 'Traçabilité complète des appels au modèle', status: 'fonctionnel', statusLabel: 'Fonctionnel' },
				{ label: 'Utilisation par une personne non technique sur un site en production', status: 'teste', statusLabel: 'Testé' },
				{ label: 'Utilisation par plusieurs personnes hors du projet', status: 'a-valider', statusLabel: 'À valider' },
				{ label: 'Modification de la structure et de la mise en page du site', status: 'phase-2', statusLabel: 'Phase 2' },
				{ label: 'Modèle économique', status: 'a-valider', statusLabel: 'À valider' },
			],
		},
		technical: {
			h2: 'Le point technique central : empêcher l’agent de modifier ce qu’on ne lui a pas demandé',
			paragraphs: [
				'Un modèle de langage qui écrit directement dans le code source d’un site en production représente un risque concret.',
				'Lors des premiers essais, les consignes écrites dans le prompt n’ont pas suffi : le modèle a modifié des champs situés en dehors de la demande, tout en justifiant sa décision dans sa réponse.',
				'La réponse à ce problème n’est pas une meilleure consigne, mais un contrôle déterministe. Avant tout enregistrement, le système compare la liste des champs réellement modifiés et le périmètre déclaré par l’agent. Si les deux ne correspondent pas, la modification est refusée et rien n’est écrit.',
				'C’est ce contrôle qui rend l’outil utilisable sur un site réel plutôt que sur une démonstration.',
			],
			exampleLabel: 'Exemple d’une modification refusée par le contrôle',
			scopeLine: 'périmètre déclaré : tarif_cours_collectif',
			changedLine: 'champs modifiés  : tarif_cours_collectif, horaires_studio',
			refusedLabel: 'refusé',
		},
		hypotheses: {
			h2: 'Ce qui reste à valider',
			lead: 'Le prototype fonctionne. La demande, elle, n’est pas encore démontrée. Voici les hypothèses que nous cherchons à vérifier et la méthode prévue.',
			caption: 'Hypothèses ouvertes, méthode de vérification et critère de réussite.',
			colHypothesis: 'Hypothèse',
			colMethod: 'Méthode prévue',
			colCriterion: 'Critère de réussite',
			rows: [
				{
					hypothesis: 'Une personne non technique met effectivement son site à jour plus souvent lorsque la barrière disparaît.',
					method: 'Suivi de la fréquence de mise à jour sur 8 semaines, auprès d’un premier groupe d’utilisateurs pilotes.',
					criterion: 'Une augmentation nette et mesurable par rapport à la période précédente.',
				},
				{
					hypothesis: 'Le premier client est le propriétaire du site : indépendant, petite structure ou association.',
					method: 'Entretiens qualitatifs auprès de propriétaires de sites professionnels.',
					criterion: 'Une majorité déclare renoncer régulièrement à une mise à jour à cause de la démarche à engager.',
				},
				{
					hypothesis: 'Ou bien le premier client est l’agence ou le développeur indépendant qui maintient ces sites.',
					method: 'Entretiens qualitatifs auprès d’agences web et de développeurs indépendants.',
					criterion: 'Une majorité identifie les petites modifications client comme une charge fréquente et peu rentable.',
				},
				{
					hypothesis: 'Le contrôle de périmètre est suffisant pour permettre une utilisation sans supervision technique.',
					method: 'Campagne de tests adverses : demandes ambiguës, contradictoires ou hors périmètre.',
					criterion: 'Aucune modification hors périmètre enregistrée.',
				},
				{
					hypothesis: 'Il existe un prix acceptable pour ce service.',
					method: 'Test de prix auprès des personnes interrogées.',
					criterion: 'À définir à l’issue des entretiens.',
				},
			],
			note: 'Les deux hypothèses de segment sont présentées ensemble volontairement. Nous ne savons pas encore laquelle est la bonne, et les entretiens servent précisément à trancher.',
		},
		phase2: {
			h2: 'Phase 2 — de l’édition de contenu à l’édition du site',
			lead: 'Aujourd’hui l’agent modifie du contenu structuré. L’étape suivante consiste à lui permettre de modifier le site lui-même.',
			steps: [
				{ label: 'Étape 1', text: 'Étendre le contrôle de périmètre au code source, et non plus seulement aux champs de contenu.' },
				{ label: 'Étape 2', text: 'Permettre l’ajout et la modification de sections, de pages et de mise en page, avec prévisualisation avant publication.' },
				{ label: 'Étape 3', text: 'Permettre le raccordement de l’outil à un site existant qui n’a pas été conçu pour lui.' },
			],
			closing: 'Chaque étape dépend de la précédente. La priorité reste la fiabilité avant l’étendue des fonctions.',
		},
		impact: {
			h2: 'À qui cela s’adresse',
			paragraphs: [
				'Les indépendants, les petites structures et les associations qui disposent d’un site et qui n’ont pas les moyens de mobiliser un développeur pour une modification de dix minutes.',
				'Et, en amont, les agences et développeurs indépendants qui maintiennent ces sites : les petites demandes de leurs clients sont fréquentes, peu rentables et difficiles à planifier.',
				'L’objectif n’est pas de remplacer un outil de gestion de contenu, mais de rendre modifiable un site qui, aujourd’hui, ne l’est pas.',
			],
		},
		team: {
			h2: 'L’équipe',
			lead: 'Deux personnes, deux rôles distincts, et un projet né d’un besoin que nous avions nous-mêmes.',
			members: [
				{
					role: 'Porteuse du projet',
					name: 'Lisa',
					linkedin: 'https://www.linkedin.com/in/yelyzaveta-machukha/',
					paragraphs: [
						'Coach et formatrice. Elle conçoit et anime des accompagnements en communication, en encadrement de groupes et en pratiques de plein air.',
						'C’est son site professionnel qui est à l’origine du projet, et c’est elle qui utilise l’outil au quotidien. Elle porte la relation utilisateur, les entretiens de validation et le développement de l’activité.',
					],
				},
				{
					role: 'Associé technique',
					name: 'Taras',
					linkedin: 'https://www.linkedin.com/in/taras-svystun-97347723b/',
					paragraphs: [
						'Quatre ans d’expérience en développement logiciel et en apprentissage automatique.',
						'Il a conçu et développé l’ensemble du système : l’agent, le contrôle de périmètre, l’intégration au dépôt de code et la mise en production.',
					],
				},
			],
			closing: 'L’utilisatrice de l’outil et sa conceptrice sont dans la même équipe. Chaque limite rencontrée à l’usage revient directement dans le développement.',
		},
		support: {
			h2: 'Ce que l’accompagnement de Pépite apporterait',
			lead: 'Le prototype est construit et fonctionne. Ce qui nous manque n’est pas technique.',
			items: [
				'Un accès à des utilisateurs test — indépendants, petites structures, associations — pour vérifier nos hypothèses dans des conditions réelles plutôt qu’en interne.',
				'Un regard extérieur pour trancher entre nos deux hypothèses de segment, et pour construire un modèle économique. C’est aujourd’hui notre principale zone d’incertitude.',
				'Un cadre de travail et un rythme de suivi régulier, en parallèle de nos activités.',
				'Un financement couvrant l’hébergement, les coûts d’appel au modèle et le temps consacré à la phase pilote.',
			],
		},
		contact: {
			h2: 'Contact',
			email: 'Courriel',
			liveSite: 'Site piloté par l’agent',
			productRepo: 'Dépôt du produit',
			siteRepo: 'Dépôt de ce site',
			linkedin: 'LinkedIn',
		},
	},
	demo: {
		topBackLink: '← Retour à l’accueil',
		h1: 'Démonstration',
		lead: 'Un message envoyé dans une conversation, la modification vérifiée, le site mis à jour — enregistré du début à la fin.',
		video: {
			caption:
				'Enregistrement réel, sans montage du résultat : la conversation à gauche, le site à droite. La vidéo est accélérée : en conditions réelles, la mise à jour est publiée en une minute environ.',
		},
		verification: {
			label: 'Vérification',
			heading: 'Cette modification a produit un commit réel dans le dépôt du site.',
			commitCta: 'Voir le commit sur GitHub',
			siteCta: 'Voir le site en ligne',
			commitLine1: 'commit 5fec45d',
			commitLine2: 'taras-svystun/taras-and-lisa',
		},
		steps: {
			h2: 'Étape par étape',
			lead: 'Une seconde exécution du même parcours, en captures d’écran. Elle se lit sans le son et sans la vidéo.',
			labels: {
				command: 'Commande',
				request: 'Demande',
				botReply: 'Réponse du bot',
				agentAction: 'Action de l’agent',
				screen: 'Écran',
				whyHere: 'Pourquoi c’est là',
				toObserve: 'À observer',
				trace: 'Trace',
			},
			rows: [
				{
					num: '01',
					title: 'La conversation s’ouvre',
					image: 'bot1',
					alt: 'Conversation Telegram : la commande /start et la réponse du bot qui liste ses commandes.',
					fields: [
						{ label: 'command', value: '/start', mono: true },
						{
							label: 'botReply',
							value: 'TypeToDeploy indique qu’il est en ligne et liste ses commandes : /status pour l’état du service, /reset pour effacer la mémoire de la conversation, /undo pour annuler la dernière modification.',
						},
					],
				},
				{
					num: '02',
					title: 'Le service répond',
					image: 'bot2',
					alt: 'Conversation Telegram : la commande /status et la réponse « Bot is alive » avec l’horodatage.',
					fields: [
						{ label: 'command', value: '/status', mono: true },
						{ label: 'botReply', value: 'Le bot confirme qu’il tourne et donne l’heure du contrôle.' },
						{
							label: 'whyHere',
							value: 'La personne vérifie elle-même que le service fonctionne, sans demander à personne.',
							muted: true,
						},
					],
				},
				{
					num: '03',
					title: 'Le site avant la demande',
					image: 'siteBefore',
					alt: 'Page d’accueil de taras-and-lisa.com sans emoji dans le titre ni le paragraphe.',
					fields: [
						{ label: 'screen', value: 'La page d’accueil de taras-and-lisa.com, en ligne.' },
						{
							label: 'toObserve',
							value: 'Le titre et le paragraphe d’accueil ne contiennent aucun emoji.',
							muted: true,
						},
					],
				},
				{
					num: '04',
					title: 'La demande est écrite, puis appliquée',
					image: 'bot3',
					alt: 'Conversation Telegram : la demande d’ajout d’emojis, les champs modifiés, le lien du commit et la confirmation de déploiement.',
					fields: [
						{ label: 'request', value: 'Add emojis to the home page text to make it funnier', mono: true },
						{
							label: 'agentAction',
							value:
								'L’agent modifie trois champs de la page d’accueil — heroEyebrow, heroHeadline, heroSubhead — enregistre un commit, puis annonce le déploiement quand le site est reconstruit.',
						},
						{ label: 'trace', value: 'commit 5fec45d · taras-svystun/taras-and-lisa', muted: true },
					],
				},
				{
					num: '05',
					title: 'Le site après le déploiement',
					image: 'siteAfter',
					alt: 'Page d’accueil de taras-and-lisa.com avec des emojis dans le titre et le paragraphe.',
					fields: [
						{ label: 'screen', value: 'La même page, rechargée après la mise en ligne.' },
						{
							label: 'toObserve',
							value:
								'Les emojis sont présents dans le titre et dans le paragraphe d’accueil. La demande écrite dans la conversation est visible sur le site public.',
							muted: true,
						},
					],
				},
				{
					num: '06',
					title: 'La modification est annulée',
					image: 'bot4',
					alt: 'Conversation Telegram : la commande /undo, le commit d’annulation et la confirmation de déploiement.',
					fields: [
						{ label: 'command', value: '/undo', mono: true },
						{
							label: 'agentAction',
							value:
								'Le bot cherche sa dernière modification, revient sur le fichier site/src/data/site.json, enregistre le commit d’annulation et confirme le déploiement.',
						},
						{ label: 'trace', value: 'commit 6d81bdd · taras-svystun/taras-and-lisa', muted: true },
					],
				},
				{
					num: '07',
					title: 'Le site revient à son état précédent',
					image: 'siteBefore',
					alt: 'Page d’accueil de taras-and-lisa.com de nouveau sans emoji après l’annulation.',
					fields: [
						{ label: 'screen', value: 'La page d’accueil après l’annulation.' },
						{ label: 'toObserve', value: 'Les emojis ont disparu. Le contenu est celui de l’étape 03.', muted: true },
					],
				},
			],
		},
		limits: {
			h2: 'Limites actuelles de la démonstration',
			lead: 'Ce que le système ne sait pas encore faire, à la date de cet enregistrement.',
			items: [
				'L’agent modifie du contenu structuré. Il ne modifie pas la structure ni la mise en page du site.',
				'L’outil fonctionne sur un site conçu pour lui. Le raccordement à un site existant n’est pas encore possible.',
				'Une seule personne utilise l’outil aujourd’hui, sur un seul site en production.',
			],
		},
		back: {
			text: 'Le reste du projet — ce qui est construit, ce qui reste à valider — est décrit sur la page d’accueil.',
			cta: 'Retour à l’accueil',
		},
	},
};

export type Dict = typeof fr;
