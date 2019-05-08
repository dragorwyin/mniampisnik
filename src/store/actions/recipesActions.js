export const GET_RECIPES_ACTION = 'GET_RECIPES';
export const GET_RECIPE_ACTION = 'GET_RECIPE';
export const FILTER_RECIPE_ACTION = 'FILTER_RECIPE';
export const DELETE_RECIPE_ACTION = 'DELETE_RECIPE';
export const PATCH_RECIPE_ACTION = 'PATCH_RECIPE';
export const POST_RECIPE_ACTION = 'POST_RECIPE';
export const POST_RECIPE_ACTION_ERR = 'POST_RECIPE_ERROR';

export const getRecipe = id => {
	return (dispatch, getState, { getFirebase, getFirestore } ) => {
		dispatch({ type: GET_RECIPES_ACTION, id });
	}
};

export const postRecipe = (recipe) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore()
		const recipes = getState().recipes;

		// defaults
		const defaultData = {
			ingredients: null,
			name: '',
			preparation: null,
			preparation_type: null,
			rating: 0,
			tested: false,
			portions: 0,
			time_of_day: null,
			type: null,
			user_id: getState().firebase.auth.uid,
			id: recipes.length + 1,
			created_at: new Date(),
		};

		// replace defaults
		const data = {
			...defaultData,
			...recipe,
		};

		// remove uneccessary data
		const validKeys = Object.keys(defaultData);
		Object.keys(data).forEach((key) => validKeys.includes(key) || delete data[key]);

		return new Promise((resolve) => {
			firestore.collection('recipes').add(data)
			.then(() => {
				dispatch({ type: POST_RECIPE_ACTION, data });
				resolve(data);
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
			const data = snapshot.docs.map(doc => doc._document.data.value());
			dispatch({ type: GET_RECIPES_ACTION, data });
		}).catch(error => {
			console.error(error);
		});
	}
};
