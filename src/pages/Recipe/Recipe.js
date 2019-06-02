import React, { Component } from 'react';
import './Recipe.scss';
import { getRecipe, getRecipes } from '../../store/actions/recipesActions';
import { connect } from 'react-redux';
import {
	RECIPE_TYPES_ARRAY,
	PREPARATION_TYPES_ARRAY,
	RATINGS_ARRAY,
	TIME_OF_DAY_ARRAY
} from '../../constants/recipes';
import Switch from '../../components/common/Switch';
import Dropdown from '../../components/common/Dropdown/Dropdown';
import Multiselect from '../../components/Multiselect';
import IngredientsList from '../../components/Ingredients/IngredientsList';
import Loader from '../../components/common/Loader';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class Recipe extends Component {

	constructor(props) {
		super(props);

		this.state = {
			doc_id: this.props.match.params.id
		};
	}

	componentDidMount() {
		const { doc_id } = this.state;
		this.props.getRecipe(doc_id);
	}

	showArticleHTML(preparation) {
		return {__html: preparation };
	}

	isVitarian(type) { return type === 'vit'; }

	loader() {
		return <Loader loading={true} fullpage={true} />;
	}

	computeEditURL() {
		const { doc_id } = this.state;
		return ROUTES.RECIPE_EDIT.replace(':id', doc_id);
	}

  render() {
		const { recipe } = this.props;
		if (!recipe) { return this.loader(); }
		const {
			name,
			rating,
			type,
			preparation_type,
			ingredients,
			time_of_day,
			portions,
			preparation,
			tested,
		} = recipe;

    return (
			<div id="viewRecipe" className="recipe">
				<div className="top">
					<div className="left">
						<h3>
							<span>{name}</span>
						</h3>
						<Dropdown
							options={RATINGS_ARRAY}
							selected={rating}
							viewOnly={true}>
						</Dropdown>
					</div>
					<div className="right">
						<Link to={this.computeEditURL()}
							type="button"
							className="primary small button"
							disabled={false}
							>
								EDYTUJ
						</Link>
					</div>
				</div>

				<div className="options-grid">
					<div className="selectors">
						<Switch checked={tested} label="Testowane" name="tested" disabled={true} />
						<Dropdown
							options={RECIPE_TYPES_ARRAY}
							selected={type}
							viewOnly={true}>
						</Dropdown>
						<Dropdown
							options={PREPARATION_TYPES_ARRAY}
							selected={preparation_type}
							viewOnly={true}
							disabled={this.isVitarian(type)}>
						</Dropdown>
					</div>
					<Multiselect selected={portions} disabled={true}/>
					<div className="ingredients-wrapper">
						<h2>Składniki</h2>
						<IngredientsList items={ingredients} disabled={true}/>
					</div>
					<div className="preparation-wrapper">
						<h2>Przygotowanie</h2>
						<article dangerouslySetInnerHTML={this.showArticleHTML(preparation)}></article>
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
									checked={checked} disabled={true} />
								<div className="checkbox-control"></div>
								{TIME_OF_DAY_ARRAY[index].name}
							</label>
						))
					}
				</div>
				<div className="pull-right on-mobile-only">
					<Link to={this.computeEditURL()}
						type="button"
						className="primary small button"
						disabled={false}
						>
							EDYTUJ
					</Link>
				</div>
			</div>
    );
  }
}

const mapStateToProps = state => ({
	recipe: state.recipes.selected
});

const mapDispatchToProps = (dispatch) => ({
	getRecipe: doc_id => dispatch(getRecipe(doc_id)),
	getRecipes: () => dispatch(getRecipes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);

