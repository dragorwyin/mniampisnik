export const GET_RECIPES_ACTION = 'GET_RECIPES';
export const GET_RECIPE_ACTION = 'GET_RECIPE';
export const FILTER_RECIPE_ACTION = 'FILTER_RECIPE';
export const DELETE_RECIPE_ACTION = 'DELETE_RECIPE';
export const PATCH_RECIPE_ACTION = 'PATCH_RECIPE';
export const POST_RECIPE_ACTION = 'POST_RECIPE';
export const POST_RECIPE_ACTION_ERR = 'POST_RECIPE_ERROR';

export const getRecipe = doc_id => {
	return (dispatch, getState, { getFirestore } ) => {
		const firestore = getFirestore();
		const userUid = getState().auth.user.uid;

		return new Promise((resolve) => {
			firestore.collection('users').doc(userUid).collection('recipes').doc(doc_id).get()
			.then(snapshot => {
				const data = snapshot.data();
				dispatch({ type: GET_RECIPE_ACTION, data });
				resolve(data);
			}).catch(error => {
				dispatch({ type: 'NOTIFY', message: error.message, toastType: 'error' });
			});
		});
	}
};

export const postRecipe = (recipe) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore()
		const recipes = getState().recipes.items;
		const userUid = getState().auth.user.uid;

		// defaults
		const defaultData = {
			ingredients: null,
			name: '',
			preparation: null,
			preparation_type: null,
			dish_type: null,
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
			const docRef = firestore.collection(`users/${userUid}/recipes`);

			docRef.onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
				if (snapshot.metadata.fromCache) resolve();
			});

			docRef.add(data)
			.then(() => {
				resolve(data);
			}).catch(error => {
				dispatch({ type: 'NOTIFY', message: error.message, toastType: 'error' });
			});
		});
	}
};

export const patchRecipe = (doc_id, recipe) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore()
		const userUid = getState().auth.user.uid;

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
			dish_type: null,
			user_id: getState().firebase.auth.uid,
			id: 1,
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
			const docRef = firestore.collection('users').doc(userUid).collection('recipes').doc(doc_id);

			docRef.onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
				if (snapshot.metadata.fromCache) {
					dispatch({ type: PATCH_RECIPE_ACTION, data });
					resolve(data);
				}
			});

			docRef.set(data).then(() => {
				dispatch({ type: PATCH_RECIPE_ACTION, data });
				resolve(data);
			}).catch(error => {
				dispatch({ type: 'NOTIFY', message: error.message, toastType: 'error' });
			});
		});
	}
};

export const getRecipes = () => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const userUid = getState().auth.user.uid;

		firestore.collection(`users/${userUid}/recipes`).get()
		.then(snapshot => {
			const data = snapshot.docs.map(doc => ({
				...doc.data(),
				doc_id: doc.id,
			})).sort((a, b) => a.id > b.id ? 1 : -1);
			dispatch({ type: GET_RECIPES_ACTION, data });
		}).catch(error => {
			dispatch({ type: 'NOTIFY', message: error.message, toastType: 'error' });
		});
	};
};

export const deleteRecipe = (doc_id) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const userUid = getState().auth.user.uid;

		const docRef = firestore.collection('users').doc(userUid).collection('recipes').doc(doc_id);

		return new Promise((resolve) => {
			docRef.delete()
				.then(() => {
					resolve();
					dispatch({ type: DELETE_RECIPE_ACTION, data: doc_id });
				}).catch(error => {
					dispatch({ type: 'NOTIFY', message: error.message, toastType: 'error' });
				});
		});
	};
};

export const searchRecipes = ({
	preparation_types,
	ratings,
	dish_types,
	recipe_types,
	time_of_day,
	tested,
	name,
}) => {
	return (dispatch, getState) => {
		const recipes = getState().recipes.items;

		const filter = (filters, value) => {
			if (filters.every(({ selected }) => selected === false)) return true;
			return filters.some(filter => {
				let mappedValue = value === null ? 'null' : value;
				return filter.selected && filter.value === mappedValue;
			})
		};

		const filterName = (itemName) => {
			return name === '' || itemName.toLowerCase().includes(name.toLowerCase());
		}

		const filterTimeOfDay = (itemTime) => {
			if (time_of_day.every(({ checked }) => checked === false)) return true;
			return itemTime.some(
				time =>
					time_of_day.some(
						filter => filter.value === time.value && filter.checked && time.checked
					)
			);
		};

		const filterTested = (tested, itemTested) => {
			if (tested.every(({ selected }) => selected === false)) return true;
			const blah = tested
				.map(filter => {
					if (filter.value === 'true') return { ...filter, value: true };
					if (filter.value === 'false') return { ...filter, value: false };
					return {...filter, value: filter.value };
				})
				.some(filter => filter.selected && filter.value === itemTested);
			return blah;
		};

		const data = recipes.filter((item) => {
			return (
				filter(recipe_types, item.type)
				&& filter(preparation_types, item.preparation_type)
				&& filter(ratings, item.rating)
				&& filter(dish_types, item.dish_type)
				&& filterName(item.name)
				&& filterTested(tested, item.tested)
				&& filterTimeOfDay(item.time_of_day)
		)});

		dispatch({ type: FILTER_RECIPE_ACTION, data });
	}
};
