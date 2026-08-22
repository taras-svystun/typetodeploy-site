import { fr } from './fr';
import { en } from './en';

export type Lang = 'fr' | 'en';

const dictionaries = { fr, en };

/** One entry per page: its path in each language. */
const routes: { fr: string; en: string }[] = [
	{ fr: '/', en: '/en/' },
	{ fr: '/demonstration', en: '/en/demo' },
];

export function getLangFromUrl(url: URL): Lang {
	return url.pathname.startsWith('/en/') || url.pathname === '/en' ? 'en' : 'fr';
}

export function useTranslations(lang: Lang) {
	return dictionaries[lang];
}

export function getAlternateUrl(pathname: string, lang: Lang): string {
	const route = routes.find((r) => r.fr === pathname || r.en === pathname);
	if (!route) return lang === 'fr' ? '/en/' : '/';
	return lang === 'fr' ? route.en : route.fr;
}
