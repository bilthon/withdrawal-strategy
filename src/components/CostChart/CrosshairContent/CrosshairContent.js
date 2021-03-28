import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import './CrosshairContent.css';

const CrosshairContent = ({ crosshairValues, formatValue, getWithdrawalCost, unit}) => {
	let content = null;

	const intl = useIntl();

	const _formatValue = value => {
		let formatted;
		if (formatValue) formatted = formatValue(value);
		else formatted = value.toString();
		if (unit) formatted = `${formatted} ${unit.toUpperCase()}`;
		return formatted;
	}

	const _getTitle = () => intl.formatMessage({
		id: 'app.costChart.crosshair.title',
		defaultMessage: 'Withdrawal'
	});

	const _getSavings = (savings) => intl.formatMessage({
		id: 'app.costChart.crosshair.saving',
		defaultMessage: `Savings : ${_formatValue(savings)}`,
	}, { saving: _formatValue(savings) })

	if (crosshairValues.length > 0) {
		const { y } = crosshairValues[0];
		const savings = getWithdrawalCost() - y;
		content = (
			<div className='CrossHair'>
				<h4 className='CrossHairTitle'>{_getTitle()}</h4>
				<FormattedMessage
					className='CrossHairField'
					id="app.costChart.crosshair.amount"
					values={{ amount: _formatValue(crosshairValues[0].x) }}
				/>
				<br/>
				<FormattedMessage
					id="app.costChart.crosshair.direct"
					default={`Direct Cost : ${_formatValue(getWithdrawalCost())}`}
					values={{ directCost: _formatValue(getWithdrawalCost()) }}
				/>
				<br/>
				<FormattedMessage
					id="app.costChart.crosshair.indirect"
					default={`Indirect Cost : ${_formatValue(crosshairValues[0].y)}`}
					values={{ indirectCost: _formatValue(crosshairValues[0].y) }}
				/>
				<br/>
				<p
					className='CrossHairField'
					style={savings < 0 ? {color: '#FFE7E7', fontSize: 'bold'} : {}}>
					{ _getSavings(savings) }
				</p>
			</div>
		);
	}
	return content;
};

export default CrosshairContent;