// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://typetodeploy.taras-and-lisa.com',
	output: 'static',
	i18n: {
		defaultLocale: 'fr',
		locales: ['fr', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'fr',
				locales: {
					fr: 'fr',
					en: 'en',
				},
			},
			serialize(item) {
				// Match each URL to the canonical form Layout.astro emits (no trailing
				// slash on /demonstration or /en/demo) — the default i18n grouping only
				// pairs same-slug locale routes, so it misses this site's asymmetric
				// FR/EN demo slugs. Both are fixed here explicitly.
				const url = new URL(item.url);
				if (url.pathname === '/demonstration/') url.pathname = '/demonstration';
				if (url.pathname === '/en/demo/') url.pathname = '/en/demo';
				item.url = url.toString();

				const FR_HOME = 'https://typetodeploy.taras-and-lisa.com/';
				const EN_HOME = 'https://typetodeploy.taras-and-lisa.com/en/';
				const FR_DEMO = 'https://typetodeploy.taras-and-lisa.com/demonstration';
				const EN_DEMO = 'https://typetodeploy.taras-and-lisa.com/en/demo';

				if (item.url === FR_HOME || item.url === EN_HOME) {
					item.links = [
						{ lang: 'fr', url: FR_HOME },
						{ lang: 'en', url: EN_HOME },
						{ lang: 'x-default', url: FR_HOME },
					];
				} else if (item.url === FR_DEMO || item.url === EN_DEMO) {
					item.links = [
						{ lang: 'fr', url: FR_DEMO },
						{ lang: 'en', url: EN_DEMO },
						{ lang: 'x-default', url: FR_DEMO },
					];
				}
				return item;
			},
		}),
	],
});
