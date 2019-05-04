import React, { Component } from 'react';
import './RecipeCreate.scss';
import Dropdown from '../../components/common/Dropdown/Dropdown';
import Switch from '../../components/common/Switch';
import Multiselect from '../../components/Multiselect';
import IngredientsList from '../../components/Ingredients/IngredientsList';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ratingOpts = [
	{ icon: 'bronze-medal.svg', name: '', value: 'good' },
	{ icon: 'silver-medal.svg', name: '', value: 'fine' },
	{ icon: 'gold-medal.svg', name: '', value: 'perfect' },
];

const typeOpts = [
	{ icon: 'vege.svg', name: 'Vege', value: 'vege' },
	{ icon: 'vit.svg', name: 'Vit', value: 'vit' },
	{ icon: 'vegan.svg', name: 'Vegan', value: 'vegan' },
];

const preparationTypeOpts = [
	{ icon: 'cook.svg', name: 'Gotowane', value: 'cook' },
	{ icon: 'cook-with-steam.svg', name: 'Na parze', value: 'cook_with_steam' },
	{ icon: 'fried.svg', name: 'Smażone', value: 'fried' },
	{ icon: 'baked.svg', name: 'Pieczone', value: 'baked' },
];

const timeOfDayOpts = [
	{ name: 'Śniadanie', value: 'breakfast', checked: true },
	{ name: '2 Śniadanie', value: 'second_breakfast', checked: false },
	{ name: 'Obiad', value: 'dinner', checked: false },
	{ name: 'Podwieczorek', value: 'tea', checked: false },
	{ name: 'Kolacja', value: 'supper', checked: false },
];

class RecipeCreate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			rating: 'well',
			tested: false,
			type: 'vege',
			preparation_type: 'cook',
			ingredients: [],
			preparation: '',
			time_of_day: timeOfDayOpts,
		}

		this.handleRatingSelect = this.handleRatingSelect.bind(this);
		this.handleTestingSelect = this.handleTestingSelect.bind(this);
		this.handleTypeSelect = this.handleTypeSelect.bind(this);
		this.handlePreparationTypeSelect = this.handlePreparationTypeSelect.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePortionsChange = this.handlePortionsChange.bind(this);
		this.handleEditorChange = this.handleEditorChange.bind(this);
		this.handleTimeDay = this.handleTimeDay.bind(this);
	}

	handleEditorChange(preparation) { this.setState({ preparation }); }
	handleRatingSelect(rating) { this.setState({ rating }); }
	handleTestingSelect(tested) { this.setState({ tested }); }
	handleTypeSelect(type) { this.setState({ type }); }
	handlePreparationTypeSelect(preparation_type) { this.setState({ preparation_type }); }
	handleNameChange(name) { this.setState({ name }); }
	handlePortionsChange(portions) { this.setState({ portions }); }
	handleTimeDay(index) {
		this.setState(state => {
			let { time_of_day } = state;
			time_of_day[index].checked = !time_of_day[index].checked;
			return { time_of_day };
		});
	}

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
							<span className="secondary-font">Przepisy</span> / <span>Nowy Przepis</span>
						</h3>
						<Dropdown
							options={ratingOpts}
							selected={rating}
							onSelect={this.handleRatingSelect}>
						</Dropdown>
					</div>
				</div>

				<div className="options-grid">
					<div className="selectors">
						<Switch label="Testowane" name="tested" onChange={this.handleTestingSelect} />
						<Dropdown
							options={typeOpts}
							selected={type}
							onSelect={this.handleTypeSelect}>
						</Dropdown>
						<Dropdown
							options={preparationTypeOpts}
							selected={preparation_type}
							onSelect={this.handleTypeSelect}>
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
							editorState={preparation}
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
						time_of_day.map(({ name, checked }, index) => (
							<label className="checkbox" key={name}>
								<input
									key={name}
									type="checkbox"
									name={name}
									id={name+'checkbox'}
									checked={checked}
									onChange={() => this.handleTimeDay(index)} />
								<div className="checkbox-control"></div>
								{name}
							</label>
						))
					}
				</div>
			</div>
    );
  }
}

export default RecipeCreate;
