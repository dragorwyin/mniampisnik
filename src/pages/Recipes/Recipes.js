import React, { Component } from 'react';
import './Recipes.scss';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { getRecipes, searchRecipes } from '../../store/actions/recipesActions';
import Loader from '../../components/common/Loader';
import SearchRecipes from './SearchRecipes/';

class Recipes extends Component {

	constructor(props) {
		super(props);
		this.state = {
			recipes: [],
		};
	}

	componentDidMount() {
		this.props.getRecipes();
	}

	onSearch = (filters) => {
		this.props.searchRecipes(filters);
	}

	areProperRecipes(recipes) {
		return recipes && Array.isArray(recipes);
	}

	loader() {
		return <Loader loading={true} fullpage={true} />;
	}

  render() {
		const { recipes, filteredRecipes } = this.props;
		const items = filteredRecipes ? filteredRecipes : recipes;
    return (
			<div id="recipes">
				{ this.areProperRecipes(items) ?
					(<>
						<h3 className="secondary-font">Przepisy</h3>
						<div className="list">
							{ items.map(item => {
								return (
									<ListItem {...item} key={item.id}></ListItem>
								)
							})}
						</div>
					</>) : this.loader()
				}
				<SearchRecipes onSearch={this.onSearch} />
			</div>
    );
	}
}

const mapStateToProps = state => ({
	recipes: state.recipes.items,
	filteredRecipes: state.recipes.filtered,
});

const mapDispatchToProps = (dispatch) => ({
	getRecipes: () => dispatch(getRecipes()),
	searchRecipes: (filters) => dispatch(searchRecipes(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
