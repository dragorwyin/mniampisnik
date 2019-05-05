import React, { Component } from 'react';
import './style.scss';
import PropTypes from 'prop-types';

class Switch extends Component {

	constructor(props) {
		super(props);

		const {
			checked = false,
			label = '',
			name = '',
		} = props;

		this.state = { checked, label, name };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
		this.setState(state => {
			let { checked } = state;
			if (this.props.onChange) this.props.onChange(!checked);
			return { checked: !checked };
		});
	}

  render() {
		const { checked, label, name } = this.state;

    return (
			<div className="switch">
				<label>{ label }</label>
				<input
					className="input"
					type="checkbox"
					checked={checked}
					onChange={this.handleChange}
					name={name} />
			</div>
    );
  }
}

Switch.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
}

export default Switch;
