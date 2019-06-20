const initState = {
	error: null,
	user: null,
	loading: false,
};

const authReducer = (state = initState, action) => {
	const { type, data } = action;
	switch(type) {
		case 'LOGIN_ERROR':
			return {
				...state,
				error: data.message,
				loading: false,
			};
		case 'LOGIN_SUCCESS':
			return {
				error: null,
				user: data,
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
