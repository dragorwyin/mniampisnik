import React, { Component } from 'react';
import './style.scss';

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
			return { checked: !checked };
		});
	}

	componentDidUpdate() {
		const { checked } = this.state;
		if (this.props.onChange) this.props.onChange({ checked });
	}

  render() {
		const { checked, label, name } = this.state;

    return (
			<div className="switch">
				<label>{ label }</label>
				<input type="checkbox" checked={checked} onChange={this.handleChange} name={name} />
			</div>
    );
  }
}

export default Switch;
