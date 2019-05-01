import React, { Component } from 'react';
import './Recipes.scss';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import Dropdown from '../../components/common/Dropdown/Dropdown';
import IngredientsList from '../../components/Ingredients/IngredientsList';
import Multiselect from '../../components/Multiselect';

const options = [
	{ icon: 'vege.svg', name: 'Vege', value: 'vege' },
	{ icon: 'vit.svg', name: 'Vit', value: 'vit' },
	{ icon: 'vegan.svg', name: 'Vegan', value: 'vegan' },
];

const ingredients = ['blah', 'blah2', 'blah3 zxc zxc zxc as dd qw eqw dqwd qwd qwd qwd q ds ad sz dsad qwe qwe qw '];

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
				<div className="dropdowns">
					<Dropdown options={options} selected="vit" onSelect={(value) => { console.log(value); }}></Dropdown>
				</div>
				<div className="ingredients">
					<IngredientsList items={ingredients}/>
				</div>

				<Multiselect onChange={index => console.log(index)} />
			</div>
    );
	}

}

const mapStateToProps = state => ({
	recipes: state.recipes
});

export default connect(mapStateToProps)(Recipes);
// export default connect(mapStateToProps)(withAuthentication(Recipes));
