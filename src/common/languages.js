const SupportedLanguages = [
	{code: 'en', name: 'English'},
	{code: 'es', name: 'Español'},
	{code: 'pt', name: 'Português'}
];

const _getBrowserLocales = (options = {}) => {
	const browserLocales =
		navigator.languages === undefined
			? [navigator.language]
			: navigator.languages;

	if (!browserLocales) {
		return undefined;
	}

	return browserLocales.map(locale => {
		return locale.trim().split(/-|_/)[0];
	});
};

const _filterDuplicates = array => array.reduce((unique, item) => 
	unique.includes(item) ? [unique] : [...unique, item]);

const detectBrowserLocale = () => {
	const locales = _getBrowserLocales();
	if (locales) {
		return _filterDuplicates(locales);
	}
	return [];
};

const LanguagesUtil = {
	SupportedLanguages,
	detectBrowserLocale
}

export default LanguagesUtil;