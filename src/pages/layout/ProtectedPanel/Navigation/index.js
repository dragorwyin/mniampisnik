import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../../constants/routes';
import { connect } from 'react-redux';
import { logout } from '../../../../store/actions/authActions';
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

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(Navigation);
