import React, { Component } from 'react';
import './IngredientsList.scss';
import IngredientsListItem from './IngredientsListItem';

class IngredientsList extends Component {

	constructor(props) {
		super(props);

		const { items } = this.props;
		this.state = { items };

		this.handleNewItemInput = this.handleNewItemInput.bind(this);
		this.newItemTimeout = null;
	}

	componentDidUpdate() {
		const { items } = this.state;
		if (this.props.onChange) this.props.onChange(items);
	}

	handleDeleteItem(index) {
		this.setState(state => {
			const { items } = state;
			items.splice(index, 1);
			return { items };
		});
	}

	handleChangeItem(index, value) {
		this.setState(state => {
			const { items } = state;
			items[index] = value;
			return items;
		});
	}

	handleNewItemInput(value) {
		this.setState(state => {
			let { items } = state;
			items.push(value);
			return { items };
		});
	}

	render() {
		const { items } = this.state;
		return (
			<div className="ingredients-list">
				{ items && items.map((ingredient, index) => (
					<IngredientsListItem
						key={`key${index}`}
						value={ingredient}
						onDelete={() => this.handleDeleteItem(index)}
						onChange={value => this.handleChangeItem(index, value)} />
				))}
				<IngredientsListItem
					value=""
					onEnter={this.handleNewItemInput}
					newItem="true" />
			</div>
		);
	}

}

export default IngredientsList;
