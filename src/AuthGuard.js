import React, { Component } from 'react';
import * as ROUTES from './constants/routes';

class AuthGuard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			authUser: null
		};
	}

	componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
				: this.setState({ authUser: null });

			if (!authUser) {
				this.props.history.push(ROUTES.SIGN_IN)
			}
    });
	}

	componentWillUnmount() {
		this.listener();
	}

	render() {
		return <>
			{ !this.state.authUser &&
				<div className="auth loading">
					<div>
						<div className="cm-spinner"></div>
					</div>
				</div> }
		</>;
	}
}

export default AuthGuard;
