export const notify = ({ type, message }) => (dispatch) => {
	dispatch({ type: 'NOTIFY', data: { type, message } });
};

export const hide = () => (dispatch) => {
	dispatch({ type: 'HIDE_NOTIFY' });
};
