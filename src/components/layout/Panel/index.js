import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
import './styles.scss';
import AuthGuard from '../../../AuthGuard';

const composeComponent = Component => compose(
	withRouter,
	withFirebase,
	)(Component)

const Panel = ({component: BaseComponent, ...rest}) => {

	const HeaderComp = composeComponent(Header);
	const NavigationComp = composeComponent(Navigation);
	const Component = composeComponent(BaseComponent);
	const AuthGuardComp = composeComponent(AuthGuard);

  return (
    <Route {...rest} render={ props => (
      <>
        <HeaderComp { ...props } { ...rest } />
				<AuthGuardComp { ...props } { ...rest } />
				<NavigationComp { ...props } { ...rest } />
				<main className="container" id="panel">
					<Component {...props} { ...rest } />
				</main>
      </>
    )} />
  )
};

export default Panel;
