import React from 'react';
import { useIntl } from 'react-intl';
import './Solution.css';

const Solution = () => {

	const intl = useIntl();

	const _getTitle = () => intl.formatMessage({
		id: 'app.solution.title'
	});

	const _getContent = () => intl.formatMessage({
		id: 'app.solution.content'
	});

	return (
		<div className='SolutionContent'>
			<h2>{ _getTitle() }</h2>
			<p>{ _getContent() }</p>
		</div>
	)
}

export default Solution;