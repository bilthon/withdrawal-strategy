import React, { useState } from 'react';
import './Form.css';

// Binance withdrawal fee in sats
const BINANCE_WITHDRAWAL = 50e3;

// The amount expected to be lost due to swap service fee
const SWAP_PROPORTIONAL_COST = 0.005;

const Form = props => {
	const [sats, setSats] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [swapCost, setSwapCost] = useState(0);

	const handleSatsChange = e => {
		setSats(e.target.value);
	}

	const handleNext = e => {
		e.preventDefault();
		const satoshis = parseInt(sats);
		const cost = satoshis * SWAP_PROPORTIONAL_COST;
		setSwapCost(cost);
		setShowResult(true);
	}

	let result = null;
	if (showResult) {
		result = (
			<div>
				<p>Swap Cost</p>
				<p>{swapCost}</p>
				<p>Direct Withdrawal Cost</p>
				<p>{BINANCE_WITHDRAWAL}</p>
			</div>
		)
	}

	return (
		<div>
			<form className='FormContainer'>
				<label className='FormItem'>Enter amount in Sats to withdraw</label>
				<input
					className='FormItem'
					type='number'
					value={sats}
					onChange={handleSatsChange}>
				</input>
				<input type='submit' value='Next' onClick={handleNext}></input>
			</form>
			{result}
		</div>
	);
};

export default Form;