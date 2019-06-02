import React, { Component } from 'react';
import './RecipeCreate.scss';
import Dropdown from '../../components/common/Dropdown/Dropdown';
import Switch from '../../components/common/Switch';
import Multiselect from '../../components/Multiselect';
import IngredientsList from '../../components/Ingredients/IngredientsList';
import Editor from '../../components/common/Editor';
import { postRecipe, getRecipes } from '../../store/actions/recipesActions';
import { connect } from 'react-redux';
import {
	RECIPE_TYPES_ARRAY,
	PREPARATION_TYPES_ARRAY,
	RATINGS_ARRAY,
	TIME_OF_DAY_ARRAY
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
			time_of_day: TIME_OF_DAY_ARRAY.map(({ value, checked }) => ({ value, checked })),
			portions: 0,
			type: 'vege',
		}

		this.handleRatingSelect = this.handleRatingSelect.bind(this);
		this.handleTestingSelect = this.handleTestingSelect.bind(this);
		this.handleTypeSelect = this.handleTypeSelect.bind(this);
		this.handlePreparationTypeSelect = this.handlePreparationTypeSelect.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePortionsChange = this.handlePortionsChange.bind(this);
		this.handleEditorChange = this.handleEditorChange.bind(this);
		this.handleTimeDay = this.handleTimeDay.bind(this);
		this.handleSaveClick = this.handleSaveClick.bind(this);
	}

	handleEditorChange(preparation) {
		this.setState({ preparation });
	}

	componentDidMount() {
		this.props.getRecipes();
	}

	handleRatingSelect(rating) { this.setState({ rating }); }
	handleTestingSelect(tested) { this.setState({ tested }); }
	handleTypeSelect(type) { this.setState({ type }); }
	handlePreparationTypeSelect(preparation_type) { this.setState({ preparation_type }); }
	handleNameChange(e) { this.setState({ name: e.target.value }); }
	handlePortionsChange(portions) { this.setState({ portions }); }
	handleTimeDay(index) {
		this.setState(state => {
			let { time_of_day } = state;
			time_of_day[index].checked = !time_of_day[index].checked;
			return { time_of_day };
		});
	}

	handleSaveClick() {
		const { history } = this.props;
		this.props.postRecipe(this.state).then(() => {
			history.push(ROUTES.RECIPES);
		});
	}

	isSaveDisabled() {
		const { name, ingredients } = this.state;
		return name === '' || ingredients.length === 0;
	}

	isVitarian() { return this.state.type === 'vit'; }

  render() {
		const {
			rating,
			type,
			preparation_type,
			ingredients,
			preparation,
			time_of_day,
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
							onSelect={this.handleRatingSelect}>
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
						<Switch label="Testowane" name="tested" onChange={this.handleTestingSelect} />
						<Dropdown
							options={RECIPE_TYPES_ARRAY}
							selected={type}
							onSelect={this.handleTypeSelect}>
						</Dropdown>
						<Dropdown
							options={PREPARATION_TYPES_ARRAY}
							selected={preparation_type}
							onSelect={this.handlePreparationTypeSelect}
							disabled={this.isVitarian()}>
						</Dropdown>
					</div>
					<div className="mobile-hidden"></div>
					<div className="name-wrapper">
						<input name="name" onChange={this.handleNameChange} placeholder="Mój przepis" />
					</div>
					<Multiselect onChange={this.handlePortionsChange} />
					<div className="ingredients-wrapper">
						<h2>Składniki</h2>
						<IngredientsList items={ingredients}/>
					</div>
					<div className="preparation-wrapper">
						<h2>Przygotowanie</h2>
						<Editor
							value={preparation}
							onChange={this.handleEditorChange}
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
