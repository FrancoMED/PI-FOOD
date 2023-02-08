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
					<div className="detail-container" key={recipe_detail.id}>
						<div className="img-title-container">
							<img
								src={recipe_detail.image}
								alt={`img not found:${recipe_detail.name}`}
							/>
							<div className="title">
								<h1> {recipe_detail.name}</h1>
								<span>Types diets: {recipe_detail.diets}</span>
								<br />
								<span>HealthScore: {recipe_detail.healthScore}</span>
							</div>
						</div>
						{/* <div className="primaryText-container"></div>
						<br />
						<br /> */}
						<div className="secondText-container">
							<span>Summary: {recipe_detail.summary}</span>
						</div>
						<br />
						<br />
						<div className="secondText-container">
							<span>Steps by steps: {recipe_detail.steps}</span>
						</div>
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
