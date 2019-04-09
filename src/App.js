import React, { Component } from 'react';
import './App.scss';
import SignIn from './components/SignIn/SignIn';

class App extends Component {
  render() {
    return (
      <div className="App">
				<SignIn />
      </div>
    );
  }
}

export default App;
