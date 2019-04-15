import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../../constants/routes';
import './styles.scss';

class Navigation extends Component {

	onLogoutClick = () => {
		this.props.firebase.logout();
		this.props.history.push(ROUTES.SIGN_IN);
	}

	render() {
		return (
			<div role="navigation">
				<Link to={ROUTES.SEARCH}>
					<img src={ process.env.PUBLIC_URL + 'images/icons/tag.svg' } alt="search"></img>
				</Link>
				<Link to={ROUTES.RECIPE_CREATE}>
					<button className="white button icon">
						<img src={ process.env.PUBLIC_URL + 'images/icons/plus.svg' } alt="plus"></img>
						<span>Dodaj</span>
					</button>
				</Link>
				<Link to={ROUTES.RECIPES}>
					<img src={ process.env.PUBLIC_URL + 'images/icons/list.svg' } alt="list"></img>
				</Link>
			</div>
		);
	}

}

export default Navigation;
