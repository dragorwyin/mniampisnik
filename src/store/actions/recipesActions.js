export const GET_RECIPES_ACTION = 'GET_RECIPES';
export const GET_RECIPE_ACTION = 'GET_RECIPE';
export const FILTER_RECIPE_ACTION = 'FILTER_RECIPE';
export const DELETE_RECIPE_ACTION = 'DELETE_RECIPE';
export const PATCH_RECIPE_ACTION = 'PATCH_RECIPE';
export const POST_RECIPE_ACTION = 'POST_RECIPE';

export const getRecipe = id => {
	return (dispatch, getState, { getFirebase, getFirestore } ) => {
		dispatch({ type: GET_RECIPES_ACTION, id });
	}
};

export const postRecipe = id => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({ type: POST_RECIPE_ACTION, id });
	}
};

export const patchRecipe = id => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({ type: PATCH_RECIPE_ACTION, id });
	}
};

export const getRecipes = () => {
	// return (dispatch, getState) => {
	// 	dispatch({ type: GET_RECIPES_ACTION });
	// }
};
