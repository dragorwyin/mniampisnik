export const signIn = ({ email, password }) => (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();

	dispatch({ type: 'LOADING' });

	return new Promise((resolve) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(auth => {
			dispatch({ type: 'LOGIN_SUCCESS', user: auth.user })
			resolve(auth.user);
		})
		.catch(error => {
			dispatch({ type: 'LOGIN_ERROR', error });
		});
	});
};


export const setAuthUser = (user) => (dispatch) => {
	dispatch({ type: 'LOGIN_SUCCESS', user });
};

export const logout = () => (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();

	firebase.auth().signOut().then(() => {
		dispatch({ type: 'LOGOUT_SUCCESS' });
	});
};
