import React, { Component } from 'react';
import './SignIn.scss';
import * as ROUTES from '../../constants/routes';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
	email: '',
	password: '',
	error: '',
};

class SignInFormBase extends Component {

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

    this.props.firebase
      .login(email, password)
      .then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push(ROUTES.RECIPES);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {

		const { email, password, error } = this.state;
		const isInvalid = password === '' || email === '';

    return (
			<form onSubmit={this.onSubmit}>
				{ error && <div className="alert error">{ error.message }</div> }
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
    );
  }
}

const SignIn = () => (
	<div id="login">
		<div className="container">
			<h1>
				<span className="secondary-font">Mniam</span>Piśnik
			</h1>
			<img src={ process.env.PUBLIC_URL + 'images/diet.svg' } alt="diet graphics" />
			<SignInForm/>
		</div>
	</div>
)

const SignInForm = compose(
	withRouter,
	withFirebase
	)(SignInFormBase);

export default SignIn;
