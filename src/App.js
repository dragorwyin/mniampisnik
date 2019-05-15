import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import './App.scss';
import SignIn from './pages/SignIn/SignIn';
import Recipe from './pages/Recipe/Recipe';
import RecipeEdit from './pages/RecipeEdit/RecipeEdit';
import RecipeCreate from './pages/RecipeCreate/RecipeCreate';
import Recipes from './pages/Recipes/Recipes';
import ProtectedPanel from './pages/layout/ProtectedPanel';
// import { withAuthentication } from './components/Auth';

class App extends Component {

  render() {
    return (
			<main className="App">
			<Router>
				<Route exact path={ROUTES.HOME} component={SignIn} />
				<Route exact path={ROUTES.SIGN_IN} component={SignIn} />
				<ProtectedPanel exact path={ROUTES.RECIPE} component={Recipe} />
				<ProtectedPanel exact path={ROUTES.RECIPE_EDIT} component={RecipeEdit} />
				<ProtectedPanel path={ROUTES.RECIPE_CREATE} component={RecipeCreate} />
				<ProtectedPanel path={ROUTES.RECIPES} component={Recipes} />
			</Router>
			</main>
    );
	}
}

export default App;
