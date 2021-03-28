import React, { useEffect, useState } from 'react';
import { 
	XYPlot,
	LineSeries,
	XAxis,
	YAxis,
	HorizontalGridLines,
	VerticalGridLines,
	Crosshair,
  DiscreteColorLegend
 } from 'react-vis';
import { FormattedMessage, useIntl } from 'react-intl';
import CrosshairContent from './CrosshairContent/CrosshairContent';
import '../../../node_modules/react-vis/dist/style.css';
import './CostChart.css';

// Constants of the linear equation y = A + B * x
const A = 0;
const B = 0.005;

// Withdrawal fees in sats
const WITHDRAWAL_FEE = 50e3;

// Interval (in sats) over which to draw different points.
const CHART_DATA_STEP = 10e3;

// How much more beyond the 'break even' 
// point to display in the chart
const EXTENSION_FACTOR = 1.5;

const verticalStyle = {
	strokeWidth: 2,
	stroke: '#ff0000'
};

const fixedCostStyle = {
	strokeWidth: 2,
	stroke: '#EEB757'
};

const variableCostStyle = {
	color: '#588E61'
};

const Units = {
	SATS: 'sats',
	USD: 'usd'
};

const CostChart = ({ btcPrice }) => {
	const [unit, setUnit] = useState(Units.SATS);
	const [crosshairValues, setCrosshairValues] = useState([]);

	const [chartData, setChartData] = useState([]);
	const [fiatChartData, setFiatChartData] = useState([]);

	const intl = useIntl();

	const satsPerDollar = () => btcPrice > 0 ? parseInt((1./ btcPrice) * 1e8) : 1;

	const getX = (y) => parseInt((y - A) / B);

	const getY = (x) => parseInt(A + B * x);

	useEffect(() => {
		const xBreakEven = getX(WITHDRAWAL_FEE);
		const xLimit = xBreakEven * EXTENSION_FACTOR;

		const data = [];
		for (let i = 0; i < xLimit; i = i + CHART_DATA_STEP) {
			data.push({ x: i, y: getY(i)});
		}
		setChartData(data);
	}, [A, B]);

	useEffect(() => {
		if (unit !== Units.SATS && fiatChartData.length === 0) {
			const factor = satsPerDollar();
			const adjustedData = chartData.map(pair => {
				const { x, y } = pair;
				return { x: (x / factor), y: (y / factor) };
			});
			setFiatChartData(adjustedData);
		}
	}, [unit]);

	const tickFormat = (value, index, scale, tickTotal) => {
		return formatInt(value);
	};

	const handleUnitToggle = () => {
		if (unit === Units.SATS)
			setUnit(Units.USD);
		else
			setUnit(Units.SATS);
	}

	const getWithdrawalCost = () => {
		if (unit === Units.SATS) return WITHDRAWAL_FEE;
		return WITHDRAWAL_FEE / satsPerDollar();
	}

	const getEquivalencePoint = () => {
		if (unit === Units.SATS) return getX(WITHDRAWAL_FEE);
		return getX(WITHDRAWAL_FEE) / satsPerDollar();
	}

	const xAxisTitle = () => intl.formatMessage(
		{
			id: 'app.costChart.xAxis',
			description: 'x axis',
			defaultMessage: `Amount to withdraw (${unit.toUpperCase()})`
		}, {unit: unit});

	const yAxisTitle = () => intl.formatMessage({
		id: 'app.costChart.yAxis',
		description: 'y axis title',
		defaultMessage: `Cost (${unit.toUpperCase()})`
	}, {unit: unit});

	const onMouseLeave = () => setCrosshairValues([]);

	const onNearestX = (value, index) => {
		setCrosshairValues([value]);
	}

	const formatCrosshair = dataPoints => {
		return dataPoints.map(dataPoint => {
			return {
				title: 'Cost',
				value: new Intl.NumberFormat('en', {maximumFractionDigits: 2}).format(dataPoint.y)
			}
		});
	}

	const formatInt = value => {
	if (value < 1e3)
		return `${value}`;
	if (value < 1000e3)
		return `${value / 1e3}K`;
	else
		return `${value / 1e6}M`;
	}

	const formatValue = value => {
		if (unit === Units.SATS) {
			return formatInt(value);
		} else {
			return new Intl.NumberFormat('en', {maximumFractionDigits: 2}).format(value);
		}
	}

	return (
		<div className='CostChartRoot'>
			<div className='Unit'>
				<label>Unit</label>
				<button onClick={handleUnitToggle}>{unit ? unit.toUpperCase() : ''}</button>
			</div>
			<div>
				<FormattedMessage
					id="app.costChart.priceMessage"
					defaultMessage={`Price: ${btcPrice} USD`}
					values={{btcPrice: btcPrice}}
				/>
			</div>
			<XYPlot height={300} width={700} onMouseLeave={onMouseLeave}>
				<LineSeries
					data={unit === Units.SATS ? chartData : fiatChartData}
					onNearestX={onNearestX}
					color={variableCostStyle.color}
				/>
				<XAxis title={xAxisTitle()} tickFormat={tickFormat}/>
				<YAxis title={yAxisTitle()} tickFormat={tickFormat}/>
				<HorizontalGridLines tickValues={[getWithdrawalCost()]} style={fixedCostStyle}/>
				<VerticalGridLines tickValues={[getEquivalencePoint()]} style={verticalStyle}/>
				<Crosshair values={crosshairValues} itemsFormat={formatCrosshair}>
					<CrosshairContent
						crosshairValues={crosshairValues}
						formatValue={formatValue}
						getWithdrawalCost={getWithdrawalCost}
						unit={unit}/>
				</Crosshair>
				<DiscreteColorLegend items={[
					<FormattedMessage
						id="app.costChart.directWithdrawal"
						defaultMessage={'Direct Withdrawal'}
					/>,
					<FormattedMessage
						id="app.costChart.indirectWithdrawal"
						defaultMessage={'Indirect Withdrawal'}
					/>
				]}/>
			</XYPlot>
		</div>
	);
};


export default CostChart;