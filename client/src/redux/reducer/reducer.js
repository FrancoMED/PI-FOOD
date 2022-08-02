import {
	ALL_RECIPES,
	RECIPE_DETAIL,
	CLEAR_RECIPES,
	CLEAR_DETAILS,
	SEARCH_RECIPE,
	GET_DIETS,
	SAVE_MY_RECIPE,
	SORT_RECIPES,
	FILTER_RECIPES
} from '../actions/actions.js';

const initialState = {
	all_recipes: [],
	current_recipes: [],
	recipe_detail: [],
	all_diets: [],
	filter_recipes: [],
	new_recipes: []
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ALL_RECIPES:
			return {
				...state,
				all_recipes: action.payload,
				current_recipes: action.payload
			};
		case CLEAR_RECIPES:
			return {
				...state,
				all_recipes: [],
				current_recipes: []
			};

		case RECIPE_DETAIL:
			return { ...state, recipe_detail: action.payload };

		case CLEAR_DETAILS:
			return { ...state, recipe_detail: [] };

		case SEARCH_RECIPE:
			return { ...state, current_recipes: action.payload };

		case GET_DIETS:
			return { ...state, all_diets: action.payload };

		case SAVE_MY_RECIPE:
			return { ...state, new_recipes: [...state.new_recipes, action.payload] };

		case SORT_RECIPES:
			let orderRecipes = [...state.current_recipes];
			if (action.payload === 'default') {
				return { ...state, current_recipes: state.all_recipes };
			}
			if (action.payload === 'A-Z' || action.payload === 'Z-A') {
				orderRecipes = orderRecipes.sort((a, b) => {
					if (a.name > b.name) {
						return action.payload === 'A-Z' ? 1 : -1;
					} else if (a.name < b.name) {
						return action.payload === 'A-Z' ? -1 : 1;
					} else {
						return 0;
					}
				});
			} else if (action.payload === '0-100' || action.payload === '100-0') {
				orderRecipes = orderRecipes.sort((a, b) => {
					if (a.healthScore > b.healthScore) {
						return action.payload === '0-100' ? 1 : -1;
					} else if (a.healthScore < b.healthScore) {
						return action.payload === '0-100' ? -1 : 1;
					} else {
						return 0;
					}
				});
			}

			return { ...state, current_recipes: orderRecipes };

		default:
			return { ...state };
	}
};

export default rootReducer;
