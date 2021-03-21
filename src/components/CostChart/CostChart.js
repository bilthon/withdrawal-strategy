import React, { useState } from 'react';
import { 
	XYPlot,
	LineSeries,
	XAxis,
	YAxis,
	HorizontalGridLines,
	VerticalGridLines } from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';
import './CostChart.css';

// Constants of the linear equation y = A + B * x
const A = -175;
const B = 0.005017561465127948;

// Withdrawal fees in sats
const WITHDRAWAL_FEE = 50e3;

const verticalStyle = {
	strokeWidth: 2,
	stroke: '#ff0000'
};

const BTC_USD = 59000;

const Units = {
	SATS: 'sats',
	USD: 'usd'
};

const CostChart = () => {
	const [unit, setUnit] = useState(Units.SATS);

	const onNearestX = (value, {event, innerX, index}) => {
	}

	const satsPerDollar = () => parseInt((1./BTC_USD) * 1e8);

	const getX = (y) => parseInt((y - A) / B);

	const getY = (x) => parseInt(A + B * x);

	const generateDataPoints = () => {
		return [
			{x: getX(0), y: 0},
			{x: getX(WITHDRAWAL_FEE), y: WITHDRAWAL_FEE},
			{x: getX(WITHDRAWAL_FEE) * 1.5, y: getY(getX(WITHDRAWAL_FEE) * 1.5)}
		]
	}

	const tickFormat = (value, index, scale, tickTotal) => {
		if (value < 1e3)
			return `${value}`;
		if (value < 1000e3)
			return `${value / 1e3}K`;
		else
			return `${value / 1e6}M`;
	};

	const handleUnitToggle = () => {
		if (unit === Units.SATS)
			setUnit(Units.USD);
		else
			setUnit(Units.SATS);
	}

	let data = generateDataPoints();
	if (unit !== Units.SATS) {
		const factor = satsPerDollar();
		data = data.map(pair => {
			const {x, y} = pair;
			return {x: (x / factor), y: (y / factor)};
		});
	}

	const getWithdrawalCost = () => {
		if (unit === Units.SATS) return WITHDRAWAL_FEE;
		return WITHDRAWAL_FEE / satsPerDollar();
	}

	const getEquivalencePoint = () => {
		if (unit === Units.SATS) return getX(WITHDRAWAL_FEE);
		return getX(WITHDRAWAL_FEE) / satsPerDollar();
	}

	const xAxisTitle = () => `Amount to withdraw (${unit.toUpperCase()})`;

	const yAxisTitle = () => `Cost (${unit.toUpperCase()})`;

	return (
		<div className='CostChartRoot'>
			<div className='Unit'>
				<label for='unit-switch'>Unit</label>
				<button onClick={handleUnitToggle} id='unit-switch'>{unit.toUpperCase()}</button>
			</div>
			<XYPlot height={300} width={700}>
				<LineSeries data={data} onNearestX={onNearestX}/>
				<XAxis title={xAxisTitle()} tickFormat={tickFormat}/>
				<YAxis title={yAxisTitle()} tickFormat={tickFormat}/>
				<HorizontalGridLines tickValues={[getWithdrawalCost()]}/>
				<VerticalGridLines tickValues={[getEquivalencePoint()]} style={verticalStyle}/>
			</XYPlot>
		</div>
	);
};


export default CostChart;