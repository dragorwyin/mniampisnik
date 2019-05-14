import React, { Component } from 'react';
import './IngredientsList.scss';
import IngredientsListItem from './IngredientsListItem';

class IngredientsList extends Component {

	constructor(props) {
		super(props);

		const { items, disabled = false } = this.props;
		this.state = { items, disabled };

		this.handleNewItemInput = this.handleNewItemInput.bind(this);
		this.newItemTimeout = null;
	}

	handleDeleteItem(index) {
		this.setState(state => {
			const { items } = state;
			items.splice(index, 1);
			if (this.props.onChange) this.props.onChange(items);
			return { items };
		});
	}

	handleChangeItem(index, value) {
		this.setState(state => {
			const { items } = state;
			items[index] = value;
			if (this.props.onChange) this.props.onChange(items);
			return items;
		});
	}

	handleNewItemInput(value) {
		this.setState(state => {
			let { items } = state;
			items.push(value);
			if (this.props.onChange) this.props.onChange(items);
			return { items };
		});
	}

	render() {
		const { items, disabled } = this.state;
		return (
			<div className="ingredients-list">
				{ items && items.map((ingredient, index) => (
					<IngredientsListItem
						key={`key${index}`}
						value={ingredient}
						disabled={disabled}
						onDelete={() => this.handleDeleteItem(index)}
						onChange={value => this.handleChangeItem(index, value)} />
				))}
				{ !disabled &&
					<IngredientsListItem
						value=""
						onEnter={this.handleNewItemInput}
						newItem="true" />
				}
			</div>
		);
	}

}

export default IngredientsList;
