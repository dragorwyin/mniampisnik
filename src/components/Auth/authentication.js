import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import Loader from './loader';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

			this._isMounted = true;
      this.state = {
				authUser: null,
				loading: true,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
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
        <AuthUserContext.Provider value={this.state.authUser}>
					<Loader loading={this.state.loading} />
          <Component {...this.props} />
        </AuthUserContext.Provider>
				</>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
