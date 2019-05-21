import React, { Component } from 'react';
import './Recipes.scss';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { getRecipes } from '../../store/actions/recipesActions';
import Loader from '../../components/common/Loader';

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

	areRecipes(data) {
		return data && Array.isArray(data);
	}

	loader() {
		return <Loader loading={true} fullpage={true} />;
	}

  render() {
		const { recipes } = this.props;
    return (
			<div id="recipes">
				{ this.areRecipes(recipes) ?
					(<>
						<h3 className="secondary-font">Przepisy</h3>
						<div className="list">
							{ recipes.map(recipe => {
								return (
									<ListItem {...recipe} key={recipe.id}></ListItem>
								)
							})}
						</div>
					</>) : this.loader()
				}
			</div>
    );
	}

}

const mapStateToProps = state => ({
	recipes: state.recipes.items
});

const mapDispatchToProps = (dispatch) => ({
	getRecipes: () => dispatch(getRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
