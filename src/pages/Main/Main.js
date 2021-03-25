import React, { useState } from 'react';
import CostChart from '../../components/CostChart/CostChart';
import './Main.css';

export const LocaleContext = React.createContext();

const Main = () => {

	const [locale, setLocale] = useState('en');

	const onLanguageSelected = event => {
		setLocale(event.target.value);
	}

	return (
		<div className='Main'>
			<LocaleContext.Provider value={locale}>
				<label for="locale-select">Choose a language:</label>
				<select onChange={onLanguageSelected} name="locales" id="locale-select">
						<option value="en">English</option>
						<option value="es">Spanish</option>
						<option value="pt">Portuguese</option>
				</select>
				<CostChart/>
			</LocaleContext.Provider>
		</div>
	)
}

export default Main;