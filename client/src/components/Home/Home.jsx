import React, { useEffect } from 'react';
import Pagination from '../Pagination/Pagination.jsx';
import Card from '../Card/Card.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { allRecipes } from '../../redux/actions/actions.js';

export default function Home() {
	const dispatch = useDispatch();
	const recipes = useSelector((state) => state.recipes);

	useEffect(() => {
		dispatch(allRecipes());
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
					<Pagination
						data={recipes}
						RenderComponent={Card}
						pageLimit={3}
						dataLimit={9}
					/>
				</>
			) : (
				// recipes.map((food) => (
				// 	<div key={food.id}>
				// 		<Card
				// 			id={food.id}
				// 			name={food.name}
				// 			image={food.image}
				// 			diets={food.diets}
				// 		/>
				// 	</div>
				// ))
				<h1>Cargando...</h1>
			)}
		</>
	);
}
