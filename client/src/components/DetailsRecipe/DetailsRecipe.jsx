import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { recipeDetail, clearDetails } from '../../redux/actions/actions.js';
import './DetailsRecipe.css';

function DetailsRecipe() {
	const { id } = useParams();

	const dispatch = useDispatch();
	const recipe_detail = useSelector((state) => state.recipe_detail);

	useEffect(() => {
		dispatch(recipeDetail(id));

		return () => {
			dispatch(clearDetails());
		};
	}, [dispatch, id]);

	return (
		<>
			{recipe_detail.message ? (
				<h1>{recipe_detail.message}</h1>
			) : recipe_detail.id ? (
				<>
					<div className="detailContainer" key={recipe_detail.id}>
						<h1 className="title"> {recipe_detail.name}</h1>
						<span className="primaryText">
							Types diets: {recipe_detail.diets}
						</span>
						<span className="primaryText">
							HealthScore: {recipe_detail.healthScore}
						</span>
						<br />
						<br />
						<img
							src={recipe_detail.image}
							alt={`img not found:${recipe_detail.name}`}
						/>
						<br />
						<br />
						<span className="secondText">Summary: {recipe_detail.summary}</span>
						<br />
						<br />

						<span className="secondText">
							Steps by steps: {recipe_detail.steps}
						</span>
					</div>
				</>
			) : (
				<img
					src="https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif"
					alt="NOT FOUND"
				/>
			)}
		</>
	);
}
export default DetailsRecipe;
