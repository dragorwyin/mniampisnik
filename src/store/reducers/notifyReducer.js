const initState = {
	type: null,
	message: null,
	visible: false,
};

const notifyReducer = (state = initState, action) => {
	const { type, message, toastType } = action;
	switch(type) {
		case 'NOTIFY':
			return {
				type: toastType,
				message: message,
				visible: true,
			};
		case 'HIDE_NOTIFY':
			return initState;
		default:
			return state;
	}
}

export default notifyReducer;
