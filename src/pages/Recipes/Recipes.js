import React, { Component } from 'react';
import './Recipes.scss';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import Dropdown from '../../components/common/Dropdown/Dropdown';
import IngredientsList from '../../components/Ingredients/IngredientsList';
import Multiselect from '../../components/Multiselect';
import Switch from '../../components/common/Switch';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const options = [
	{ icon: 'vege.svg', name: 'Vege', value: 'vege' },
	{ icon: 'vit.svg', name: 'Vit', value: 'vit' },
	{ icon: 'vegan.svg', name: 'Vegan', value: 'vegan' },
];

const options2 = [
	{ icon: 'fried.svg', name: 'Smazone', value: 'fried' },
	{ icon: 'baked.svg', name: 'Pieczone', value: 'vege' },
	{ icon: 'cook.svg', name: 'Gotowane', value: 'vit' },
	{ icon: 'cook-with-steam.svg', name: 'Na parze', value: 'vegan' },
];

const ingredients = ['blah', 'blah2', 'blah3 zxc zxc zxc as dd qw eqw dqwd qwd qwd qwd q ds ad sz dsad qwe qwe qw '];

class Recipes extends Component {

	constructor(props) {
		super(props);
		this.state = {
      editorState: EditorState.createEmpty(),
		};

		this.onEditorStateChange = this.onEditorStateChange.bind(this);
	}

	onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  render() {
		const { recipes } = this.props;
		const { editorState } = this.state;
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
				<div className="dropdowns">
					<Dropdown options={options2} selected="fried" onSelect={(value) => { console.log(value); }}></Dropdown>
				</div>
				<div className="ingredients">
					<IngredientsList items={ingredients}/>
				</div>

				<Multiselect onChange={index => console.log(index)} />
				<Switch checked={true} label="Testowane" name="blah" onChange={ checked => console.log(checked)} />
				<Editor
					wrapperClassName="recipe-editor"
					editorState={editorState}
					onEditorStateChange={this.onEditorStateChange}
					toolbar={{
						options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'history'],
						inline: { inDropdown: false },
						list: { inDropdown: true },
						textAlign: { inDropdown: false },
						history: { inDropdown: true },
					}} />
			</div>
    );
	}

}

const mapStateToProps = state => ({
	recipes: state.recipes
});

export default connect(mapStateToProps)(Recipes);
// export default connect(mapStateToProps)(withAuthentication(Recipes));
