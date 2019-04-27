import React, { Component } from 'react';
import './Dropdown.scss';
import DropdownItem from './DropdownItem';
import Icon from '../Icon';

class Dropdown extends Component {

	constructor(props) {
		super(props);
		const { options, selected = null } = props;

		this.optionsRef = React.createRef();

		this.state = {
			selected: selected ? options.find(option => option.value === selected) : null,
			options: options.map(option => {
				option.selected = option.selected ? true : false;
				return option;
			}),
			open: props.open ? true : false,
		};

		if (!this.state.selected) {
			const [option] = this.state.options;
			this.state.selected = option;
			option.selected = true;
		}
	}

	handleToggleDropdown = () => {
		this.setState((state) => ({ open: !state.open }));
	}

	handleItemClick = (value) => {
		this.setState({
			selected: this.state.options.find(option => option.value === value),
			options: this.state.options.map(option => {
				option.selected = option.value === value;
				return option;
			}),
			open: false,
		});

		if (this.props.onSelect) {
			this.props.onSelect(value);
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

	render() {
		const { options, selected, open } = this.state;
		if (!options || !options.length) return null;

		return (
			<div className="dropdown">
				<div className="selected-option" onClick={() => this.handleToggleDropdown()}>
					<Icon src={selected.icon}/><span>{selected.name}</span>
				</div>
				{ open && (
					<ul className="options" ref={this.optionsRef}>
						{ options && options.map(option => (
							<DropdownItem {...option} key={option.value} onClick={() => this.handleItemClick(option.value)}/>
						))}
					</ul>
				)}
			</div>
		);

	}

}

export default Dropdown;
