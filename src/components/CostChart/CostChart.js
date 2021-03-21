import React from 'react';
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
}

const CostChart = () => {

	const onNearestX = (value, {event, innerX, index}) => {
	}

	const getX = (y) => parseInt((y - A) / B);

	const getY = (x) => parseInt(A + B * x);

	const generateDataPoints = () => {
		return [
			{x: getX(0), y: 0},
			{x: getX(WITHDRAWAL_FEE), y: WITHDRAWAL_FEE},
			{x: getX(WITHDRAWAL_FEE) * 2, y: getY(getX(WITHDRAWAL_FEE) * 2)}
		]
	}

	const tickFormat = (value, index, scale, tickTotal) => {
		if (value < 1000e3)
			return `${value / 1e3}K`;
		else
			return `${value / 1e6}M`;
	}

	const data = generateDataPoints();

	return (
		<div className='CostChartRoot'>
			<XYPlot height={300} width={700}>
				<LineSeries data={data} onNearestX={onNearestX}/>
				<XAxis title='Amount to withdraw (sats)' tickFormat={tickFormat}/>
				<YAxis title='Cost (sats)' tickFormat={tickFormat}/>
				<HorizontalGridLines tickValues={[WITHDRAWAL_FEE]}/>
				<VerticalGridLines tickValues={[getX(WITHDRAWAL_FEE)]} style={verticalStyle}/>
			</XYPlot>
		</div>
	);
};


export default CostChart;