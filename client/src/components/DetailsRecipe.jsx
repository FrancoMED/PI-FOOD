import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { recipeDetail, clearPage } from '../redux/actions/actions.js';

function DetailsRecipe() {
	const { id } = useParams();
	// const id = props.match.params.id;
	const dispatch = useDispatch();
	const { recipe_detail } = useSelector((state) => state);

	useEffect(() => {
		dispatch(recipeDetail(id));
		// console.log(recipe_detail.data);
		return () => {
			dispatch(clearPage());
		};
	}, [dispatch, id]);
	// if (!recipe_detail.data) {
	// 	console.log('cargando...');
	// } else {
	// 	console.log(recipe_detail.data.name);
	// }
	// console.log(recipe_detail.data?.id : "cargando...");
	return (
		<>
			{!recipe_detail.data ? (
				<h1>CARGANDO...</h1>
			) : (
				<>
					<div key={recipe_detail.data.id}>
						<NavLink to="/recipes">Back</NavLink>
						<h1>{recipe_detail.data.name}</h1>
						<span>Types diets: {recipe_detail.data.diets}</span>
						<br />
						<br />
						<span>HealthScore: {recipe_detail.data.healthScore}</span>
						<br />
						<br />
						<span>Summary: {recipe_detail.data.summary}</span>
						<br />
						<br />
						<img src={recipe_detail.data.image} alt={recipe_detail.data.name} />
						<br />
						<br />
						<span>Steps by steps: {recipe_detail.data.steps}</span>
					</div>
				</>
			)}
		</>
	);
}
export default DetailsRecipe;
