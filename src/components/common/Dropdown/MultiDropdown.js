/* eslint-disable no-undef */
import React, { Component } from 'react';
import './Dropdown.scss';
import DropdownItem from './DropdownItem';
import Icon from '../Icon';
import PropTypes from 'prop-types';

class MultiDropdown extends Component {

	constructor(props) {
		super(props);

		const {
			options,
			viewOnly = false,
			placeholder,
		} = props;

		this.optionsRef = React.createRef();

		this.state = {
			selectedItems: new Set(options.filter(option => !!option.selected).map(option => option.value)),
			viewOnly,
			options: options.map(option => ({
				...option,
				selected: option.selected ? true: false,
			})),
			placeholder,
			open: props.open ? true : false,
		};
	}

	isDisabled() {
		return this.props.disabled;
	}

	handleToggleDropdown = () => {
		if (this.isDisabled()) { return; }
		this.setState((state) => ({ open: !state.open }));
	}

	handleItemClick = value => {
		if (this.isDisabled()) { return; }
		let { selectedItems } = this.state;
		let selected = false;

		if (selectedItems.has(value)) {
			selectedItems.delete(value);
			selected = false;
		} else {
			selectedItems.add(value);
			selected = true;
		}

		this.setState({
			selectedItems,
			options: this.state.options
				.map(option => {
					if (option.value === value) { option.selected = selected; }
					return option;
				}),
		});

		if (this.props.onSelect) {
			this.props.onSelect(Array.from(selectedItems));
		}
	}

	handleClickOutside = event => {
		if (this.optionsRef.current && !this.optionsRef.current.contains(event.target)) {
			this.setState({	open: false });
		}
	};

	componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	componentDidUpdate() {
		const { options } = this.props;
		const { selectedItems } = this.state;

		const toUpdate = options.find((option, index) => option.selected !== this.state.options[index].selected);
		if (!toUpdate) return;
		selectedItems.has(toUpdate.value) ? selectedItems.delete(toUpdate.value) : selectedItems.add(toUpdate.value);
		this.setState({ options });
	}

	render() {
		const { options, open, viewOnly, placeholder } = this.state;
		const { disabled } = this.props;
		if (!options || !options.length) return null;

		return (
			<div className="dropdown" disabled={disabled}>
				<div className="selected-option" onClick={() => this.handleToggleDropdown()}>
					{ placeholder.name && <span>{ placeholder.name }</span> }
					{ placeholder.icon && <Icon src={placeholder.icon}/> }
				</div>
				{ !viewOnly && open && (
					<ul className="options" ref={this.optionsRef}>
						{ options && options.map(option => (
							<DropdownItem
								{...option}
								key={option.value}
								showCheckbox={true}
								onClick={() => this.handleItemClick(option.value)}
							/>
						))}
					</ul>
				)}
			</div>
		);
	}
}

MultiDropdown.propTypes = {
	disabled: PropTypes.bool,
	selected: PropTypes.array,
	placeholder: PropTypes.shape({
		selected: PropTypes.bool,
	}).isRequired,
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.string.isRequired,
		selected: PropTypes.bool,
		name: PropTypes.string,
		icon: PropTypes.string,
	})).isRequired,
	onSelect: PropTypes.func,
	viewOnly: PropTypes.bool,
}

export default MultiDropdown;
