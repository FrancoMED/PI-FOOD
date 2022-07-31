import {
	ALL_RECIPES,
	RECIPE_DETAIL,
	CLEAR_DETAILS,
	SEARCH_RECIPE,
	GET_DIETS,
	SAVE_MY_RECIPE,
	FILTER_RECIPES
} from '../actions/actions.js';

const initialState = {
	recipes: [],
	recipe_detail: [],
	allDiets: [],
	filter_recipes: [],
	newRecipes: []
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ALL_RECIPES:
			return { ...state, recipes: action.payload };

		case RECIPE_DETAIL:
			return { ...state, recipe_detail: action.payload };

		case CLEAR_DETAILS:
			return { ...state, recipe_detail: [] };

		case SEARCH_RECIPE:
			return { ...state, recipes: action.payload };

		case GET_DIETS:
			return { ...state, allDiets: action.payload };

		case SAVE_MY_RECIPE:
			return { ...state, newRecipes: [...state.newRecipes, action.payload] };
		default:
			return { ...state };
	}
};

export default rootReducer;
