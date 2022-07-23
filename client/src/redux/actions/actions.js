import axios from 'axios';

export const ALL_RECIPES = 'ALL_RECIPES';
export const RECIPE_DETAIL = 'RECIPE_DETAIL';
export const CLEAR_PAGE = 'CLEAR_PAGE';
export const FILTER_RECIPES = 'FILTER_RECIPES';

const ROUTE_RECIPES = 'http://localhost:3001/recipes';

export function allRecipes() {
	return async function call(dispatch) {
		let aux = await axios.get(ROUTE_RECIPES);
		return dispatch({
			type: ALL_RECIPES,
			payload: aux.data
		});
	};
}

export function recipeDetail(id) {
	return async function call(dispatch) {
		let aux = await axios.get(`${ROUTE_RECIPES}/${id}`);
		return dispatch({
			type: RECIPE_DETAIL,
			payload: aux
		});
	};
}

export function clearPage() {
	return { type: CLEAR_PAGE };
}
