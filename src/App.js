import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import './App.scss';
import SignIn from './components/SignIn/SignIn';
import Recipe from './components/Recipe/Recipe';
import RecipeEdit from './components/Recipe/RecipeEdit/RecipeEdit';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';
import Recipes from './components/Recipes/Recipes';

class App extends Component {
  render() {
    return (
			<main className="App">
			<Router>
				<Route exact path={ROUTES.HOME} component={SignIn} />
				<Route exact path={ROUTES.SIGN_IN} component={SignIn} />
				<Route path={ROUTES.RECIPE} component={Recipe} />
				<Route path={ROUTES.RECIPE_EDIT} component={RecipeEdit} />
				<Route path={ROUTES.RECIPE_CREATE} component={RecipeCreate} />
				<Route path={ROUTES.RECIPES} component={Recipes} />
			</Router>
			</main>
    );
  }
}

export default App;
