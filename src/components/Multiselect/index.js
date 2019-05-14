import React, { Component } from 'react';
import './style.scss';
import Icon from '../common/Icon';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Multiselect extends Component {

	constructor(props) {
		super(props);

		const {
			icon = 'portion.svg',
			count = 5,
			disabled = false
		} = props;

		this.state = {
			portions: Array(+count).fill({
				icon,
				selected: false,
			}),
			selected: null,
			disabled,
		};

	}

	componentDidMount() {
		const { selected } = this.props;
		this.selectTo(selected);
	}

	selectTo(index) {
		if (index === null || index === undefined) { return; }
		this.setState(state => {
			let { portions } = state;
			portions = portions.map((portion, pIndex) => {
				let { icon, selected } = portion;
				selected = pIndex <= index ? true : false;
				return { icon, selected };
			});

			if (this.props.onChange) this.props.onChange(index);
			return { portions, selected: index };
		});
	}

	getClasses(isSelected) {
		return classNames({
			portion: true,
			selected: isSelected,
		});
	}

	render() {
		const { portions, disabled } = this.state;
		return (
			<div className="portions">
				{ portions.map(({ selected, icon }, index) => (
					<div
						className={this.getClasses(selected)}
						key={icon+index}
						onClick={() => { if (!disabled) return this.selectTo(index)} }>
							<Icon src={icon}/>
					</div>
				))}
			</div>
		);
	}
}

Multiselect.propTypes = {
	icon: PropTypes.string,
	count: PropTypes.number,
	onChange: PropTypes.func,
}

export default Multiselect;
