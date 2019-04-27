import React from 'react';
import { isAuthenticated } from './index';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from './context';
import { connect } from 'react-redux';
import Firebase from 'firebase';

const mapStateToProps = (state) => ({
	auth: state.firebase.auth
});

const withAuthorization = Component => {
	class withAuthorization extends React.Component {
		constructor(props) {
			super(props);
			this._isMounted = true;
		}

		componentDidMount() {
			this.listener = Firebase.auth().onAuthStateChanged(
				authUser => {
					if (!this._isMounted) { return; }
					if (!isAuthenticated(authUser)) {
						this.props.history.push(ROUTES.SIGN_IN);
					}
				}
			);
		}

		componentWillUnmount() {
			this.listener();
			this._isMounted = false;
		}

		render() {
			const { auth } = this.props;
			return (
				<AuthUserContext.Consumer>
					{ auth =>
						isAuthenticated(auth) ? <Component {...this.props} user={ auth } /> : null
					}
				</AuthUserContext.Consumer>
			);
		}
	}

	return connect(mapStateToProps)(withAuthorization);
};

export default withAuthorization;
