import React from 'react';
import './CrosshairContent.css';

const CrosshairContent = ({ crosshairValues, formatValue, getWithdrawalCost, unit}) => {
	let content = null;

	const _formatValue = value => {
		let formatted;
		if (formatValue) formatted = formatValue(value);
		else formatted = value.toString();
		if (unit) formatted = `${formatted} ${unit.toUpperCase()}`;
		return formatted;
	}

	if (crosshairValues.length > 0) {
		const { x, y } = crosshairValues[0];
		const savings = getWithdrawalCost() - y;
		content = (
			<div className='CrossHair'>
				<h4 className='CrossHairTitle'>Withdrawal</h4>
				<p className='CrossHairField'>Amount: {_formatValue(crosshairValues[0].x)} </p>
				<p className='CrossHairField'>Direct Cost : {_formatValue(getWithdrawalCost())} </p>
				<p className='CrossHairField'>Indirect Cost : {_formatValue(crosshairValues[0].y)} </p>
				<p className='CrossHairField' style={savings < 0 ? {color: '#FFE7E7', fontSize: 'bold'} : {}}>Savings : {_formatValue(savings)} </p>
			</div>
		);
	}
	return content;
};

export default CrosshairContent;