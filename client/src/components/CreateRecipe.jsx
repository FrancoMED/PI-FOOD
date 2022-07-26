import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getDiets } from '../redux/actions/actions';

export default function CreateRecipe() {
	let contador = 1;
	const allDiets = useSelector((state) => state.allDiets);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDiets());
	}, []);

	const [data, setData] = useState({
		name: '',
		image: '',
		summary: '',
		healthScore: 0,
		steps: '',
		diets: []
	});
	const [error, setError] = useState({
		name: 'The name of the recipe is required',
		image: 'The image of the recipe is required',
		summary: 'Must contain at least 10 characters and no double spaces',
		healthScore: 'The healthScore of the recipe is required',
		steps: 'Must contain at least 10 characters and no double spaces',
		diets: 'Select at least one option'
	});
	const [msgError, setMsgError] = useState('');

	function validate(state) {
		let error = {};
		if (!state.name) {
			error.name = 'The name of the recipe is required';
		} else if (!/^[A-Z][a-zA-Zá-úÁ-ÚñÑ\s]{2,19}$/.test(state.name)) {
			error.name =
				'the name must start with a capital letter and contain between 3 and 20 characters';
		} else {
			error.name = '';
		}
		if (!state.image) {
			error.image = 'The image of the recipe is required';
		} else if (
			!/^(http(s?):)([/|.|\w|\S|-])*\.(?:jpg|jpeg|gif|png)/i.test(state.image)
		) {
			error.image = 'The image of the recipe is invalid';
		} else {
			error.image = '';
		}
		if (state.summary?.length > 10 && !/(\s{2,})/g.test(state.summary)) {
			error.summary = '';
		} else {
			error.summary =
				'Must contain at least 10 characters and no double spaces';
		}
		if (!state.healthScore) {
			error.healthScore = 'The health Score of the recipe is required';
		} else if (
			isNaN(state.healthScore) ||
			state.healthScore < 0 ||
			state.healthScore > 100
		) {
			error.healthScore = 'the health score must be from 0 to 100';
		} else {
			error.healthScore = '';
		}
		if (state.steps?.length > 10 && !/(\s{2,})/g.test(state.steps)) {
			error.steps = '';
		} else {
			error.steps = 'Must contain at least 10 characters and no double spaces';
		}
		if (!state.diets.length) {
			error.diets = 'Select at least one option';
		} else {
			error.diets = '';
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
	// const [diet, setDiet] = useState([]);
	function dietsOnChange(e) {
		// e.preventDefault();
		setData({ ...data, diets: [...data.diets, e.target.value] });
		setError(validate({ ...data, diets: [...data.diets, e.target.value] }));
	}

	const handleOnSubmit = async (e) => {
		e.preventDefault();
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
			console.log(allDiets);
			await axios
				.post('http://localhost:3001/recipes', data)
				// .then((response) => {
				// 	console.log(response.data.data[0]);
				// })
				.catch((error) => {
					console.log(error);
				});
		} else {
			setMsgError('Complete Form');
		}
	};
	return (
		<div>
			{/* {diets.length ? (
				// console.log(diets);
				diets.map((e) => <div key={contador++}>{e.name}</div>)
			) : (
				<h1>Cargando...</h1>
			)} */}
			<NavLink to="/recipes">Back</NavLink>
			<form>
				<div key={contador++}>
					<label>Recipe Name: </label>
					<input
						type="text"
						name="name"
						value={data.name}
						onChange={handleChange}
					/>
					<output>{error.name || ''}</output>
				</div>
				<br />
				<div key={contador++}>
					<label>Image: </label>
					<textarea
						name="image"
						rows="3"
						value={data.image}
						onChange={handleChange}
					/>
					<output>{error.image || ''}</output>
				</div>
				<br />
				<div key={contador++}>
					<label>Health Score: </label>
					<input
						type="number"
						name="healthScore"
						value={data.healthScore}
						onChange={handleChange}
					/>
					<output>{error.healthScore || ''}</output>
				</div>
				<br />
				<div key={contador++}>
					<label>Summary: </label>
					<textarea
						name="summary"
						rows="3"
						value={data.summary}
						onChange={handleChange}
					/>
					<output>{error.summary || ''}</output>
				</div>
				<br />
				<div key={contador++}>
					<label>Steps to follow: </label>
					<textarea
						name="steps"
						rows="3"
						value={data.steps}
						onChange={handleChange}
					/>
					<output>{error.steps || ''}</output>
				</div>
				<br />
				<div key={contador++}>
					<label>Select/s type diet: </label>
					<select
						name="diets"
						defaultValue="Select option"
						// multiple
						onChange={dietsOnChange}
					>
						<option disabled="disabled" value="Select option">
							Select the diets availables for this recipe
						</option>
						{allDiets &&
							allDiets.map((d) => <option value={d.name}>{d.name}</option>)}
					</select>
					{/* "gluten free", "ketogenic", "vegetarian", "dairy free", "lacto ovo
					vegetarian", "vegan", "pescatarian", "paleolithic", "primal", "fodmap
					friendly", "whole 30", */}
				</div>
				<output>{error.diets || ''}</output>
				<br />
				<div key={contador++}>
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
