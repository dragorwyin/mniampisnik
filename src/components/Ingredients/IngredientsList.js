import React, { Component } from 'react';
import './IngredientsList.scss';
import IngredientsListItem from './IngredientsListItem';

class IngredientsList extends Component {

	constructor(props) {
		super(props);

		const { items, disabled = false } = this.props;
		this.state = { items, disabled, focusOn: null };

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

	handleNewItemInput = value => {
		this.setState(state => {
			let { items } = state;
			items.push(value);
			if (this.props.onChange) this.props.onChange(items);
			return { items };
		});
	}

	handleNewItemAfter = index => {
		const { items } = this.state;
		items.splice(index+1, 0, '');
		this.setState({ items: [] });
		setTimeout(() => { this.setState({ items, focusOn: index+1 }); }, 0);
	}

	render() {
		const { items, disabled, focusOn } = this.state;
		return (
			<div className="ingredients-list">
				{ items && items.map((ingredient, index) => (
						<IngredientsListItem
							key={`key${index}`}
							value={ingredient}
							disabled={disabled}
							focus={focusOn === index}
							onDelete={() => this.handleDeleteItem(index)}
							onEnter={() => this.handleNewItemAfter(index)}
							onChange={value => this.handleChangeItem(index, value)}
						/>
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
