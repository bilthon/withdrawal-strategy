import React, { useState, useEffect } from 'react';
import CostChart from '../../components/CostChart/CostChart';
import Problem from '../../components/Problem/Problem';
import Solution from '../../components/Solution/Solution';
import Objection from '../../components/Objection/Objection';
import Links from '../../components/Links/Links';
import ReactGA from 'react-ga';
import { IntlProvider } from 'react-intl';
import Translations from '../../utils/Translations';
import languages from '../../common/languages';
import cctx from 'ccxt';
import './Main.css';

ReactGA.initialize('UA-193321912-1', {
	testMode: process.env.NODE_ENV === 'development'
});
ReactGA.pageview(window.location.pathname + window.location.search);

const WITHDRAWAL_COST = 50e3;

const Main = () => {
	const [btcPrice, setBtcPrice] = useState(0);
	const [locale, setLocale] = useState('en');

	const { SupportedLanguages, detectBrowserLocale } = languages;

	useEffect(() => {
		const fetchPrice = async () => {
			const exchangeClass = cctx['binance'];
			const binance = new exchangeClass({});
			const tickers = await binance.fetchTickers();
			const btcPrice = tickers['BTC/USDT'].last;
			setBtcPrice(btcPrice);
		}
		const locales = detectBrowserLocale();
		if (locales && locales.length) {
			onLanguageSelected({ target: {value: locales[0] }});
		}
		fetchPrice();
	},[detectBrowserLocale]);

	const onLanguageSelected = event => {
		setLocale(event.target.value);
	}

	return (
		<div className='Main'>
			<IntlProvider locale={locale} messages={Translations[locale]}>
				<label>Choose a language:</label>
				<select onChange={onLanguageSelected} name="locales">
					{SupportedLanguages.map((locale, i) =>
						<option key={i} value={locale.code}>{locale.name}</option>
					)}
				</select>
				<Problem btcPrice={btcPrice} withdrawalCost={WITHDRAWAL_COST}/>
				<Solution/>
				<Objection/>
				<CostChart btcPrice={btcPrice}/>
				<Links/>
			</IntlProvider>
		</div>
	)
}

export default Main;