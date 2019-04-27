const initState = {
	error: null
};

const authReducer = (state = initState, action) => {
	switch(action.type) {
		case 'LOGIN_ERROR':
			console.log("LOGIN ERROR");
			return {
				...state,
				error: action.error.message
			};
		case 'LOGIN_SUCCESS':
			console.log('LOGIN_SUCCESS');
			return {
				...state,
				error: null
			};
		case 'LOGOUT_SUCCESS':
			console.log('SIGN_OUT_SUCCESS');
			return {
				...state,
				error: null
			};
		case 'LOADING':
			console.log('loading...');
			break;
		default:
			return state;
	}

	return state;
}

export default authReducer;
