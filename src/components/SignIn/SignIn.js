import React, { Component } from 'react';
import './SignIn.scss';
import * as ROUTES from '../../constants/routes';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import Loader from '../common/Loader';

const INITIAL_STATE = {
	email: '',
	password: '',
};

class SignIn extends Component {

	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}

  onSubmit = event => {
		event.preventDefault();
		const { email, password } = this.state;

    this.props.signIn({email, password});
      // .then(() => {
			// 	this.setState({ ...INITIAL_STATE });
			// 	this.props.history.push(ROUTES.RECIPES);
      // })
      // .catch(error => {
      //   this.setState({ error });
      // });

    event.preventDefault();
  };

  render() {
		const { email, password } = this.state;
		const { error, loading } = this.props;
		const isInvalid = password === '' || email === '';

    return (
			<div id="login">
				<div className="container relative">
					<Loader loading={loading} />
					<h1>
						<span className="secondary-font">Mniam</span>Piśnik
					</h1>
					<img src={ process.env.PUBLIC_URL + 'images/diet.svg' } alt="diet graphics" />
					<form onSubmit={this.onSubmit}>
						{ error && <div className="alert error">{ error }</div> }
						<div className="form--input">
							<img className="icon" src={ process.env.PUBLIC_URL + 'images/icons/email.svg' } alt="email" />
							<input name="email" type="email" placeholder="my-email@email.com" onChange={this.onChange} value={email} />
							<div className="errors"></div>
						</div>
						<div className="form--input">
							<img className="icon" src={ process.env.PUBLIC_URL + 'images/icons/lock.svg' } alt="password lock" />
							<input name="password" type="password" placeholder="*********" onChange={this.onChange} value={password} />
							<div className="errors"></div>
						</div>
						<button type="submit" className="button primary" disabled={isInvalid} >ZALOGUJ SIĘ</button>
					</form>
				</div>
			</div>
    );
  }
}

// Map Props from store
const mapStateToProps = (state) => ({
	error: state.auth.error,
	loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => ({
	signIn: ({ email, password }) => dispatch(signIn({ email, password }))
});

export default compose(
	withRouter
)(connect(mapStateToProps, mapDispatchToProps)(SignIn));
