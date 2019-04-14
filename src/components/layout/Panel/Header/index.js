import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../../constants/routes';
import './styles.scss';

class Header extends Component {

	onLogoutClick = () => {
		this.props.firebase.logout();
		this.props.history.push(ROUTES.SIGN_IN);
	}

	render() {
		return (
			<header>
				<div className="container">
					<ul className="left-nav">
						<li>
							<Link to={ROUTES.RECIPES}>
								<img src={ process.env.PUBLIC_URL + 'images/icons/list.svg' } alt="list"></img>
								<span>Przepisy</span>
							</Link>
						</li>
						<li>
							<Link to={ROUTES.SEARCH}>
								<img src={ process.env.PUBLIC_URL + 'images/icons/tag.svg' } alt="tags"></img>
								<span>Szukaj</span>
							</Link>
						</li>
					</ul>
					<ul className="right-nav">
						<li>
							<div className="logout" onClick={this.onLogoutClick}>
								<img src={ process.env.PUBLIC_URL + 'images/icons/rocket.svg' } alt="rocket"></img>
								<span>Wyloguj</span>
							</div>
						</li>
					</ul>
				</div>
			</header>
		);
	}

}

export default Header;
