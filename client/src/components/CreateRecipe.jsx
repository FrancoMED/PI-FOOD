import axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function CreateActivity() {
	const [data, setData] = useState({
		name: '',
		image: '',
		summary: '',
		healthScore: 0,
		steps: ''
		// diets: '',
	});
	const [error, setError] = useState({
		name: 'The name of the recipe is required',
		image: 'The image of the recipe is required',
		summary: 'The summary of the recipe is required',
		healthScore: 'The healthScore of the recipe is required',
		steps: 'The steps of the recipe is required',
		diets: ''
	});

	const [msgError, setMsgError] = useState('');
	function validate(state) {
		let error = {};
		if (!state.name) {
			error.name = 'The name of the recipe is required';
		} else if (!/[a-zñÑA-Zá-úÁ-Ú]/.test(state.name)) {
			error.name = 'The name of the recipe is invalid';
		} else {
			error.name = '';
		}
		if (!state.image) {
			error.image = 'The image of the recipe is required';
		} else {
			error.image = '';
		}
		if (!state.summary) {
			error.summary = 'The summary of the recipe is required';
		} else {
			error.summary = '';
		}
		if (!state.healthScore) {
			error.healthScore = 'The health Score of the recipe is required';
		} else if (
			isNaN(state.healthScore) ||
			state.healthScore < 0 ||
			state.healthScore > 100
		) {
			error.healthScore = 'Recipe health score must be between 0 and 100';
		} else {
			error.healthScore = '';
		}
		if (!state.steps) {
			error.steps = 'The steps of the recipe is required';
		} else {
			error.steps = '';
		}

		// if (!state.diets.length) {
		// 	error.diets = 'Add at least one diet';
		// }
		return error;
	}

	function handleChange(e) {
		e.preventDefault();
		setData((prevState) => {
			const newState = {
				...prevState,
				[e.target.name]: e.target.value
			};
			setError(validate(newState));

			return newState;
		});
	}

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		// console.log(error.season);
		if (
			data.name &&
			data.image &&
			data.summary &&
			data.healthScore &&
			data.steps &&
			!error.name &&
			!error.image &&
			!error.summary &&
			!error.healthScore &&
			!error.steps
		) {
			setMsgError('');
			console.log(data);
			await axios
				.post('http://localhost:3001/recipes', data)
				.then((response) => {
					console.log(response.data[0]);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			setMsgError('Completar Form');
		}
	};
	return (
		<div>
			<NavLink to="/recipes">Back</NavLink>
			<form>
				<div>
					Recipe Name:{' '}
					<input
						type="text"
						name="name"
						value={data.name}
						onChange={handleChange}
					/>
					<output>{error.name || ''}</output>
				</div>
				<br />
				<div>
					Image:{' '}
					<input
						type="text"
						name="image"
						value={data.image}
						onChange={handleChange}
					/>
					<output>{error.image || ''}</output>
				</div>
				<br />
				<div>
					Health Score:{' '}
					<input
						type="number"
						name="healthScore"
						value={data.healthScore}
						onChange={handleChange}
					/>
					<output>{error.healthScore || ''}</output>
				</div>
				<br />
				<div>
					Summary:{' '}
					<input
						type="text"
						name="summary"
						value={data.summary}
						onChange={handleChange}
					/>
					<output>{error.summary || ''}</output>
				</div>
				<br />
				<div>
					Steps to follow:{' '}
					<input
						type="text"
						name="steps"
						value={data.steps}
						onChange={handleChange}
					/>
					<output>{error.steps || ''}</output>
				</div>
				<br />
				<div>
					<input type="submit" value="SUBMIT" onClick={handleOnSubmit} />
					<br />
					<output>{msgError}</output>
				</div>
			</form>
		</div>
	);
}

// name: '',
// 		image: '',
// 		summary: '',
// 		healthScore: 0,
// 		steps: ''
// 		// diets: '',
