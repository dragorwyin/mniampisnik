export const GET_RECIPES_ACTION = 'GET_RECIPES';
export const GET_RECIPE_ACTION = 'GET_RECIPE';
export const FILTER_RECIPE_ACTION = 'FILTER_RECIPE';
export const DELETE_RECIPE_ACTION = 'DELETE_RECIPE';
export const PATCH_RECIPE_ACTION = 'PATCH_RECIPE';
export const POST_RECIPE_ACTION = 'POST_RECIPE';
export const POST_RECIPE_ACTION_ERR = 'POST_RECIPE_ERROR';

const generateID = () => '_' + Math.random().toString(36).substr(2, 9);

export const getRecipe = id => {
	return (dispatch, getState, { getFirebase, getFirestore } ) => {
		dispatch({ type: GET_RECIPES_ACTION, id });
	}
};

export const postRecipe = (recipe) => {
	return (dispatch, getState, { getFirestore }) => {
		const {
			ingredients = null,
			name = '',
			preparation = null,
			preparation_type = null,
			rating = 0,
			tested = false,
			portions = 0,
			time_of_day = null,
			type = null,
		} = recipe;

		const id = generateID();
		const user_id = getState().firebase.auth.uid;

		const firestore = getFirestore();

		return new Promise((resolve) => {
			firestore.collection('recipes').add({
				id,
				user_id,
				ingredients,
				name,
				preparation,
				portions,
				preparation_type,
				rating,
				tested,
				time_of_day,
				created_at: new Date(),
				type,
			}).then(() => {
				dispatch({ type: POST_RECIPE_ACTION, id });
				resolve(id);
			}).catch(error => {
				dispatch({type: POST_RECIPE_ACTION_ERR, error})
			});
		});
	}
};

export const patchRecipe = id => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({ type: PATCH_RECIPE_ACTION, id });
	}
};

export const getRecipes = () => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		firestore.collection('recipes').get()
		.then(snapshot => {
			const recipes = snapshot.docs.map(doc => doc._document.data.value());
			dispatch({ type: GET_RECIPES_ACTION, recipes });
		}).catch(error => {
			console.error(error);
		});
	}
};
