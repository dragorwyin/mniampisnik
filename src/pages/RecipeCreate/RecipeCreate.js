import React, { Component } from 'react';
import './RecipeCreate.scss';
import Dropdown from '../../components/common/Dropdown/Dropdown';
import Switch from '../../components/common/Switch';
import Multiselect from '../../components/common/Multiselect';
import IngredientsList from '../../components/Ingredients/IngredientsList';
import Editor from '../../components/common/Editor';
import { postRecipe, getRecipes } from '../../store/actions/recipesActions';
import { connect } from 'react-redux';
import {
	RECIPE_TYPES_ARRAY,
	PREPARATION_TYPES_ARRAY,
	RATINGS_ARRAY,
	TIME_OF_DAY_ARRAY,
	DISH_TYPE_ARRAY,
} from '../../constants/recipes';
import * as ROUTES from '../../constants/routes';

class RecipeCreate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			ingredients: [],
			name: '',
			preparation: '',
			preparation_type: 'cook',
			rating: null,
			tested: false,
			dish_type: 'dry_dish',
			time_of_day: TIME_OF_DAY_ARRAY.map(({ value, checked }) => ({ value, checked })),
			portions: 0,
			type: 'vege',
		}
	}

	componentDidMount() {
		this.props.getRecipes();
	}

	handleSelect = (type, value) => { this.setState({ [type]: value }) }

	handleTimeDay = (index) => {
		this.setState(state => {
			let { time_of_day } = state;
			time_of_day[index].checked = !time_of_day[index].checked;
			return { time_of_day };
		});
	}

	handleSaveClick = () => {
		const { history } = this.props;
		const { ingredients } = this.state;
		if (!ingredients[ingredients.length - 1]) ingredients.pop();
		this.props.postRecipe(this.state).then(() => {
			history.push(ROUTES.RECIPES);
		});
	}

	isSaveDisabled = () => {
		const { name, ingredients } = this.state;
		return name === '' || ingredients.length === 0;
	}

	isVitarian = () => { return this.state.type === 'vit'; }

  render() {
		const {
			rating,
			type,
			preparation_type,
			ingredients,
			preparation,
			time_of_day,
			dish_type,
		} = this.state;

    return (
			<div id="createRecipe" className="recipe">
				<div className="top">
					<div className="left">
						<h3>
							<span>Nowy Przepis</span>
						</h3>
						<Dropdown
							options={RATINGS_ARRAY}
							selected={rating}
							onSelect={(value) => this.handleSelect('rating', value)}>
						</Dropdown>
					</div>
					<div className="right">
						<button
							type="button"
							className="primary small button"
							disabled={this.isSaveDisabled()}
							onClick={this.handleSaveClick}>
								ZAPISZ
						</button>
					</div>
				</div>

				<div className="options-grid">
					<div className="selectors">
						<Switch label="Testowane" name="tested" onChange={(value) => this.handleSelect('tested', value)} />
						<Dropdown
							options={RECIPE_TYPES_ARRAY}
							selected={type}
							onSelect={(value) => this.handleSelect('type', value)}>
						</Dropdown>
						<Dropdown
							options={PREPARATION_TYPES_ARRAY}
							selected={preparation_type}
							onSelect={(value) => this.handleSelect('preparation_type', value)}
							disabled={this.isVitarian()}>
						</Dropdown>
						<Dropdown
							options={DISH_TYPE_ARRAY}
							selected={dish_type}
							onSelect={(value) => this.handleSelect('dish_type', value)}>
						</Dropdown>
					</div>
					<div className="mobile-hidden"></div>
					<div className="name-wrapper">
						<input
							name="name"
							onChange={(e) => this.handleSelect('name', e.target.value)}
							placeholder="Mój przepis"
						/>
					</div>
					<Multiselect onChange={(value) => this.handleSelect('portions', value)} />
					<div className="ingredients-wrapper">
						<h2>Składniki</h2>
						<IngredientsList items={ingredients} onChange={(value) => this.handleSelect('ingredients', value)}/>
					</div>
					<div className="preparation-wrapper">
						<h2>Przygotowanie</h2>
						<Editor
							value={preparation}
							onChange={(value) => this.handleSelect('preparation', value)}
						/>
					</div>
				</div>
				<div className="time-of-day">
					{
						time_of_day.map(({ checked, value }, index) => (
							<label className="checkbox" key={value}>
								<input
									key={value}
									type="checkbox"
									name={TIME_OF_DAY_ARRAY[index].name}
									id={value+'checkbox'}
									checked={checked}
									onChange={() => this.handleTimeDay(index)}/>
								<div className="checkbox-control"></div>
								{TIME_OF_DAY_ARRAY[index].name}
							</label>
						))
					}
				</div>
				<div className="pull-right on-mobile-only">
					<button
						type="button"
						className="primary small button"
						disabled={this.isSaveDisabled()}
						onClick={this.handleSaveClick}>
							ZAPISZ
					</button>
				</div>
			</div>
    );
  }
}

const mapStateToProps = state => ({ auth: state.firebase.auth, recipes: state.recipes });

const mapDispatchToProps = (dispatch) => ({
	postRecipe: (recipe) => dispatch(postRecipe(recipe)),
	getRecipes: () => dispatch(getRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCreate);
