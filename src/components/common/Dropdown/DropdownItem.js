import React, { Component } from 'react';
import './DropdownItem.scss';
import Icon from '../Icon';

class DropdownItem extends Component {

	onClick = value => { this.props.onClick(value); }

	render() {
		const { value, icon, name, selected } = this.props;
		return (
			<li
				className={selected ? 'selected' : ''}
				onClick={() => this.onClick(value)}
				key={value}>
					<Icon src={icon}/>
					<span>{name}</span>
			</li>
		);
	}

}

export default DropdownItem;
