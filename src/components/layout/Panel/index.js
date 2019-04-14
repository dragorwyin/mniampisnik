import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
import './styles.scss';

const composeComponent = Component => compose(
	withRouter,
	withFirebase,
	)(Component)

const Panel = ({component: BaseComponent, ...rest}) => {

	// if (props.authUser) {
	// 	this.props.history.push(ROUTES.HOME);
	// 	return;
	// }

	const HeaderComp = composeComponent(Header);
	const NavigationComp = composeComponent(Navigation);
	const Component = composeComponent(BaseComponent);

  return (
    <Route {...rest} render={props => (
      <div className="DefaultLayout">
        <HeaderComp { ...props } />
				<NavigationComp { ...props } />
				<main className="container" id="panel">
					<Component {...props} />
				</main>
      </div>
    )} />
  )
};


export default Panel;
