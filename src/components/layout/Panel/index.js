import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { compose } from 'recompose';
import './styles.scss';
import { withAuthentication, withAuthorization } from '../../Auth';

const composeComponent = Component => compose(
	withAuthentication,
	withAuthorization
	)(Component)

const Panel = ({component: BaseComponent, ...rest}) => {

	const HeaderComp = composeComponent(Header);
	const NavigationComp = composeComponent(Navigation);
	const Component = composeComponent(BaseComponent);

  return (
    <Route {...rest} render={ props => (
      <>
        <HeaderComp { ...props } { ...rest } />
				<NavigationComp { ...props } { ...rest } />
				<main className="container" id="panel">
					<Component {...props} { ...rest } />
				</main>
      </>
    )} />
  )
};

export default Panel;
