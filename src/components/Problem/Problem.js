import React from 'react';
import { useIntl } from 'react-intl';
import './Problem.css';

const Problem = ({ btcPrice, withdrawalCost }) => {
	const intl = useIntl();

	const _getTitle = () => intl.formatMessage({
		id: 'app.problem.title'
	});

	const _getContent = () => intl.formatMessage({
		id: 'app.problem.content',
		defaultMessage: 'You want to buy a small amount of Bitcoin, but Binance charges you {satsAmount} satoshis per withdraw. That\'s {usdAmount} USD at current market prices! This forces you to eiter make a large purchase, not buy it, or buy it and just leave it at the exchange.'
	}, {
		satsAmount: withdrawalCost,
		usdAmount: (withdrawalCost * 1e-8) * btcPrice
	});

	return (
		<div className='ProblemContent'>
			<h2>{ _getTitle() }</h2>
			<p>{ _getContent() }</p>
		</div>
	)
}

export default Problem;