import React, { Component } from 'react';
import './SignIn.scss';

class SignIn extends Component {
  render() {
    return (
			<div id="login">
        <div className="container">
          <h1>
            <span className="secondary-font">Mniam</span>
            Piśnik
          </h1>
          <img src={ process.env.PUBLIC_URL + 'images/diet.svg' } alt="diet graphics" />
          <form>
            <div className="form--input">
              <img className="icon" src={ process.env.PUBLIC_URL + 'images/icons/email.svg' } alt="email" />
              <input name="email" type="email" placeholder="my-email@email.com" />
              <div className="errors"></div>
            </div>
            <div className="form--input">
              <img className="icon" src={ process.env.PUBLIC_URL + 'images/icons/lock.svg' } alt="password lock" />
              <input name="password" type="password" placeholder="*********" />
              <div className="errors"></div>
            </div>
            <button type="submit" className="button primary">ZALOGUJ SIĘ</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
