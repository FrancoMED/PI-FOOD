import React, { useEffect } from 'react';
import Card from './Card.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { allRecipes } from '../redux/actions/actions.js';

export default function Home() {
	const dispatch = useDispatch();
	const recipes = useSelector((state) => state.recipes);

	useEffect(() => {
		dispatch(allRecipes());
	}, [dispatch]);

	return (
		<>
			{recipes.length ? (
				recipes.map((food) => (
					<div key={food.id}>
						<Card
							id={food.id}
							name={food.name}
							image={food.image}
							diets={food.diets}
						/>
					</div>
				))
			) : (
				<h1>Cargando...</h1>
			)}
		</>
	);
}
