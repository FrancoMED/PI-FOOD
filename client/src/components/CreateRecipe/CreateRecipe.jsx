import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getDiets, saveMyRecipe } from '../../redux/actions/actions.js';
import './CreateRecipe.css';

export default function CreateRecipe() {
	let count = 1;

	const all_diets = useSelector((state) => state.all_diets);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

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

	function handleCheckBox(e) {
		let newArray = data.diets;
		let find = newArray.indexOf(e.target.value);

		if (find >= 0) {
			newArray.splice(find, 1);
		} else {
			newArray.push(e.target.value);
		}

		setData({
			...data,
			diets: newArray
		});
		const validations = validate(data);
		setError(validations);
	}

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		if (
			data.name &&
			data.image &&
			data.summary &&
			data.healthScore &&
			data.steps &&
			data.diets &&
			!error.name &&
			!error.image &&
			!error.summary &&
			!error.healthScore &&
			!error.steps &&
			!error.diets
		) {
			setMsgError('');
			dispatch(saveMyRecipe(data));
			setData({
				name: '',
				image: '',
				summary: '',
				healthScore: 0,
				steps: '',
				diets: []
			});
		} else {
			setMsgError('Complete Form');
		}
	};
	return (
		<div className="menuForm">
			<NavLink className="NavLink " to="/recipes">
				<input className="btnBack" type="submit" value="MENU" />
			</NavLink>
			<form>
				<div className="form">
					<div className="infoContainer" key={count++}>
						<label>Recipe Name: </label>
						<br />
						<input
							type="text"
							name="name"
							value={data.name}
							onChange={handleChange}
							className="text"
						/>
						<br />
						<span className="spanError">{error.name || ''}</span>
					</div>
					<br />
					<div className="infoContainer" key={count++}>
						<label>Image: </label>

						<textarea
							name="image"
							rows="3"
							value={data.image}
							onChange={handleChange}
							className="textarea"
						/>

						<span className="spanError">{error.image || ''}</span>
					</div>
					<br />
					<div className="infoContainer" key={count++}>
						<label>Health Score: </label>
						<br />
						<input
							type="number"
							name="healthScore"
							value={data.healthScore}
							onChange={handleChange}
							className="number"
						/>
						<br />
						<span className="spanError">{error.healthScore || ''}</span>
					</div>
					<br />
					<div className="infoContainer" key={count++}>
						<label>Summary: </label>
						<br />
						<textarea
							name="summary"
							rows="3"
							value={data.summary}
							onChange={handleChange}
							className="textarea"
						/>
						<br />
						<span className="spanError">{error.summary || ''}</span>
					</div>
					<br />
					<div className="infoContainer" key={count++}>
						<label>Steps to follow: </label>
						<br />
						<textarea
							name="steps"
							rows="3"
							value={data.steps}
							onChange={handleChange}
							className="textarea"
						/>
						<br />
						<span className="spanError">{error.steps || ''}</span>
					</div>
					<br />
					<div className="checkboxContainer" key={count++}>
						<label>Select/s type diet: </label>
						{all_diets &&
							all_diets.map((diet) => {
								return (
									<div key={diet.id}>
										<input
											type="checkbox"
											name="diets"
											id={diet.name}
											value={diet.name}
											selected={data.diets.includes(diet.name)}
											onChange={handleCheckBox}
										/>
										<label htmlFor={diet.name}>{diet.name.toUpperCase()}</label>
									</div>
								);
							})}
					</div>
					<span className="spanError">{error.diets || ''}</span>
					<br />
					<div className="btnContainer" key={count++}>
						<input
							className="save"
							type="submit"
							value="SAVE"
							onClick={handleOnSubmit}
						/>
						<br />
						<span className="errorSumbit">{msgError}</span>
					</div>
				</div>
			</form>
		</div>
	);
}
