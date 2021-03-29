import React from 'react';
import { useIntl } from 'react-intl';
import en from '../../lang/en.json';
import './Objection.css';

const Objection = () => {

	const intl = useIntl();

	const _getTitle = () => intl.formatMessage({
		id: 'app.objection.title',
		defaultMessage: en['app.objection.title']
	});

	const generateParagraph = (id) => intl.formatMessage({
		id: id,
		defaultMessage: en[id]
	});

	return (
		<div className='ParagraphContainer'>
			<h2>{_getTitle()}</h2>
			<p>{generateParagraph('app.objection.paragraph1')}</p>
			<p>{generateParagraph('app.objection.paragraph2')}</p>
			<p>{generateParagraph('app.objection.paragraph3')}</p>
			<p>{generateParagraph('app.objection.paragraph4')}</p>
		</div>
	)
};

export default Objection;