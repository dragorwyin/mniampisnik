import React, { Component } from 'react';
import './RecipeCreate.scss';
import Dropdown from '../../components/common/Dropdown/Dropdown';
import Switch from '../../components/common/Switch';
import Multiselect from '../../components/Multiselect';
import IngredientsList from '../../components/Ingredients/IngredientsList';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { postRecipe } from '../../store/actions/recipesActions';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import {
	RECIPE_TYPES_ARRAY,
	PREPARATION_TYPES_ARRAY,
	RATINGS_ARRAY,
	TIME_OF_DAY_ARRAY
} from '../../constants/recipes';

class RecipeCreate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			ingredients: [],
			name: '',
			preparation_editor: '',
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

	handleEditorChange(preparation_editor) {
		const preparation = draftToHtml(convertToRaw(preparation_editor.getCurrentContent()));
		this.setState({ preparation });
		this.setState({ preparation_editor });
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
		this.props.postRecipe(this.state);
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
			preparation_editor,
			time_of_day,
		} = this.state;

    return (
			<div id="createRecipe" className="recipe">
				<div className="top">
					<div className="left">
						<h3>
							<span className="secondary-font">Przepisy</span> / <span>Nowy Przepis</span>
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
							onSelect={this.handleTypeSelect}
							disabled={this.isVitarian()}>
						</Dropdown>
					</div>
					<div></div>
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
							wrapperClassName="recipe-editor"
							editorState={preparation_editor}
							onEditorStateChange={this.handleEditorChange}
							toolbar={{
								options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'history'],
								inline: { inDropdown: false },
								list: { inDropdown: true },
								textAlign: { inDropdown: false },
								history: { inDropdown: true },
							}} />
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
			</div>
    );
  }
}

const mapStateToProps = state => ({ auth: state.firebase.auth });

const mapDispatchToProps = (dispatch) => ({
	postRecipe: (project) => dispatch(postRecipe(project))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCreate);
