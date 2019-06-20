import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from './Header';
import './styles.scss';
import { connect } from 'react-redux';
import Loader from '../../../components/common/Loader';
import * as ROUTES from '../../../constants/routes';
import preval from 'preval.macro'

export const isAuth = auth => auth && auth.uid;

const ProtectedPanel = ({component: Component, loading, auth, ...rest}) => {
  return (
    <Route {...rest} render={ props => (
			!isAuth(auth) ? (
				<Redirect to={{ pathname: ROUTES.SIGN_IN }} />
				) : (
					<>
						<Loader loading={loading} fullpage={true} />
						<Header {...props} {...rest} />
						<main className="container" id="panel">
							<Component {...props} {...rest} />
						</main>
						<small className="version">
							Wersja z: {
								preval`module.exports = new Date().toLocaleString('pl-PL', { hour12: false });`
							}
						</small>
					</>
				)
    )} />
  )
};

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	loading: state.auth.loading,
});

export default connect(mapStateToProps)(ProtectedPanel);
