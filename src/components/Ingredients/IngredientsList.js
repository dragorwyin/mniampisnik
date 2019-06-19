import React, { Component } from 'react';
import './IngredientsList.scss';
import IngredientsListItem from './IngredientsListItem';

class IngredientsList extends Component {

	constructor(props) {
		super(props);

		const { items, disabled = false } = this.props;
		items.push('');
		this.state = { items, disabled, focusOn: null};

		this.newItemTimeout = null;
	}

	handleDeleteItem = index => {
		this.setState(state => {
			const { items } = state;
			items.splice(index, 1);
			if (this.props.onChange) this.props.onChange(items);
			return { items };
		});
	}

	handleChangeItem = (index, value) => {
		this.setState(state => {
			const { items } = state;
			items[index] = value;
			if (this.props.onChange) this.props.onChange(items);
			return items;
		});
	}

	handleNewItemAfter = index => {
		const { items } = this.state;
		items.splice(index+1, 0, '');
		this.setState({ items: [] });
		setTimeout(() => { this.setState({ items, focusOn: index+1 }); }, 0);
	}

	renderListItem = (ingredient, index) => {
		const { disabled, focusOn } = this.state;

		return (
			<IngredientsListItem
				key={`key${index}`}
				value={ingredient}
				disabled={disabled}
				focus={focusOn === index}
				onDelete={() => this.handleDeleteItem(index)}
				onEnter={() => this.handleNewItemAfter(index)}
				onChange={value => this.handleChangeItem(index, value)}
			/>
		);
	}

	render() {
		const { items, disabled } = this.state;
		return (
			<div className="ingredients-list">
				{ items && items.map((ingredient, index) => {
						if (index === items.length -1 && !disabled) return this.renderListItem(ingredient, index);
						if (index < items.length - 1) return this.renderListItem(ingredient, index);
						return null;
				})}
			</div>
		);
	}

}

export default IngredientsList;
