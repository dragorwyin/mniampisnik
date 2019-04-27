export const signIn = ({ email, password }) => (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();

	dispatch({ type: 'LOADING' });

	return new Promise((resolve) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(user => {
			dispatch({ type: 'LOGIN_SUCCESS', user })
			resolve(user);
		})
		.catch(error => {
			dispatch({ type: 'LOGIN_ERROR', error });
		});
	});
};

export const logout = () => (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();

	firebase.auth().signOut().then(() => {
		dispatch({ type: 'LOGOUT_SUCCESS' });
	});
};
