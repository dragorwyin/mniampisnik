import withAuthorization from './authorization';
import withAuthentication from './authentication';
import context from './context';

const authUsers = ['USER', 'ADMIN'];
const isAuthenticated = authUser => !!authUser;
const canPass = authUser => {
	if (!authUser) { return false; }
	return authUsers.findIndex(authUser.role) > -1;
}

export {
	isAuthenticated,
	canPass,
	withAuthentication,
	withAuthorization,
	context
};
