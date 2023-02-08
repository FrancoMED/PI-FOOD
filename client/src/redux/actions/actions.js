import axios from 'axios';

export const ALL_RECIPES = 'ALL_RECIPES';
export const RECIPE_DETAIL = 'RECIPE_DETAIL';
export const CLEAR_RECIPES = 'CLEAR_RECIPES';
export const CLEAR_DETAILS = 'CLEAR_DETAILS';
export const SEARCH_RECIPE = 'SEARCH_RECIPE';
export const GET_DIETS = 'GET_DIETS';
export const SAVE_MY_RECIPE = 'SAVE_MY_RECIPE';
export const SORT_RECIPES = 'SORT_RECIPES';
export const FILTER_RECIPES = 'FILTER_RECIPES';

export function allRecipes() {
	return async function call(dispatch) {
		let all = await axios.get(`/recipes`);
		return dispatch({
			type: ALL_RECIPES,
			payload: all.data
		});
	};
}

export function recipeDetail(id) {
	return async function call(dispatch) {
		let recipe = await axios.get(`/recipes/${id}`);
		return dispatch({
			type: RECIPE_DETAIL,
			payload: recipe.data
		});
	};
}

export function clearRecipes() {
	return { type: CLEAR_RECIPES };
}

export function clearDetails() {
	return { type: CLEAR_DETAILS };
}

export function searchRecipe(name) {
	return async function call(dispatch) {
		let recipes = await axios.get(`/recipes?name=${name}`);
		return dispatch({
			type: SEARCH_RECIPE,
			payload: recipes.data
		});
	};
}

export function getDiets() {
	return async function call(dispatch) {
		let allDiets = await axios.get(`/diets`);
		return dispatch({
			type: GET_DIETS,
			payload: allDiets.data
		});
	};
}

export const saveMyRecipe = (newRecipe) => {
	return async function (dispatch) {
		const response = await axios.post(`/recipes`, newRecipe);
		// newRecipe.id = response.data.id;
		dispatch({ type: SAVE_MY_RECIPE, payload: response.data });
		alert(response.data.message);
	};
};

export const sortRecipes = (order) => {
	return { type: SORT_RECIPES, payload: order };
};
