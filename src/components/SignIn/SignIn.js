import React, { Component } from 'react';
import './SignIn.scss';

class SignIn extends Component {
  render() {
    return (
			<main id="login">
        <div className="container">
          <h1>
            <span className="secondary-font">Mniam</span>
            Piśnik
          </h1>
          <img src={ process.env.PUBLIC_URL + 'images/diet.svg' } alt="diet graphics" />
          <form>
            <div class="form--input">
              <img class="icon" src={ process.env.PUBLIC_URL + 'images/icons/email.svg' } alt="email" />
              <input name="email" type="email" placeholder="my-email@email.com" />
              <div class="errors"></div>
            </div>
            <div class="form--input">
              <img class="icon" src={ process.env.PUBLIC_URL + 'images/icons/lock.svg' } alt="password lock" />
              <input name="password" type="password" placeholder="*********" />
              <div class="errors"></div>
            </div>
            <button type="submit" className="button primary">ZALOGUJ SIĘ</button>
          </form>
        </div>
      </main>
    );
  }
}

export default SignIn;
