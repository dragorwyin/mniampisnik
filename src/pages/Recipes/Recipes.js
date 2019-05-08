import React, { Component } from 'react';
import './Recipes.scss';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { getRecipes } from '../../store/actions/recipesActions';

class Recipes extends Component {

	constructor(props) {
		super(props);
		this.state = {
      editorState: EditorState.createEmpty(),
		};

		this.onEditorStateChange = this.onEditorStateChange.bind(this);
	}

	componentDidMount() {
		this.props.getRecipes();
	}

	onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  render() {
		const { recipes } = this.props;
		recipes.reverse();
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

const mapDispatchToProps = (dispatch) => ({
	getRecipes: () => dispatch(getRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
