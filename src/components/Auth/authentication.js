import React from 'react';

import AuthUserContext from './context';
import Loader from './loader';
import { connect } from 'react-redux';
import Firebase from 'firebase';

const mapStateToProps = (state) => ({
	auth: state.firebase.auth
});

const withAuthentication = Component => {
	class withAuthentication extends React.Component {
		constructor(props) {
			super(props);

			this._isMounted = true;
			this.state = {
				authUser: null,
				loading: true,
			};
		}

		componentDidMount() {
			this.listener = Firebase.auth().onAuthStateChanged(
				authUser => {
					if (!this._isMounted) { return; }
					this.setState({loading: false});
					authUser
						? this.setState({ authUser })
						: this.setState({ authUser: null });
				},
			);
		}

		componentWillUnmount() {
			this._isMounted = false;
			this.listener();
		}

		render() {
			return (
				<>
				<AuthUserContext.Provider value={this.props.auth}>
					<Loader loading={this.state.loading} />
					<Component {...this.props} />
				</AuthUserContext.Provider>
				</>
			);
		}
	}

	return connect(mapStateToProps)(withAuthentication);
};

export default withAuthentication;
