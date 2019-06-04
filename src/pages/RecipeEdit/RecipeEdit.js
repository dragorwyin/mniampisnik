import React, { Component } from 'react';
import './RecipeEdit.scss';
import Dropdown from '../../components/common/Dropdown/Dropdown';
import Switch from '../../components/common/Switch';
import Multiselect from '../../components/Multiselect';
import IngredientsList from '../../components/Ingredients/IngredientsList';
import { patchRecipe, getRecipe } from '../../store/actions/recipesActions';
import { connect } from 'react-redux';
import Editor from '../../components/common/Editor';
import {
	RECIPE_TYPES_ARRAY,
	PREPARATION_TYPES_ARRAY,
	RATINGS_ARRAY,
	TIME_OF_DAY_ARRAY
} from '../../constants/recipes';
import Loader from '../../components/common/Loader';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import * as ROUTES from '../../constants/routes';

class RecipeEdit extends Component {

	constructor(props) {
		super(props);

		this.state = {
			doc_id: this.props.match.params.id,
		};

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
		const { doc_id } = this.state;
		this.props.getRecipe(doc_id).then(recipe => {
			this.setState(recipe);
		});
	}

	readDraftContent(preparation) {
		const blocksFromHtml = htmlToDraft(preparation);
		const { contentBlocks, entityMap } = blocksFromHtml;
		const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
		return EditorState.createWithContent(contentState);
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
		this.props.patchRecipe(this.state.doc_id, this.state).then(() => {
			history.push(ROUTES.RECIPE.replace(':id', this.state.doc_id));
		});
	}

	isSaveDisabled() {
		const { name, ingredients } = this.state;
		return name === '' || ingredients.length === 0;
	}

	isVitarian() { return this.state.type === 'vit'; }

	loader() {
		return <Loader loading={true} fullpage={true} />;
	}

  render() {
		const {
			preparation,
			name,
			id,
			rating,
			type,
			preparation_type,
			ingredients,
			time_of_day,
			portions,
			tested,
		} = this.state;

		if (!id) { return this.loader(); }

    return (
			<div id="editRecipe" className="recipe">
				<div className="top">
					<div className="left">
						<h3>
							<span>{name}</span>
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
						<Switch checked={tested} label="Testowane" name="tested" onChange={this.handleTestingSelect} />
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
						<input name="name" onChange={this.handleNameChange} placeholder="Mój przepis" value={name} />
					</div>
					<Multiselect selected={portions} onChange={this.handlePortionsChange} />
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
									onChange={() => this.handleTimeDay(index)} />
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

const mapStateToProps = state => ({
	auth: state.firebase.auth,
	recipe: state.recipes.selected,
 });

const mapDispatchToProps = (dispatch) => ({
	patchRecipe: (doc_id, recipe) => dispatch(patchRecipe(doc_id, recipe)),
	getRecipe: (doc_id) => dispatch(getRecipe(doc_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEdit);
