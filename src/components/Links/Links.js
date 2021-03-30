import React from 'react';
import { useIntl } from 'react-intl';
import ReactGA from 'react-ga';
import en from '../../lang/en.json';
import './Links.css';

const SwapSites = {
	SIDESHIFT: 0,
	FIXEDFLOAT: 1
}

const Links = () => {

	const intl = useIntl();

	const _getTitle = () => intl.formatMessage({
		id: 'app.links.title',
		defaultMessage: en['app.links.title']
	});

	const handleClick = which => {
		switch(which) {
			case SwapSites.SIDESHIFT:
				ReactGA.event({
					category: 'Interaction',
					action: 'Link clicked (s)',
					label: 'Sideshift'
				});
				break;
			case SwapSites.FIXEDFLOAT:
				ReactGA.event({
					category: 'Interaction',
					action: 'Link clicked (f)',
					label: 'FixedFloat'
				});
				break;
			default:
		}
	};

	return (
		<div className='ParagraphContainer'>
			<h2>{ _getTitle() }</h2>
			<ul className='Links'>
				<li>
					<a href='https://sideshift.ai/a/8hEdnBJyv'
						target='_blank'
						rel='noreferrer'
						onClick={() => handleClick(SwapSites.SIDESHIFT)}
					>
						SideShift
					</a>
				</li>
				<li>
					<a href='https://fixedfloat.com/LTC/BTC?ref=sr3fn9jb'
						target='_blank'
						rel='noreferrer'
						onClick={() => handleClick(SwapSites.FIXEDFLOAT)}
					>
						FixedFloat
					</a>
				</li>
			</ul>
		</div>
	)
}

export default Links;