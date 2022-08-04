import React, { useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Sort from '../Sort/Sort.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import Card from '../Card/Card.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { allRecipes, clearRecipes } from '../../redux/actions/actions.js';
import './Home.css';

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

	return (
		<div className="menu">
			{recipes.length ? (
				<>
					<SearchBar />
					<Sort />

					<Pagination
						data={recipes}
						RenderComponent={Card}
						pageLimit={5}
						dataLimit={9}
					/>
				</>
			) : (
				<img
					src="https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif"
					alt="NOT FOUND"
				/>
			)}
		</div>
	);
}
