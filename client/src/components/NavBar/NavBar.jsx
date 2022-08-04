import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { allRecipes, clearRecipes } from '../../redux/actions/actions.js';
import './NavBar.css';

export default function NavBar() {
	const dispatch = useDispatch();

	function handleClick() {
		dispatch(clearRecipes());
		dispatch(allRecipes());
	}

	return (
		<div>
			<nav className="NavContainer">
				<ul>
					<NavLink onClick={handleClick} className="NavLink" to="/recipes">
						<li>
							<img
								src="https://cdn.dribbble.com/users/989157/screenshots/4822481/food-icons-loading-animation.gif"
								// src="https://cdn-icons.flaticon.com/png/512/706/premium/706944.png?token=exp=1659537250~hmac=c598c94d01ff279b7fcae0e3ccec5b70"
								alt="not found"
							/>
						</li>
					</NavLink>
					<NavLink className="NavLink" to="/create">
						<li>Create Recipe</li>
					</NavLink>
				</ul>
			</nav>
		</div>
	);
}
