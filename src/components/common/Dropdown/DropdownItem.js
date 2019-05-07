import React, { Component } from 'react';
import './DropdownItem.scss';
import Icon from '../Icon';
import PropTypes from 'prop-types';

class DropdownItem extends Component {

	onClick = value => { this.props.onClick(value); }

	render() {
		const { value, icon, name, selected } = this.props;
		return (
			<li
				className={selected ? 'selected' : ''}
				onClick={() => this.onClick(value)}
				key={value}>
					{ icon && <Icon src={icon}/> }
					<span>{name}</span>
			</li>
		);
	}

}

DropdownItem.propTypes = {
	selected: PropTypes.bool,
	value: PropTypes.string.isRequired,
	name: PropTypes.string,
	icon: PropTypes.string,
	onClick: PropTypes.func,
}

export default DropdownItem;
