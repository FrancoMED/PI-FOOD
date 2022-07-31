import React, { useState } from 'react';
import { searchRecipe } from '../../redux/actions/actions.js';
import { useDispatch } from 'react-redux';

export default function SearchBar() {
	const [name, setName] = useState('');
	const [error, setError] = useState('');

	const dispatch = useDispatch();

	function handleChange(e) {
		e.preventDefault();
		setName(e.target.value);
	}

	function handleOnSubmit(e) {
		e.preventDefault();
		if (name !== '') {
			dispatch(searchRecipe(name));
			setName('');
			setError('');
		} else {
			setError('write a recipe');
		}
	}

	return (
		<div>
			<input type="text" name="recipe" value={name} onChange={handleChange} />
			<input type="submit" value="SEARCH" onClick={handleOnSubmit} />
			<output>{error}</output>
		</div>
	);
}
