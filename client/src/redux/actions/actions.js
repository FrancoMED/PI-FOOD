import axios from 'axios';

export const ALL_RECIPES = 'ALL_RECIPES';
export const RECIPE_DETAIL = 'RECIPE_DETAIL';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_RECIPES = 'FILTER_RECIPES';
export const CLEAR_PAGE = 'CLEAR_PAGE';

const LOCALHOST = 'http://localhost:3001/';

export function allRecipes() {
	return async function call(dispatch) {
		let aux = await axios.get(`${LOCALHOST}recipes`);
		return dispatch({
			type: ALL_RECIPES,
			payload: aux.data
		});
	};
}

export function recipeDetail(id) {
	return async function call(dispatch) {
		let recipe = await axios.get(`${LOCALHOST}recipes/${id}`);
		return dispatch({
			type: RECIPE_DETAIL,
			payload: recipe
		});
	};
}

export function getDiets() {
	return async function call(dispatch) {
		let allDiets = await axios.get(`http://localhost:3001/diets`);
		// console.log(diets.data || 'no existe');
		return dispatch({
			type: GET_DIETS,
			payload: allDiets.data
		});
	};
}

export function clearPage() {
	return { type: CLEAR_PAGE };
}
