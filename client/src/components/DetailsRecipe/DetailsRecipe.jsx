import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { recipeDetail, clearPage } from '../../redux/actions/actions.js';

function DetailsRecipe() {
	const { id } = useParams();

	const dispatch = useDispatch();
	const recipe_detail = useSelector((state) => state.recipe_detail);

	useEffect(() => {
		dispatch(recipeDetail(id));

		return () => {
			dispatch(clearPage());
		};
	}, [dispatch, id]);

	return (
		<>
			{recipe_detail.message ? (
				<h1>{recipe_detail.message}</h1>
			) : recipe_detail.id ? (
				<>
					<div key={recipe_detail.id}>
						<NavLink to="/recipes">Back</NavLink>
						<h1>{recipe_detail.name}</h1>
						<span>Types diets: {recipe_detail.diets}</span>
						<br />
						<br />
						<span>HealthScore: {recipe_detail.healthScore}</span>
						<br />
						<br />
						<span>Summary: {recipe_detail.summary}</span>
						<br />
						<br />
						<img
							src={recipe_detail.image}
							alt={`img not found:${recipe_detail.name}`}
						/>
						<br />
						<br />
						<span>Steps by steps: {recipe_detail.steps}</span>
					</div>
				</>
			) : (
				<h1>CARGANDO...</h1>
			)}
		</>
	);
}
export default DetailsRecipe;
