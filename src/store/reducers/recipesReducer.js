import {
	GET_RECIPE_ACTION,
	PATCH_RECIPE_ACTION,
	DELETE_RECIPE_ACTION,
	GET_RECIPES_ACTION,
	FILTER_RECIPE_ACTION,
} from '../actions/recipesActions';

const recipesReducer = (state = {}, action) => {
	const { type, data, error } = action;
	switch (type) {
		case GET_RECIPES_ACTION:
			return { items: data, error };
		case FILTER_RECIPE_ACTION:
			return { ...state, filtered: data, error };
		case GET_RECIPE_ACTION:
			return { selected: data };
		case PATCH_RECIPE_ACTION:
			return { ...state, selected: data, error };
		case DELETE_RECIPE_ACTION:
			return {
				...state, error,
				items: state.items ? state.items.filter(recipe => recipe.doc_id !== data) : []
			};
		case 'ERROR':
			return { ...state, error };
		default:
			return state;
	}
}

export default recipesReducer;
