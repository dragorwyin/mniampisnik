import React, { Component } from 'react';
import './Recipes.scss';
// import { withAuthentication } from '../Auth';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class Recipes extends Component {

  render() {
		const { recipes } = this.props;
    return (
			<div>
				<h3 className="secondary-font">Przepisy</h3>
				<div className="list">
					{ recipes && recipes.map(recipe => {
						return (
							<ListItem {...recipe} key={recipe.id}></ListItem>
						)
					})}
				</div>
			</div>
    );
	}

}

const mapStateToProps = state => ({
	recipes: state.recipes
});

export default connect(mapStateToProps)(Recipes);
// export default connect(mapStateToProps)(withAuthentication(Recipes));
