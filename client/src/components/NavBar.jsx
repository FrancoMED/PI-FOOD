import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';

export default function NavBar() {
	return (
		<div>
			<ul>
				<NavLink to="/create">Create Recipe</NavLink>
			</ul>
			<ul>
				<SearchBar />
			</ul>
			<ul></ul>
		</div>
	);
}
