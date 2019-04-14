import React, { Component } from 'react';
import './Recipes.scss';

class Recipes extends Component {

	constructor(props) {
		super(props);
		console.log(props);
	}

  render() {
    return (
		<h1>Recipes</h1>
    );
  }
}

export default Recipes;
