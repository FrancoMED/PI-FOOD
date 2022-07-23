import {
	ALL_RECIPES,
	RECIPE_DETAIL,
	CLEAR_PAGE,
	FILTER_RECIPES
} from '../actions/actions';

const initialState = {
	recipes: [],
	create_recipe: [],
	recipe_detail: {},
	filter_recipes: []
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ALL_RECIPES:
			return { ...state, recipes: action.payload };

		case RECIPE_DETAIL:
			return { ...state, recipe_detail: action.payload };

		case CLEAR_PAGE:
			return { ...state, recipe_detail: {} };
		default:
			return { ...state };
	}
};

export default rootReducer;
