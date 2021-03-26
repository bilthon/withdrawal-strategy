import React, { useState } from 'react';
import CostChart from '../../components/CostChart/CostChart';
import { IntlProvider } from 'react-intl';
import Translations from '../../utils/Translations';
import './Main.css';

const Main = () => {

	const [locale, setLocale] = useState('en');

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
				<CostChart/>
			</IntlProvider>
		</div>
	)
}

export default Main;