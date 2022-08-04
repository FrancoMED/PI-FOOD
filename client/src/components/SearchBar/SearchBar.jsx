import React, { useState } from 'react';
import { searchRecipe } from '../../redux/actions/actions.js';
import { useDispatch } from 'react-redux';
import './SearchBar.css';

export default function SearchBar() {
	const [name, setName] = useState('');

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
		}
	}

	return (
		<div className="search-box">
			<button
				type="submit"
				value="SEARCH"
				onClick={handleOnSubmit}
				className="btn-search"
			>
				S
			</button>
			<input
				type="text"
				name="recipe"
				value={name}
				onChange={handleChange}
				className="input-search"
				placeholder="Write a Recipe..."
			/>
		</div>
	);
}
