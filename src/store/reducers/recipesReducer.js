import {
	GET_RECIPE_ACTION,
	POST_RECIPE_ACTION,
	PATCH_RECIPE_ACTION,
	DELETE_RECIPE_ACTION
} from '../actions/recipesActions';

import { initState } from './recipes-mocks';

const recipesReducer = (state = initState, action) => {
	switch (action.type) {
		case GET_RECIPE_ACTION:
			return state.find(recipe => recipe.id === action.id);
		case POST_RECIPE_ACTION:
			console.log('done');
			return [...state, action];
		case PATCH_RECIPE_ACTION:
			return state.map(recipe => {
				if (recipe.id === action.id) { recipe = action; }
				return recipe;
			});
		case DELETE_RECIPE_ACTION:
			return state.filter(recipe => recipe.id !== action.id);
		default:
			return state;
	}
}

export default recipesReducer;
