import React, { Component } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';

class SelectSlider extends Component {

	constructor(props) {
		super(props);

		const {
			itemsPerPages = [3],
			page = 0,
		} = this.props;

		const pages = itemsPerPages.length;

		this.state = { pages };
		this.state = {
			itemsPerPages,
			page,
			pages,
			disabled: {
				left: this.shouldArrowBeDisabled(page, 'left'),
				right: this.shouldArrowBeDisabled(page, 'right'),
			},
		};

		this.handleClickArrow = this.handleClickArrow.bind(this);
		this.paginatedItems = this.paginatedItems.bind(this);
	}

	shouldArrowBeDisabled(page, turn) {
		const { pages } = this.state;
		if (turn === 'left' && page <= 0) { return true; }
		if (turn === 'right' && page >= pages - 1) { return true; }
		return false;
	}

	handleClickArrow(page, turn) {
		const { disabled } = this.state;
		if (disabled[turn]) { return; }

		const newPage = turn === 'right' ? page + 1 : page - 1;

		this.setState({
			page: newPage,
			disabled: {
				left: false,
				right: false,
			},
		});

		if (this.shouldArrowBeDisabled(newPage, turn)) {
			this.setState({ disabled: { [turn]: true } });
			return;
		}
  }

	computeSumItemsToPage(page) {
		const { itemsPerPages } = this.state;
		return itemsPerPages.reduce((sum, items, index) => index < page ? sum + items : sum, 0);
	}

	paginatedItems(items, itemsPerPage) {
		const { page } = this.state;
		if (!Array.isArray(items)) throw new Error('Should be array');
		const start = this.computeSumItemsToPage(page);
		return items.slice(start, start + itemsPerPage);
	}

	getClasses() {
		return classNames({
			'select-slider': true,
		});
	}

	render() {
		const {
			page,
			itemsPerPages,
			disabled,
		} = this.state;

		const { items } = this.props;

		return (
			<div className={this.getClasses()}>
				<div
					className="select-slider--left-button"
					disabled={disabled.left}
					onClick={() => this.handleClickArrow(page, 'left')}>
						<Icon src="left-arrow.svg" />
				</div>

				<div className="select-slider--items">
					{ this.props.render(this.paginatedItems(items, itemsPerPages[page]))}
				</div>

				<div
					className="select-slider--right-button"
					disabled={disabled.right}
					onClick={() => this.handleClickArrow(page, 'right')}>
						<Icon src="right-arrow.svg" />
				</div>
			</div>
		);
	}

}

SelectSlider.propTypes = {
	items: PropTypes.array,
	itemsPerPages: PropTypes.array,
	page: PropTypes.number,
}

export default SelectSlider;
