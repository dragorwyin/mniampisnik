const initState = {
	error: null,
	user: null,
	loading: false,
};

const authReducer = (state = initState, action) => {
	switch(action.type) {
		case 'LOGIN_ERROR':
			return {
				...state,
				error: action.error.message,
				loading: false,
			};
		case 'LOGIN_SUCCESS':
			return {
				error: null,
				user: action.user,
				loading: false,
			};
		case 'LOGOUT_SUCCESS':
			return {
				user: null,
				error: null,
				loading: false,
			};
		case 'LOADING':
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}

export default authReducer;
