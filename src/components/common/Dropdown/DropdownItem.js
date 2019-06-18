import React, { Component } from 'react';
import './DropdownItem.scss';
import Icon from '../Icon';
import PropTypes from 'prop-types';

class DropdownItem extends Component {

	onClick = (e, value) => {
		e.stopPropagation();
		this.props.onClick(value);
	}

	render() {
		const {
			value,
			icon,
			name,
			selected,
			showCheckbox = false
		} = this.props;

		return (
			<li
				className={selected ? 'selected' : ''}
				onClick={(e) => this.onClick(e, value)}
				key={value}>
					{ icon && <Icon src={icon}/> }
					{ !icon && <div></div> }
					<span>{name}</span>
					{ showCheckbox && (
						<label className="checkbox">
							<input
								type="checkbox"
								checked={selected}
								onClick={e => e.stopPropagation() }
								onChange={() => {}}
							/>
							<div className="checkbox-control"></div>
						</label>
					)}
			</li>
		);
	}

}

DropdownItem.propTypes = {
	selected: PropTypes.bool,
	value: PropTypes.string.isRequired,
	name: PropTypes.string,
	icon: PropTypes.string,
	showCheckbox: PropTypes.bool,
	onClick: PropTypes.func,
}

export default DropdownItem;
