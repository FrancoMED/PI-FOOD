import React, { useEffect } from 'react';
import Sort from '../Sort/Sort.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import Card from '../Card/Card.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { allRecipes, clearRecipes } from '../../redux/actions/actions.js';

export default function Home() {
	const dispatch = useDispatch();
	const recipes = useSelector((state) => state.current_recipes);
	// const all_diets = useSelector((state) => state.all_diets);

	useEffect(() => {
		dispatch(allRecipes());
		return () => {
			dispatch(clearRecipes());
		};
	}, [dispatch]);

	function handleClick(e) {
		e.preventDefault();
		dispatch(allRecipes());
	}

	return (
		<>
			<button onClick={handleClick}>Refresh recipes</button>
			{recipes.length ? (
				<>
					<Sort />
					<Pagination
						data={recipes}
						RenderComponent={Card}
						pageLimit={5}
						dataLimit={9}
					/>
				</>
			) : (
				<h1>Cargando...</h1>
			)}
		</>
	);
}
