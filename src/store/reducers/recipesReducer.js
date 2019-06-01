import {
	GET_RECIPE_ACTION,
	POST_RECIPE_ACTION,
	PATCH_RECIPE_ACTION,
	DELETE_RECIPE_ACTION,
	GET_RECIPES_ACTION,
	FILTER_RECIPE_ACTION,
} from '../actions/recipesActions';

const recipesReducer = (state = {}, action) => {
	const { type, data } = action;
	switch (type) {
		case GET_RECIPES_ACTION:
			return { items: data };
		case FILTER_RECIPE_ACTION:
			return { ...state, filtered: data };
		case GET_RECIPE_ACTION:
			return { selected: data };
		case POST_RECIPE_ACTION:
			return { items: [...state.items, data] };
		case PATCH_RECIPE_ACTION:
			return { selected: data };
		case DELETE_RECIPE_ACTION:
			return state.filter(recipe => recipe.id !== action.id);
		default:
			return state;
	}
}

export default recipesReducer;
