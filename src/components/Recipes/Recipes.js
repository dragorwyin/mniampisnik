import React, { Component } from 'react';
import './Recipes.scss';
import { withAuthentication } from '../Auth';

class Recipes extends Component {

  render() {
    return (
		<h1>Recipes</h1>
    );
	}

}

export default withAuthentication(Recipes);
