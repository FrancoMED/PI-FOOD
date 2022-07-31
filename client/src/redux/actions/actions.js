import axios from 'axios';

export const ALL_RECIPES = 'ALL_RECIPES';
export const RECIPE_DETAIL = 'RECIPE_DETAIL';
export const CLEAR_DETAILS = 'CLEAR_DETAILS';
export const SEARCH_RECIPE = 'SEARCH_RECIPE';
export const GET_DIETS = 'GET_DIETS';
export const SAVE_MY_RECIPE = 'SAVE_MY_RECIPE';
export const FILTER_RECIPES = 'FILTER_RECIPES';

const LOCALHOST = 'http://localhost:3001/';

export function allRecipes() {
	return async function call(dispatch) {
		let all = await axios.get(`${LOCALHOST}recipes`);
		return dispatch({
			type: ALL_RECIPES,
			payload: all.data
		});
	};
}

export function recipeDetail(id) {
	return async function call(dispatch) {
		let recipe = await axios.get(`${LOCALHOST}recipes/${id}`);
		return dispatch({
			type: RECIPE_DETAIL,
			payload: recipe.data
		});
	};
}

export function clearPage() {
	return { type: CLEAR_DETAILS };
}

export function searchRecipe(name) {
	return async function call(dispatch) {
		let recipes = await axios.get(`${LOCALHOST}recipes?name=${name}`);
		return dispatch({
			type: SEARCH_RECIPE,
			payload: recipes.data
		});
	};
}

export function getDiets() {
	return async function call(dispatch) {
		let allDiets = await axios.get(`${LOCALHOST}diets`);
		// console.log(diets.data || 'no existe');
		return dispatch({
			type: GET_DIETS,
			payload: allDiets.data
		});
	};
}

export const saveMyRecipe = (newRecipe) => {
	return async function (dispatch) {
		const response = await axios.post(`${LOCALHOST}recipes`, newRecipe);
		// newRecipe.id = response.data.id;
		dispatch({ type: SAVE_MY_RECIPE, payload: response.data });
		alert(response.data.message);
	};
};
