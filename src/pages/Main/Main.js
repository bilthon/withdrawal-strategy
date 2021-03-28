import React, { useState, useEffect } from 'react';
import CostChart from '../../components/CostChart/CostChart';
import Problem from '../../components/Problem/Problem';
import { IntlProvider } from 'react-intl';
import Translations from '../../utils/Translations';
import cctx from 'ccxt';
import './Main.css';

const WITHDRAWAL_COST = 50e3;

const Main = () => {
	const [btcPrice, setBtcPrice] = useState(0);
	const [locale, setLocale] = useState('en');

	useEffect(() => {
		const fetchPrice = async () => {
			const exchangeClass = cctx['binance'];
			const binance = new exchangeClass({});
			const tickers = await binance.fetchTickers();
			const btcPrice = tickers['BTC/USDT'].last;
			setBtcPrice(btcPrice);
		}
		fetchPrice();
	}, []);

	const onLanguageSelected = event => {
		setLocale(event.target.value);
	}

	return (
		<div className='Main'>
			<IntlProvider locale={locale} messages={Translations[locale]}>
				<label for="locale-select">Choose a language:</label>
				<select onChange={onLanguageSelected} name="locales" id="locale-select">
						<option value="en">English</option>
						<option value="es">Spanish</option>
						<option value="pt">Portuguese</option>
				</select>
				<Problem btcPrice={btcPrice} withdrawalCost={WITHDRAWAL_COST}/>
				<CostChart btcPrice={btcPrice}/>
			</IntlProvider>
		</div>
	)
}

export default Main;