import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../../constants/routes';
import { connect } from 'react-redux';
import { logout } from '../../../../store/actions/authActions';
import './styles.scss';

class Header extends Component {

	onLogoutClick = () => {
		this.props.logout();
		this.props.history.push(ROUTES.SIGN_IN);
	}

	render() {
		return (
			<header>
				<div className="container">
					<ul className="left-nav">
						<li className="logo">
							<span className="secondary-font">Mniam</span>Piśnik
						</li>
						<li>
							<Link to={ROUTES.RECIPES}>
								<img src={ process.env.PUBLIC_URL + '/images/icons/list.svg' } alt="list"></img>
								<span>Przepisy</span>
							</Link>
						</li>
						<li>
						<Link to={ROUTES.RECIPE_CREATE}>
							<img src={ process.env.PUBLIC_URL + '/images/icons/plus.svg' } alt="plus" className="white"></img>
							<span>Dodaj</span>
						</Link>
						</li>
					</ul>
					<ul className="right-nav">
						<li>
							<div className="logout" onClick={this.onLogoutClick}>
								<img src={ process.env.PUBLIC_URL + '/images/icons/rocket.svg' } alt="rocket"></img>
								<span>Wyloguj</span>
							</div>
						</li>
					</ul>
				</div>
			</header>
		);
	}

}

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout())
});


export default connect(null, mapDispatchToProps)(Header);
