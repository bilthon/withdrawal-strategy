import React from 'react';
import { useIntl } from 'react-intl';
import en from '../../lang/en.json';
import './Links.css';

const Links = () => {

	const intl = useIntl();

	const _getTitle = () => intl.formatMessage({
		id: 'app.links.title',
		defaultMessage: en['app.links.title']
	});

	return (
		<div className='ParagraphContainer'>
			<h2>{ _getTitle() }</h2>
			<ul className='Links'>
				<li>
					<a href='https://sideshift.ai/a/8hEdnBJyv' target='_blank'>
						SideShift
					</a>
				</li>
				<li>
					<a href='https://fixedfloat.com/LTC/BTC?ref=sr3fn9jb' target='_blank'>
						FixedFloat
					</a>
				</li>
			</ul>
		</div>
	)
}

export default Links;