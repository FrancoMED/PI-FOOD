import React, { useState } from 'react';

export default function SearchBar() {
	const [search, setSearch] = useState('');
	function handleChange(e) {
		e.preventDefault();
		setSearch(e.target.value);
	}

	function handleOnSubmit(e) {
		e.preventDefault();
	}

	return (
		<div>
			<input type="text" name="recipe" value={search} onChange={handleChange} />
			<input type="submit" value="SEARCH" onClick={handleOnSubmit} />
		</div>
	);
}
