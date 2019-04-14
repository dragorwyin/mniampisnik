import React from 'react';
import { isAuthenticated } from './index';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from './context';

const withAuthorization = Component => {
  class WithAuthorization extends React.Component {

		constructor(props) {
			super(props);
			this._isMounted = true;
		}

		componentDidMount() {
			this.listener = this.props.firebase.auth.onAuthStateChanged(
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
      return (
				<AuthUserContext.Consumer>
					{ authUser =>
            isAuthenticated(authUser) ? <Component {...this.props} user={ authUser } /> : null
          }
				</AuthUserContext.Consumer>
			);
    }
  }

  return WithAuthorization;
};

export default withAuthorization;
